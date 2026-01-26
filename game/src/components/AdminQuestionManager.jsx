import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Save, Plus, X, Check, Search, Loader2, Edit2, Globe, ArrowLeft as ArrowLeftIcon } from 'lucide-react';

// Supabase Setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AdminQuestionManager({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Editor State
  const [editingId, setEditingId] = useState(null);
  const [activeLang, setActiveLang] = useState('de'); // 'de', 'en', 'es'

  // View Mode: 'active' (Deine Datenbank) oder 'inbox' (Eingereichte Fragen)
  const [viewMode, setViewMode] = useState('active'); 

  // Form State
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

  // 3. Status toggeln (Aktiv / Inaktiv)
  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('questions').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) fetchQuestions();
  };

  // 4. Frage GENEHMIGEN (Aus Posteingang)
  const handleApprove = async (q) => {
    // Wir setzen sie auf verifiziert, aktiv und markieren sie für eine Benachrichtigung
    const { error } = await supabase.from('questions').update({
      is_active: true,
      is_verified: true,
      user_notified: false // Wichtig: Damit der User beim Login die Nachricht bekommt
    }).eq('id', q.id);

    if (error) alert("Fehler: " + error.message);
    else fetchQuestions();
  };

  // 5. Editor öffnen (Daten laden)
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

  // 6. Speichern
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
      
      // Englisch (Fallback auf null)
      question_en: formData.q_en || null,
      options_en: formData.q_en ? [formData.a1_en, formData.a2_en, formData.a3_en, formData.a4_en] : null,

      // Spanisch
      question_es: formData.q_es || null,
      options_es: formData.q_es ? [formData.a1_es, formData.a2_es, formData.a3_es, formData.a4_es] : null,

      correct_index: parseInt(formData.correct),
      difficulty: formData.difficulty,
      
      // Wenn wir speichern/bearbeiten, gilt sie automatisch als verifiziert (außer man will es anders)
      is_verified: true, 
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

  // --- FILTER LOGIK ---
  
  // 1. Posteingang: Nicht verifiziert
  const inboxQuestions = questions.filter(q => !q.is_verified);
  
  // 2. Datenbank: Verifiziert
  const activeQuestions = questions.filter(q => q.is_verified);

  // 3. Suche anwenden (auf den aktuell sichtbaren Tab)
  const listToRender = (viewMode === 'inbox' ? inboxQuestions : activeQuestions).filter(q => 
    (q.question_de && q.question_de.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (q.question_en && q.question_en?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (q.submitted_by && q.submitted_by.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  // --- EDITOR VIEW (Modal) ---
  if (editingId) {
    const labels = {
      de: { t: 'Deutsch', flag: '🇩🇪' },
      en: { t: 'Englisch', flag: '🇺🇸' },
      es: { t: 'Spanisch', flag: '🇪🇸' }
    };

    return (
      <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 text-white w-full max-w-2xl mx-auto h-full flex flex-col animate-in slide-in-from-bottom-5">
        <h2 className="text-xl font-bold mb-4 text-orange-500">{editingId === 'NEW' ? 'Neue Frage erstellen' : 'Frage bearbeiten'}</h2>
        
        {/* SPRACH TABS */}
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
          {/* FRAGE */}
          <div>
            <label className="text-xs uppercase text-neutral-500 font-bold">Frage ({labels[activeLang].t})</label>
            <input 
              className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white mt-1 focus:border-orange-500 outline-none" 
              placeholder={activeLang === 'de' ? 'Hier Frage eingeben...' : '(Optional) Übersetzung...'}
              value={formData[`q_${activeLang}`]} 
              onChange={e => setFormData({...formData, [`q_${activeLang}`]: e.target.value})} 
            />
          </div>

          {/* ANTWORTEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`p-3 rounded-lg border ${formData.correct === i ? 'border-green-500 bg-green-500/5' : 'border-white/10'}`}>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] uppercase text-neutral-400 font-bold">Antwort {i+1}</label>
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
              Hinweis: Wenn du die Übersetzung leer lässt, wird diese Sprache für diese Frage im Spiel übersprungen.
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
             <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-green-500/20 transition-all"><Save size={18}/> Speichern</button>
             <button onClick={() => setEditingId(null)} className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-xl font-bold">Abbrechen</button>
        </div>
      </div>
    );
  }

  // --- HAUPT LISTE ---
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-neutral-400 hover:text-white text-xs uppercase font-bold flex items-center gap-1"><ArrowLeftIcon size={14}/> Zurück</button>
        
        {/* VIEW SWITCHER */}
        <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
           <button onClick={() => setViewMode('active')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${viewMode === 'active' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>Datenbank</button>
           <button onClick={() => setViewMode('inbox')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${viewMode === 'inbox' ? 'bg-orange-500 text-black' : 'text-neutral-500'}`}>
             Posteingang
             {inboxQuestions.length > 0 && <span className="bg-red-500 text-white text-[8px] px-1.5 rounded-full animate-pulse">{inboxQuestions.length}</span>}
           </button>
        </div>

        <button onClick={() => openEditor()} className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20"><Plus size={20}/></button>
      </div>

      {viewMode === 'active' && (
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-neutral-500" size={16} />
          <input 
            type="text" 
            placeholder="Suchen..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white outline-none focus:border-orange-500 transition-all"
          />
        </div>
      )}

      {loading ? <div className="text-center py-10"><Loader2 className="animate-spin text-orange-500 mx-auto"/></div> : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          
          {listToRender.length === 0 && <p className="text-center text-neutral-500 text-xs italic mt-10">Keine Einträge gefunden.</p>}

          {listToRender.map(q => (
            <div key={q.id} className={`p-3 rounded-xl border flex flex-col gap-2 transition-colors ${viewMode === 'inbox' ? 'bg-orange-500/5 border-orange-500/30' : (q.is_active ? 'bg-neutral-900/60 border-white/5' : 'bg-red-900/10 border-red-500/20 opacity-60')}`}>
              
              <div className="flex justify-between items-start">
                 <div className="flex-1 min-w-0 pr-2">
                    {/* Header Info */}
                    <div className="flex gap-2 items-center mb-1">
                       {q.submitted_by && <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 rounded border border-purple-500/30 uppercase font-bold">VON: {q.submitted_by}</span>}
                       <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 rounded">{q.difficulty}</span>
                       <div className="flex gap-1 opacity-50">
                         {q.question_en && <span title="Englisch">🇺🇸</span>}
                         {q.question_es && <span title="Spanisch">🇪🇸</span>}
                       </div>
                    </div>
                    {/* Die Frage */}
                    <p className="text-sm font-bold text-white line-clamp-2">"{q.question_de}"</p>
                 </div>

                 {/* Actions */}
                 <div className="flex gap-1 shrink-0">
                    {viewMode === 'inbox' && (
                       <button onClick={() => handleApprove(q)} className="p-2 bg-green-500 text-black rounded-lg hover:scale-105 transition-transform" title="Annehmen">
                          <Check size={16}/>
                       </button>
                    )}
                    {viewMode === 'active' && (
                       <button onClick={() => toggleActive(q.id, q.is_active)} className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white">
                          {q.is_active ? <Check size={16} className="text-green-500"/> : <X size={16}/>}
                       </button>
                    )}
                    <button onClick={() => openEditor(q)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white">
                       <Edit2 size={16}/>
                    </button>
                    <button onClick={() => handleDelete(q.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white">
                       <Trash2 size={16}/>
                    </button>
                 </div>
              </div>

              {/* Bei Inbox zeigen wir auch die Antworten zur Prüfung an */}
              {viewMode === 'inbox' && (
                 <div className="grid grid-cols-2 gap-1 mt-2">
                    {q.options_de.map((opt, i) => (
                       <div key={i} className={`text-[10px] p-1 px-2 rounded border ${i === q.correct_index ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-white/5 text-neutral-500'}`}>
                          {opt}
                       </div>
                    ))}
                 </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}