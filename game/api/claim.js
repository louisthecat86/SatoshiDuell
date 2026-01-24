import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { duelId, amount } = req.body;

  if (!duelId || !amount) {
    return res.status(400).json({ error: 'Missing data' });
  }

  // 1. Supabase Admin-Client erstellen
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 2. SICHERHEITSCHECK: Ist das Spiel schon als 'claimed' markiert?
    const { data: duel, error: fetchError } = await supabaseAdmin
      .from('duels')
      .select('claimed, status')
      .eq('id', duelId)
      .single();

    if (fetchError || !duel) {
      return res.status(404).json({ error: 'Duel not found' });
    }

    // WICHTIG: Wenn schon ausgezahlt, sofort STOPPEN!
    if (duel.claimed === true) {
      console.warn(`Duel ${duelId} already claimed. Blocking double spend.`);
      return res.status(400).json({ error: 'ALREADY_PAID' });
    }

    // 3. Wenn noch nicht ausgezahlt, erst JETZT LNbits rufen
    const lnbitsResponse = await fetch(`${process.env.VITE_LNBITS_URL}/withdraw/api/v1/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.VITE_INVOICE_KEY // Admin Key für Withdraws
      },
      body: JSON.stringify({
        title: `SatoshiDuell Win #${duelId}`,
        min_withdrawable: amount,
        max_withdrawable: amount,
        uses: 1,
        wait_time: 1
      })
    });

    const lnbitsData = await lnbitsResponse.json();

    if (!lnbitsData.lnurl) {
      throw new Error('LNbits did not return LNURL');
    }

    // 4. Datenbank SOFORT auf claimed setzen
    const { error: updateError } = await supabaseAdmin
      .from('duels')
      .update({ claimed: true })
      .eq('id', duelId);

    if (updateError) {
      console.error("Database update failed, but link generated!", updateError);
      // Kritischer Fehler, aber Link wurde erstellt. 
    }

    return res.status(200).json(lnbitsData);

  } catch (error) {
    console.error("Claim Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}