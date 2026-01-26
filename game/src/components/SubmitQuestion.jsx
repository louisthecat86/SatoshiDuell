import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function SubmitQuestion({ user, onBack }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    q: '', a1: '', a2: '', a3: '', a4: '', correct: 0
  });

  const handleSubmit = async () => {
    if (!formData.q || !formData.a1 || !formData.a2) {
      alert("Bitte fülle mindestens die Frage und zwei Antworten aus.");
      return;
    }

    setLoading(true);
    
    // Wir speichern die Frage als "inaktiv" und "nicht verifiziert"
    const payload = {
      question_de: formData.q,
      options_de: [formData.a1, formData.a2, formData.a3, formData.a4],
      correct_index: parseInt(formData.correct),
      difficulty: 'medium',
      
      // Community Flags
      is_active: false,        // Erstmal unsichtbar im Spiel
      is_verified: false,      // Muss vom Admin geprüft werden
      submitted_by: user.name, // Damit wir wissen, wer es war
      user_notified: false     // Noch nicht benachrichtigt
    };

    const { error } = await supabase.from('questions').insert([payload]);

    setLoading(false);
    if (error) {
      alert("Fehler: " + error.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4 animate-in fade-in">
        <CheckCircle size={64} className="text-green-500" />
        <h2 className="text-2xl font-black text-white uppercase">Eingereicht!</h2>
        <p className="text-neutral-400 text-sm">Danke für deinen Beitrag.<br/>Wir prüfen deine Frage.</p>
        <p className="text-neutral-500 text-xs italic mt-2">Wenn sie angenommen wird, erhältst du eine Nachricht!</p>
        <button onClick={onBack} className="mt-6 text-neutral-400 hover:text-white font-bold uppercase text-xs">Zurück</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="bg-white/10 p-2 rounded-xl hover:bg-white/20"><ArrowLeft className="text-white" /></button>
        <h2 className="text-xl font-black text-orange-500 uppercase tracking-widest">Frage einreichen</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl text-orange-200 text-xs mb-4">
          <p className="font-bold mb-1">So funktioniert's:</p>
          <ul className="list-disc pl-4 space-y-1 opacity-80">
            <li>Schreibe eine interessante Bitcoin-Frage.</li>
            <li>Gib 4 mögliche Antworten an.</li>
            <li>Markiere die Richtige.</li>
            <li>Wir prüfen sie und schalten sie frei!</li>
          </ul>
        </div>

        <div>
          <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Deine Frage</label>
          <input className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white mt-1 outline-none focus:border-orange-500" 
                 placeholder="Was ist..." value={formData.q} onChange={e => setFormData({...formData, q: e.target.value})} />
        </div>

        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`p-2 rounded-xl border flex items-center gap-3 ${formData.correct === i ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-black/20'}`}>
              <button onClick={() => setFormData({...formData, correct: i})} className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.correct === i ? 'bg-green-500 border-green-500' : 'border-neutral-500'}`}>
                {formData.correct === i && <CheckCircle size={14} className="text-black" />}
              </button>
              <input className="bg-transparent w-full text-sm text-white outline-none" 
                     placeholder={`Antwort ${i+1}`} value={formData[`a${i+1}`]} onChange={e => setFormData({...formData, [`a${i+1}`]: e.target.value})} />
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading} className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4">
          {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Einreichen</>}
        </button>
      </div>
    </div>
  );
}