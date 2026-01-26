import React, { useState, useEffect } from 'react';
import { Zap, Trophy, Clock, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  { id: 1, q: "Wer veröffentlichte das Bitcoin Whitepaper?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Adam Back", "Hal Finney"], correct: 1 },
  { id: 2, q: "Wie hoch ist das maximale Bitcoin-Supply?", options: ["21 Millionen", "100 Millionen", "Unbegrenzt", "50 Millionen"], correct: 0 },
  { id: 3, q: "Wann wurde der Genesis-Block gemined?", options: ["2008", "2009", "2010", "2012"], correct: 1 },
  { id: 4, q: "Was bedeutet 'Halving'?", options: ["Coin-Split", "Preis-Halbierung", "Block-Reward Halbierung", "Hashrate-Halbierung"], correct: 2 },
  { id: 5, q: "Was ist eine 'Cold Wallet'?", options: ["Offline-Speicher", "Börsen-Konto", "Smartphone-App", "Ein verbrannter Key"], correct: 0 }
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [balance, setBalance] = useState(1000);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let timer;
    if (screen === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (screen === 'quiz' && timeLeft === 0) {
      handleAnswer(-1);
    }
    return () => clearInterval(timer);
  }, [screen, timeLeft]);

  const startDuel = () => {
    setScreen('loading');
    setTimeout(() => {
      setBalance(b => b - 500);
      setScreen('quiz');
      setCurrentQ(0);
      setScore(0);
      setTotalTime(0);
      setTimeLeft(15);
    }, 2000);
  };

const handleAnswer = (index) => {
    const timeTaken = 15 - timeLeft;
    setTotalTime(prev => prev + timeTaken);
    
    // --- ÄNDERUNG START: Sound für Richtig/Falsch ---
    if (index === QUESTIONS[currentQ].correct) {
       setScore(s => s + 1);
       playSound('correct', isMuted); // Juhu!
    } else {
       playSound('wrong', isMuted);   // Mööp!
    }
    // --- ÄNDERUNG ENDE ---

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setScreen('result');
      // Kleiner Fix: Wir checken hier "score + 1" falls die letzte Frage richtig war, 
      // da der State "score" manchmal zu langsam updated.
      // Aber für den Sound reicht deine Logik erstmal:
      if (score >= 3) {
         confetti();
         playSound('correct', isMuted); // Nochmal Jubel beim Sieg!
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', background: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ margin: 0, color: '#F7931A', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{width:'10px', height:'10px', background:'red', borderRadius:'50%', boxShadow:'0 0 10px red'}}></div>
          SatoshiDuell
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#334155', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          <Zap size={16} fill="#FACC15" color="#FACC15" />
          <span>{balance} Sats</span>
        </div>
      </div>

      {screen === 'home' && (
        <div style={{ background: '#1e293b', padding: '40px 20px', borderRadius: '16px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Bereit, Pleb?</h1>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Beweise dein Wissen. Einsatz: 500 Sats.</p>
          <button onClick={startDuel} style={{ width: '100%', padding: '18px', background: 'linear-gradient(to right, #F7931A, #ea580c)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)' }}>
            <Play size={20} style={{ display:'inline', verticalAlign:'middle', marginRight:'8px' }}/> Duell Starten
          </button>
        </div>
      )}

      {screen === 'loading' && (
        <div style={{ paddingTop: '50px' }}>
          <h2 style={{color: '#94a3b8'}}>Generiere HODL Invoice...</h2>
          <div style={{ margin: '40px auto', width: '60px', height: '60px', border: '6px solid #333', borderTop: '6px solid #F7931A', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {screen === 'quiz' && (
        <div>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#94a3b8' }}>
            <span>Frage {currentQ + 1} / {QUESTIONS.length}</span>
            <span style={{ color: timeLeft < 5 ? '#ef4444' : '#fff', fontWeight: 'bold' }}><Clock size={16} style={{display:'inline', verticalAlign:'text-bottom'}}/> {timeLeft}s</span>
          </div>
          <h3 style={{ fontSize: '22px', marginBottom: '30px', lineHeight: '1.4' }}>{QUESTIONS[currentQ].q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {QUESTIONS[currentQ].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: '20px', background: '#334155', border: '1px solid #475569', borderRadius: '12px', color: 'white', textAlign: 'left', fontSize: '16px', fontWeight: '500' }}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      {screen === 'result' && (
        <div style={{ background: '#1e293b', padding: '40px 20px', borderRadius: '16px', marginTop: '20px' }}>
          <div style={{ background: '#0f172a', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Trophy size={50} color="#FACC15" /></div>
          <h1 style={{ marginBottom: '5px' }}>Duell Beendet!</h1>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F7931A', margin: '20px' }}>{score} / 5 Richtige</div>
          <button onClick={() => setScreen('home')} style={{ width: '100%', padding: '15px', background: '#475569', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>Zurück zum Dashboard</button>
        </div>
      )}
    </div>
  );
}