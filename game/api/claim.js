import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { duelId } = req.body; // Wir brauchen nur die ID, den Betrag holen wir sicherheitshalber aus der DB
  if (!duelId) return res.status(400).json({ error: 'Missing duelId' });

  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY;
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 1. Daten aus DB holen
    const { data: duel, error: fetchError } = await supabaseAdmin
      .from('duels')
      .select('claimed, amount, status')
      .eq('id', duelId)
      .single();

    if (fetchError || !duel) return res.status(404).json({ error: 'Duel not found' });
    if (duel.claimed === true) return res.status(400).json({ error: 'ALREADY_PAID' });
    if (duel.status !== 'finished') return res.status(400).json({ error: 'Duel not finished' });

    // 2. BERECHNUNG DES GEWINNS: Einsatz x 2
    const winAmount = duel.amount * 2;

    // 3. LNbits Aufruf mit dem DOPPELTEN Betrag
    const cleanUrl = LNBITS_URL ? LNBITS_URL.replace(/\/$/, "") : "";
    const lnbitsResponse = await fetch(`${cleanUrl}/withdraw/api/v1/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ADMIN_KEY
      },
      body: JSON.stringify({
        title: `SatoshiDuell Jackpot #${duelId}`,
        min_withdrawable: winAmount,
        max_withdrawable: winAmount,
        uses: 1,
        wait_time: 1,
        is_unique: true
      })
    });

    const lnbitsData = await lnbitsResponse.json();

    if (!lnbitsResponse.ok || !lnbitsData.lnurl) {
      return res.status(500).json({ error: 'LNbits Error', details: lnbitsData.detail });
    }

    // 4. Als claimed markieren
    await supabaseAdmin.from('duels').update({ claimed: true }).eq('id', duelId);
    
    return res.status(200).json(lnbitsData);

  } catch (error) {
    return res.status(500).json({ error: 'Server Error', details: error.message });
  }
}