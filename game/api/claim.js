export default async function handler(req, res) {
  // Debugging: Sehen, ob die Funktion überhaupt startet
  console.log("API /api/claim wurde aufgerufen");

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY;
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  // Debugging: Prüfen ob Variablen da sind (ohne den Key zu leaken!)
  console.log("URL Config:", LNBITS_URL ? "Vorhanden" : "FEHLT");
  console.log("Key Config:", ADMIN_KEY ? "Vorhanden" : "FEHLT");

  if (!ADMIN_KEY || !LNBITS_URL) {
    console.error("Server Config Error: Variablen fehlen in Vercel");
    return res.status(500).json({ error: 'Server Config Error' });
  }

  const { amount, duelId } = req.body;
  console.log(`Versuche Auszahlung: ${amount} Sats für Duel ${duelId}`);

  try {
    const prize = amount * 2;
    
    // Wichtig: Sicherstellen, dass URL kein Slash am Ende hat, sonst gibt es //api
    const cleanUrl = LNBITS_URL.replace(/\/$/, '');
    const targetUrl = `${cleanUrl}/withdraw/api/v1/links`;
    
    console.log("Sende Anfrage an:", targetUrl);

    const lnbitsResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Api-Key': ADMIN_KEY 
      },
      body: JSON.stringify({ 
        title: `SatoshiDuell Win #${duelId}`, 
        min_withdrawable: prize, 
        max_withdrawable: prize, 
        uses: 1, 
        wait_time: 1, 
        is_unique: true 
      })
    });

    const data = await lnbitsResponse.json();
    console.log("LNbits Antwort:", data);

    if (!data.lnurl) {
        console.error("LNbits hat keinen Link zurückgegeben!", data);
        return res.status(500).json({ error: 'LNbits Error', details: data });
    }
    
    return res.status(200).json(data);

  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ error: 'Communication failed', details: error.message });
  }
}