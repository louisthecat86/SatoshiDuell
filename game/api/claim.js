import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { duelId, amount } = req.body;

  if (!duelId || !amount) {
    return res.status(400).json({ error: 'Missing data: duelId or amount' });
  }

  // Debugging: Loggen, ob Variablen da sind (NICHT die Keys selbst loggen!)
  console.log(`Processing claim for Duel ${duelId}, Amount: ${amount}`);
  if (!process.env.VITE_LNBITS_URL) console.error("MISSING VITE_LNBITS_URL");
  if (!process.env.VITE_INVOICE_KEY) console.error("MISSING VITE_INVOICE_KEY");

  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 1. Check: Wurde schon ausgezahlt?
    const { data: duel, error: fetchError } = await supabaseAdmin
      .from('duels')
      .select('claimed')
      .eq('id', duelId)
      .single();

    if (fetchError || !duel) {
      return res.status(404).json({ error: 'Duel not found in DB' });
    }

    if (duel.claimed === true) {
      return res.status(400).json({ error: 'ALREADY_PAID' });
    }

    // 2. LNbits Anfragen
    // WICHTIG: Hier muss der ADMIN KEY verwendet werden!
    const lnbitsUrl = `${process.env.VITE_LNBITS_URL}/withdraw/api/v1/links`;
    
    const lnbitsResponse = await fetch(lnbitsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.VITE_INVOICE_KEY 
      },
      body: JSON.stringify({
        title: `SatoshiDuell #${duelId}`,
        min_withdrawable: amount,
        max_withdrawable: amount,
        uses: 1,
        wait_time: 1
      })
    });

    const lnbitsData = await lnbitsResponse.json();

    // 3. LNbits Fehler abfangen
    if (!lnbitsResponse.ok || !lnbitsData.lnurl) {
      console.error("LNbits Error Response:", lnbitsData);
      // Gib den genauen Fehler von LNbits zurück (z.B. "Wallet has insufficient funds")
      return res.status(500).json({ 
        error: 'LNbits Error', 
        details: lnbitsData.detail || lnbitsData.message || 'Unknown LNbits error' 
      });
    }

    // 4. In DB als claimed markieren
    await supabaseAdmin
      .from('duels')
      .update({ claimed: true })
      .eq('id', duelId);

    return res.status(200).json(lnbitsData);

  } catch (error) {
    console.error("Server Internal Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}