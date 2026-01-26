import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Verbindung mit dem Admin-Key herstellen
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // NEU: Wir holen jetzt ALLE Zeilen aus der neuen Tabelle 'questions'
    // Wir filtern nach 'is_active', damit du später Fragen deaktivieren kannst
    const { data, error } = await supabaseAdmin
      .from('questions')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    // TRANSFORMATION:
    // Dein Spiel erwartet die Struktur: { de: {q: "...", options: [...]}, correct: 0 }
    // Unsere Datenbank liefert aber: { question_de: "...", options_de: [...], correct_index: 0 }
    // Wir wandeln das hier um, damit dein Spiel nicht abstürzt.
    
    const formattedQuestions = data.map((row) => ({
      de: { q: row.question_de, options: row.options_de },
      en: { q: row.question_en, options: row.options_en },
      es: { q: row.question_es, options: row.options_es },
      correct: row.correct_index,
      id: row.id // Wir geben die ID mit, das hilft später beim Admin-Dashboard
    }));

    // Cache für 1 Stunde (wie vorher)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    // Sende die UMGEWANDELTEN Fragen an die App
    return res.status(200).json(formattedQuestions);

  } catch (error) {
    console.error("Fehler API:", error);
    return res.status(500).json({ error: 'Server Error' });
  }
}