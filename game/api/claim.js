import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { duelId, amount } = req.body;
  if (!duelId || !amount) return res.status(400).json({ error: 'Missing data' });

  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY;
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  // URL bereinigen
  const cleanUrl = LNBITS_URL ? LNBITS_URL.replace(/\/$/, "") : "";
  const endpoint = `${cleanUrl}/withdraw/api/v1/links`;

  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 1. Check DB
    const { data: duel, error: fetchError } = await supabaseAdmin
      .from('duels')
      .select('claimed')
      .eq('id', duelId)
      .single();

    if (fetchError || !duel) return res.status(404).json({ error: 'Duel not found' });
    if (duel.claimed === true) return res.status(400).json({ error: 'ALREADY_PAID' });

    // 2. LNbits Aufruf (JETZT MIT is_unique PARAMETER)
    const lnbitsResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ADMIN_KEY
      },
      body: JSON.stringify({
        title: `SatoshiDuell Win #${duelId}`,
        min_withdrawable: amount,
        max_withdrawable: amount,
        uses: 1,
        wait_time: 1,
        is_unique: true  // <--- DAS HAT GEFEHLT!
      })
    });

    const lnbitsData = await lnbitsResponse.json();

    if (!lnbitsResponse.ok || !lnbitsData.lnurl) {
      console.error("LNbits Error:", lnbitsData);
      return res.status(500).json({ 
        error: 'LNbits Error', 
        details: JSON.stringify(lnbitsData) 
      });
    }

    // 3. Success
    await supabaseAdmin.from('duels').update({ claimed: true }).eq('id', duelId);
    
    return res.status(200).json(lnbitsData);

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}