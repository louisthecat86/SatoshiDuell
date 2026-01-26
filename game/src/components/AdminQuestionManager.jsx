import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Save, Plus, X, Check, Search, Loader2, Edit2, Globe } from 'lucide-react';

// Supabase Setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AdminQuestionManager({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  // Welcher Sprach-Tab ist im Editor aktiv?
  const [activeLang, setActiveLang] = useState('de'); // 'de', 'en', 'es'

  // Form State - Jetzt für ALLE Sprachen
  const [formData, setFormData] = useState({
    // Deutsch
    q_de: '', a1_de: '', a2_de: '', a3_de: '', a4_de: '',
    // Englisch
    q_en: '', a1_en: '', a2_en: '', a3_en: '', a4_en: '',
    // Spanisch
    q_es: '', a1_es: '', a2_es: '', a3_es: '', a4_es: '',
    
    correct: 0,
    difficulty: 'medium'
  });

  // 1. Fragen laden
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) alert("Fehler beim Laden: " + error.message);
    else setQuestions(data || []);
    setLoading(false);
  };

  // 2. Frage löschen
  const handleDelete = async (id) => {
    if (!confirm("Frage wirklich unwiderruflich löschen?")) return;
    const { error } = await supabase.from('questions').delete().eq('id', id);
    if (error) alert("Fehler: " + error.message);
    else fetchQuestions();
  };

  // 3. Status toggeln
  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('questions').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) fetchQuestions();
  };

  // 4. Editor öffnen (Daten laden)
  const openEditor = (q = null) => {
    setActiveLang('de'); // Immer mit Deutsch starten
    if (q) {
      setEditingId(q.id);
      setFormData({
        // Deutsch laden
        q_de: q.question_de || '',
        a1_de: q.options_de?.[0] || '', a2_de: q.options_de?.[1] || '', a3_de: q.options_de?.[2] || '', a4_de: q.options_de?.[3] || '',
        
        // Englisch laden (Falls vorhanden, sonst leer)
        q_en: q.question_en || '',
        a1_en: q.options_en?.[0] || '', a2_en: q.options_en?.[1] || '', a3_en: q.options_en?.[2] || '', a4_en: q.options_en?.[3] || '',

        // Spanisch laden
        q_es: q.question_es || '',
        a1_es: q.options_es?.[0] || '', a2_es: q.options_es?.[1] || '', a3_es: q.options_es?.[2] || '', a4_es: q.options_es?.[3] || '',

        correct: q.correct_index,
        difficulty: q.difficulty || 'medium'
      });
    } else {
      // Alles leer für neue Frage
      setEditingId('NEW');
      setFormData({
        q_de: '', a1_de: '', a2_de: '', a3_de: '', a4_de: '',
        q_en: '', a1_en: '', a2_en: '', a3_en: '', a4_en: '',
        q_es: '', a1_es: '', a2_es: '', a3_es: '', a4_es: '',
        correct: 0, difficulty: 'medium'
      });
    }
  };

  // 5. Speichern
  const handleSave = async () => {
    // Prüfen ob Deutsch (Basis) ausgefüllt ist
    if (!formData.q_de || !formData.a1_de || !formData.a2_de) {
      alert("Bitte zumindest die deutsche Frage und Antworten ausfüllen!");
      return;
    }

    const payload = {
      // Deutsch
      question_de: formData.q_de,
      options_de: [formData.a1_de, formData.a2_de, formData.a3_de, formData.a4_de],
      
      // Englisch (Fallback auf leeren String, falls nicht ausgefüllt)
      question_en: formData.q_en || null,
      options_en: formData.q_en ? [formData.a1_en, formData.a2_en, formData.a3_en, formData.a4_en] : null,

      // Spanisch
      question_es: formData.q_es || null,
      options_es: formData.q_es ? [formData.a1_es, formData.a2_es, formData.a3_es, formData.a4_es] : null,

      correct_index: parseInt(formData.correct),
      difficulty: formData.difficulty,
      is_active: true
    };

    let error;
    if (editingId === 'NEW') {
      const res = await supabase.from('questions').insert([payload]);
      error = res.error;
    } else {
      const res = await supabase.from('questions').update(payload).eq('id', editingId);
      error = res.error;
    }

    if (error) alert("Speicherfehler: " + error.message);
    else {
      setEditingId(null);
      fetchQuestions();
    }
  };

  // Filterung
  const filtered = questions.filter(q => 
    (q.question_de && q.question_de.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (q.question_en && q.question_en.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- EDITOR VIEW ---
  if (editingId) {
    // Labels für die aktuelle Sprache
    const labels = {
      de: { t: 'Deutsch', flag: '🇩🇪' },
      en: { t: 'Englisch', flag: '🇺🇸' },
      es: { t: 'Spanisch', flag: '🇪🇸' }
    };

    return (
      <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 text-white w-full max-w-2xl mx-auto h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-orange-500">{editingId === 'NEW' ? 'Neue Frage erstellen' : 'Frage bearbeiten'}</h2>
        
        {/* TABS für Sprachen */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
          {['de', 'en', 'es'].map(lang => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-2 rounded-t-lg font-bold text-sm flex items-center gap-2 transition-colors ${activeLang === lang ? 'bg-white/10 text-white border-b-2 border-orange-500' : 'text-neutral-500 hover:text-white'}`}
            >
              <span>{labels[lang].flag}</span> {labels[lang].t}
            </button>
          ))}
        </div>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
          
          {/* FRAGE EINGABE */}
          <div>
            <label className="text-xs uppercase text-neutral-500 font-bold">Frage ({labels[activeLang].t})</label>
            <input 
              className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white mt-1 focus:border-orange-500 outline-none" 
              placeholder={activeLang === 'de' ? 'Hier Frage eingeben...' : '(Optional) Übersetzung...'}
              value={formData[`q_${activeLang}`]} 
              onChange={e => setFormData({...formData, [`q_${activeLang}`]: e.target.value})} 
            />
          </div>

          {/* ANTWORTEN EINGABE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`p-3 rounded-lg border ${formData.correct === i ? 'border-green-500 bg-green-500/5' : 'border-white/10'}`}>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] uppercase text-neutral-400 font-bold">Antwort {i+1}</label>
                  {/* Correct-Button nur im DE Tab anzeigen, um Verwirrung zu vermeiden, oder überall? Überall ist okay. */}
                  <button onClick={() => setFormData({...formData, correct: i})} className={`text-[10px] font-bold uppercase ${formData.correct === i ? 'text-green-500' : 'text-neutral-600 hover:text-neutral-400'}`}>
                    {formData.correct === i ? '✅ IST RICHTIG' : '⚪ Setze als Richtig'}
                  </button>
                </div>
                <input 
                  className="w-full bg-black/50 border border-white/10 p-2 rounded text-sm text-white focus:border-blue-500 outline-none"
                  placeholder={`Antwort ${i+1} (${activeLang})`}
                  value={formData[`a${i+1}_${activeLang}`]} 
                  onChange={e => setFormData({...formData, [`a${i+1}_${activeLang}`]: e.target.value})} 
                />
              </div>
            ))}
          </div>
          
          {activeLang !== 'de' && (
            <p className="text-[10px] text-neutral-500 italic mt-2">
              Hinweis: Wenn du die Übersetzung leer lässt, wird diese Sprache für diese Frage im Spiel übersprungen (Fallback auf Englisch/Deutsch).
            </p>
          )}

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
             <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-green-500/20 transition-all"><Save size={18}/> Speichern</button>
             <button onClick={() => setEditingId(null)} className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-xl font-bold">Abbrechen</button>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-neutral-400 hover:text-white text-xs uppercase font-bold flex items-center gap-1"><ArrowLeft size={14}/> Zurück</button>
        <h2 className="text-xl font-black text-white uppercase tracking-widest">Fragen DB ({questions.length})</h2>
        <button onClick={() => openEditor()} className="bg-orange-500 text-black p-2 rounded-lg hover:bg-orange-400 shadow-lg hover:shadow-orange-500/20 transition-all"><Plus size={20}/></button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-neutral-500" size={16} />
        <input 
          type="text" 
          placeholder="Frage suchen (DE oder EN)..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white outline-none focus:border-orange-500 transition-all"
        />
      </div>

      {loading ? <div className="text-center py-10"><Loader2 className="animate-spin text-orange-500 mx-auto"/></div> : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {filtered.map(q => (
            <div key={q.id} className={`p-3 rounded-xl border flex justify-between items-center transition-colors ${q.is_active ? 'bg-neutral-900/60 border-white/5 hover:border-white/10' : 'bg-red-900/10 border-red-500/20 opacity-60'}`}>
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-bold text-white mb-1 truncate">{q.question_de}</p>
                <div className="flex gap-2 items-center">
                   <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 rounded">{q.difficulty}</span>
                   {/* Zeige Flaggen für vorhandene Sprachen */}
                   <div className="flex gap-1 opacity-50">
                     {q.question_en && <span title="Englisch vorhanden">🇺🇸</span>}
                     {q.question_es && <span title="Spanisch vorhanden">🇪🇸</span>}
                   </div>
                   {!q.is_active && <span className="text-[10px] bg-red-500 text-white px-1.5 rounded font-bold">INAKTIV</span>}
                </div>
              </div>
              <div className="flex gap-2 ml-2 shrink-0">
                <button onClick={() => toggleActive(q.id, q.is_active)} title={q.is_active ? "Deaktivieren" : "Aktivieren"} className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                  {q.is_active ? <Check size={16} className="text-green-500"/> : <X size={16}/>}
                </button>
                <button onClick={() => openEditor(q)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
                  <Edit2 size={16}/>
                </button>
                <button onClick={() => handleDelete(q.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Kleines Icon für den Back-Button, falls nicht importiert
const ArrowLeft = ({size}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);