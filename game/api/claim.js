import { createClient } from '@supabase/supabase-js';

// Verbindung zur DB herstellen (mit Service Key für Schreibrechte)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Nur POST Anfragen erlauben
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Wir holen uns ID und Typ vom Frontend
  // 'type' ist standardmäßig 'duel', falls das Frontend nichts mitschickt (für alte Versionen)
  const { id, type = 'duel' } = req.body;

  if (!id) return res.status(400).json({ error: 'Missing ID' });

  try {
    let payoutAmount = 0;
    let title = "";
    let tableName = "";

    // ---------------------------------------------------------
    // FALL 1: DUELL (1 vs 1)
    // ---------------------------------------------------------
    if (type === 'duel') {
      tableName = 'duels';
      const { data: duel, error } = await supabase
        .from('duels')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !duel) return res.status(404).json({ error: 'Duel not found' });
      if (duel.claimed) return res.status(400).json({ error: 'Already claimed' });
      
      // Sicherheits-Check: Ist das Spiel wirklich vorbei?
      if (duel.status !== 'finished' && duel.status !== 'refunded') {
         return res.status(400).json({ error: 'Game not finished' });
      }

      // Gewinn berechnen: Einsatz * 2
      payoutAmount = duel.amount * 2;
      title = `SatoshiDuell Win ⚔️`;
    } 
    
    // ---------------------------------------------------------
    // FALL 2: TURNIER (Jackpot)
    // ---------------------------------------------------------
    else if (type === 'tournament') {
      tableName = 'tournaments';
      const { data: t, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !t) return res.status(404).json({ error: 'Tournament not found' });
      if (t.claimed) return res.status(400).json({ error: 'Already claimed' });
      
      if (t.status !== 'finished') {
         return res.status(400).json({ error: 'Tournament not finished' });
      }

      // Gewinn berechnen: Einsatz * Spieleranzahl
      // Beispiel: 5 Spieler * 100 Sats = 500 Sats
      payoutAmount = t.entry_fee * t.max_players;
      title = `Tournament Jackpot 🏆`;
    } else {
        return res.status(400).json({ error: 'Invalid game type' });
    }

    // ---------------------------------------------------------
    // LNBITS: Auszahlungs-Link generieren (Withdraw Link)
    // ---------------------------------------------------------
    const lnbitsUrl = process.env.VITE_LNBITS_URL;
    const lnbitsKey = process.env.VITE_INVOICE_KEY; 

    // Payload für LNbits
    const withdrawBody = {
      title: title,
      min_withdrawable: payoutAmount,
      max_withdrawable: payoutAmount,
      uses: 1,
      wait_time: 1,
      is_unique: true
    };

    const lnbitsRes = await fetch(`${lnbitsUrl}/withdraw/api/v1/links`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Api-Key': lnbitsKey 
      },
      body: JSON.stringify(withdrawBody)
    });

    const lnbitsData = await lnbitsRes.json();

    if (!lnbitsData.lnurl) {
        console.error('LNbits Error:', lnbitsData);
        return res.status(500).json({ error: 'Failed to create withdraw link from LNbits' });
    }

    // ---------------------------------------------------------
    // DB UPDATE: Als "ausbezahlt" markieren
    // ---------------------------------------------------------
    // Wir machen das erst NACHDEM wir den Link von LNbits haben.
    await supabase.from(tableName).update({ claimed: true }).eq('id', id);

    // Erfolg zurückmelden
    return res.status(200).json({ 
        lnurl: lnbitsData.lnurl, 
        id: lnbitsData.id 
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}