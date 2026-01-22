// api/claim.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Dieser Key ist sicher auf dem Server und nie im Browser sichtbar
  const ADMIN_KEY = process.env.LNBITS_ADMIN_KEY; 
  const LNBITS_URL = process.env.VITE_LNBITS_URL;

  if (!ADMIN_KEY) return res.status(500).json({ error: 'Server Config Error' });

  const { amount, duelId } = req.body;

  try {
    const prize = amount * 2;
    // Anfrage an LNbits senden
    const lnbitsResponse = await fetch(`${LNBITS_URL}/withdraw/api/v1/links`, {
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
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'LNbits communication failed' });
  }
}