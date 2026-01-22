// api/donate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Die Adresse sicher vom Server holen (Versteckt vor dem Browser)
  const lnAddress = process.env.DONATION_LN_ADDRESS;

  if (!lnAddress) {
    return res.status(500).json({ error: 'Donation address not configured on server' });
  }

  const { amount } = req.body; // Betrag in Sats

  if (!amount || amount < 1) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    // 2. Lightning Address zerlegen (user@domain)
    const [user, domain] = lnAddress.split('@');
    
    // 3. LNURL Pay Request an den Provider (Blink) senden
    // Schritt A: Metadaten und Callback URL holen
    const lnurlRes = await fetch(`https://${domain}/.well-known/lnurlp/${user}`);
    const lnurlData = await lnurlRes.json();

    if (!lnurlData.callback) {
      return res.status(500).json({ error: 'Invalid Lightning Address response' });
    }

    // Schritt B: Die eigentliche Rechnung (Invoice) abrufen
    // Blink/LNURL erwartet Millisats (Sats * 1000)
    const millisats = amount * 1000;
    const callbackUrl = `${lnurlData.callback}?amount=${millisats}`;
    
    const invoiceRes = await fetch(callbackUrl);
    const invoiceData = await invoiceRes.json();

    // 4. Nur die Rechnung (pr) an das Frontend zurückgeben
    return res.status(200).json({ req: invoiceData.pr });

  } catch (error) {
    console.error("Donation Error:", error);
    return res.status(500).json({ error: 'Failed to generate invoice' });
  }
}