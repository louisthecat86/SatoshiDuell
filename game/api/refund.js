// api/refund.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY;
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  if (!ADMIN_KEY || !LNBITS_URL) {
    return res.status(500).json({ error: 'Server Config Error' });
  }

  const { amount, duelId, reason } = req.body;

  try {
    // URL bereinigen
    const cleanUrl = LNBITS_URL.replace(/\/$/, '');
    
    // Wir erstellen einen Withdraw Link (genau wie beim Gewinnen)
    // aber mit dem Titel "Refund"
    const lnbitsResponse = await fetch(`${cleanUrl}/withdraw/api/v1/links`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Api-Key': ADMIN_KEY 
      },
      body: JSON.stringify({ 
        title: `SatoshiDuell Refund #${duelId}`, 
        min_withdrawable: amount, 
        max_withdrawable: amount, 
        uses: 1, 
        wait_time: 1, 
        is_unique: true 
      })
    });

    const data = await lnbitsResponse.json();
    
    if (!data.lnurl) {
        return res.status(500).json({ error: 'LNbits Error', details: data });
    }
    
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Communication failed' });
  }
}