import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Save, Plus, X, Check, Search, Loader2, Edit2 } from 'lucide-react';

// Supabase Setup (nutzt deine Umgebungsvariablen)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AdminQuestionManager({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  // Form State für neue/bearbeitete Frage
  const [formData, setFormData] = useState({
    q_de: '', a1_de: '', a2_de: '', a3_de: '', a4_de: '',
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
    else fetchQuestions(); // Liste neu laden
  };

  // 3. Status toggeln (Aktiv / Inaktiv)
  const toggleActive = async (id, currentStatus) => {
    const { error } = await supabase.from('questions').update({ is_active: !currentStatus }).eq('id', id);
    if (!error) fetchQuestions();
  };

  // 4. Editor öffnen (für neue oder existierende Frage)
  const openEditor = (q = null) => {
    if (q) {
      setEditingId(q.id);
      setFormData({
        q_de: q.question_de,
        a1_de: q.options_de[0], a2_de: q.options_de[1], a3_de: q.options_de[2], a4_de: q.options_de[3],
        correct: q.correct_index,
        difficulty: q.difficulty || 'medium'
      });
    } else {
      setEditingId('NEW');
      setFormData({ q_de: '', a1_de: '', a2_de: '', a3_de: '', a4_de: '', correct: 0, difficulty: 'medium' });
    }
  };

  // 5. Speichern (Insert oder Update)
  const handleSave = async () => {
    const payload = {
      question_de: formData.q_de,
      options_de: [formData.a1_de, formData.a2_de, formData.a3_de, formData.a4_de],
      correct_index: parseInt(formData.correct),
      difficulty: formData.difficulty,
      is_active: true
    };

    if (!payload.question_de || payload.options_de.some(o => !o)) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

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
    q.question_de.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDER ---
  if (editingId) {
    return (
      <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 text-white w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-orange-500">{editingId === 'NEW' ? 'Neue Frage erstellen' : 'Frage bearbeiten'}</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase text-neutral-500 font-bold">Frage (Deutsch)</label>
            <input className="w-full bg-black/50 border border-white/20 p-3 rounded-lg text-white" 
                   value={formData.q_de} onChange={e => setFormData({...formData, q_de: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`p-2 rounded-lg border ${formData.correct === i ? 'border-green-500 bg-green-500/10' : 'border-white/10'}`}>
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] uppercase text-neutral-400">Antwort {i+1}</label>
                  <button onClick={() => setFormData({...formData, correct: i})} className={`text-[10px] font-bold uppercase ${formData.correct === i ? 'text-green-500' : 'text-neutral-600'}`}>
                    {formData.correct === i ? 'IST RICHTIG' : 'Als Richtig setzen'}
                  </button>
                </div>
                <input className="w-full bg-black/50 border border-white/10 p-2 rounded text-sm text-white"
                       value={formData[`a${i+1}_de`]} onChange={e => setFormData({...formData, [`a${i+1}_de`]: e.target.value})} />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
             <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"><Save size={18}/> Speichern</button>
             <button onClick={() => setEditingId(null)} className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2 rounded-xl font-bold">Abbrechen</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-neutral-400 hover:text-white text-xs uppercase font-bold">← Zurück</button>
        <h2 className="text-xl font-black text-white uppercase tracking-widest">Fragen DB ({questions.length})</h2>
        <button onClick={() => openEditor()} className="bg-orange-500 text-black p-2 rounded-lg hover:bg-orange-400"><Plus size={20}/></button>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-neutral-500" size={16} />
        <input 
          type="text" 
          placeholder="Frage suchen..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white outline-none focus:border-orange-500"
        />
      </div>

      {loading ? <div className="text-center py-10"><Loader2 className="animate-spin text-orange-500 mx-auto"/></div> : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {filtered.map(q => (
            <div key={q.id} className={`p-3 rounded-xl border flex justify-between items-center ${q.is_active ? 'bg-neutral-900/60 border-white/5' : 'bg-red-900/20 border-red-500/30 opacity-70'}`}>
              <div className="flex-1">
                <p className="text-sm font-bold text-white mb-1 line-clamp-1">{q.question_de}</p>
                <div className="flex gap-2">
                   <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 rounded">{q.difficulty}</span>
                   {!q.is_active && <span className="text-[10px] bg-red-500 text-white px-1.5 rounded font-bold">INAKTIV</span>}
                </div>
              </div>
              <div className="flex gap-2 ml-2">
                <button onClick={() => toggleActive(q.id, q.is_active)} title={q.is_active ? "Deaktivieren" : "Aktivieren"} className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white">
                  {q.is_active ? <Check size={16} className="text-green-500"/> : <X size={16}/>}
                </button>
                <button onClick={() => openEditor(q)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white">
                  <Edit2 size={16}/>
                </button>
                <button onClick={() => handleDelete(q.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white">
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