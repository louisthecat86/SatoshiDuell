import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. Basics prüfen
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { duelId, amount } = req.body;
  if (!duelId || !amount) return res.status(400).json({ error: 'Missing data' });

  // 2. DIAGNOSE: Was sieht der Server?
  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY;
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  console.log("--- DEBUG START ---");
  console.log(`Duel ID: ${duelId}`);
  console.log(`URL Configured: ${LNBITS_URL}`);
  
  // Zeige die ersten 4 Zeichen des Keys (Sicherheit), um zu prüfen, ob er geladen wird
  if (ADMIN_KEY) {
      console.log(`Key Loaded: Yes, starts with ${ADMIN_KEY.substring(0, 4)}...`);
      console.log(`Key Length: ${ADMIN_KEY.length}`);
  } else {
      console.error("CRITICAL: LNBITS_ADMIN_KEY is undefined/empty!");
      return res.status(500).json({ error: 'Server Config Error: LNBITS_ADMIN_KEY missing' });
  }

  // URL bereinigen (falls ein Slash am Ende zu viel ist)
  const cleanUrl = LNBITS_URL.replace(/\/$/, ""); 
  const endpoint = `${cleanUrl}/withdraw/api/v1/links`;
  console.log(`Calling Endpoint: ${endpoint}`);

  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 3. Datenbank Check
    const { data: duel, error: fetchError } = await supabaseAdmin
      .from('duels')
      .select('claimed')
      .eq('id', duelId)
      .single();

    if (fetchError || !duel) return res.status(404).json({ error: 'Duel not found' });
    if (duel.claimed === true) return res.status(400).json({ error: 'ALREADY_PAID' });

    // 4. LNbits Aufruf
    const lnbitsResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ADMIN_KEY // Hier wird der Admin Key genutzt
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
    console.log("LNbits HTTP Status:", lnbitsResponse.status);
    console.log("LNbits Response Body:", JSON.stringify(lnbitsData));

    if (!lnbitsResponse.ok || !lnbitsData.lnurl) {
      // Sende die detaillierte Antwort zurück an das Frontend
      return res.status(500).json({ 
        error: 'LNbits Rejected', 
        lnbits_status: lnbitsResponse.status,
        lnbits_message: lnbitsData.detail || lnbitsData.message || "Unknown Error",
        used_key_start: ADMIN_KEY.substring(0, 4) + "..." // Damit du siehst, welchen Key er nahm
      });
    }

    // 5. Erfolg
    await supabaseAdmin.from('duels').update({ claimed: true }).eq('id', duelId);
    return res.status(200).json(lnbitsData);

  } catch (error) {
    console.error("Exception:", error);
    return res.status(500).json({ error: 'Exception', details: error.message });
  }
}