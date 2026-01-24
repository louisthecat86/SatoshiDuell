import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Verbindung mit dem Admin-Key herstellen (Secret Key von Vercel)
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Hole das JSON aus der Datenbank (Tabelle game_config, ID 1)
    const { data, error } = await supabaseAdmin
      .from('game_config')
      .select('questions_json')
      .eq('id', 1)
      .single();

    if (error) throw error;

    // Cache für 1 Stunde, damit es schnell lädt
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    // Sende die Fragen an die App
    return res.status(200).json(data.questions_json);

  } catch (error) {
    console.error("Fehler API:", error);
    return res.status(500).json({ error: 'Server Error' });
  }
}