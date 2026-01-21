import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check, ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame, History, Coins, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';

// --- EIGENE IMPORTS ---
import { ALL_QUESTIONS } from './questions';
import Button from './components/Button';
import Card from './components/Card';
import Background from './components/Background';
import PlayerName from './components/PlayerName';

// --- KONFIGURATION ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const HOUSE_FEE_PERCENT = 0; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getRandomQuestions = () => [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5);

// --- HELPER: PASSWORT HASHING (SHA-256) ---
async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- HAUPT APP ---

export default function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null);
  
  // Login State
  const [loginName, setLoginName] = useState(''); 
  const [loginPin, setLoginPin] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Game Data
  const [duelsList, setDuelsList] = useState([]);
  const [myDuels, setMyDuels] = useState([]);
  const [activeDuel, setActiveDuel] = useState(null);
  const [role, setRole] = useState(null); 
  const [questions, setQuestions] = useState([]);
  const [wager, setWager] = useState(500); 
  
  // Stats
  const [stats, setStats] = useState({ wins: 0, losses: 0, total: 0, satsWon: 0 });
  
  // Quiz Data
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  
  // Payment
  const [invoice, setInvoice] = useState({ req: '', hash: '', amount: 0 });
  const [withdrawLink, setWithdrawLink] = useState('');
  const [withdrawError, setWithdrawError] = useState(''); 
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);
  const [withdrawId, setWithdrawId] = useState(''); // Speichert die ID des LNURL-Links

  // --- LOGIC: INITIALISIERUNG & SYNC ---

  useEffect(() => {
    const storedUser = localStorage.getItem('satoshi_user');
    const savedPin = localStorage.getItem('saved_pin');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView('dashboard');
    } else if (savedPin) {
      setLoginPin(savedPin);
    }
  }, []);

  useEffect(() => {
    if (view === 'dashboard' && user) {
      fetchDuels();
      fetchMyDuels();
      fetchStats();
      
      const channel = supabase.channel('public:duels')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, () => {
          fetchDuels();
          fetchMyDuels();
          fetchStats();
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [view, user]);

  useEffect(() => {
    if (view === 'result_wait' && activeDuel) {
      const interval = setInterval(() => checkDuelStatus(), 3000);
      return () => clearInterval(interval);
    }
  }, [view, activeDuel]);

  useEffect(() => {
    let timer;
    if (view === 'game' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (view === 'game' && timeLeft === 0) {
      handleAnswer(-1);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  useEffect(() => {
    let interval;
    if (view === 'payment' && invoice.hash && !checkingPayment) {
      checkPaymentStatus();
      interval = setInterval(() => checkPaymentStatus(), 2000); 
    }
    return () => clearInterval(interval);
  }, [view, invoice, checkingPayment]);

  useEffect(() => {
  let interval;
  if (view === 'result_final' && withdrawId && !withdrawError) {
    interval = setInterval(() => checkWithdrawStatus(), 2000);
  }
  return () => clearInterval(interval);
}, [view, withdrawId]);

  // --- LOGIN LOGIK ---

  const handleManualLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError('');
    setIsLoginLoading(true);
    
    const cleanName = loginName.trim().toLowerCase();
    const cleanPin = loginPin.trim();

    if (cleanName.length < 3 || cleanPin.length < 4) {
      setLoginError("Name (min. 3) & PIN (min. 4) erforderlich.");
      setIsLoginLoading(false);
      return;
    }

    try {
      const hashedPin = await hashPin(cleanPin);
      const { data: existingUser } = await supabase
        .from('players')
        .select('*')
        .eq('name', cleanName)
        .single();

      if (existingUser) {
        if (existingUser.pin === hashedPin) {
          const userObj = { name: cleanName, pubkey: null };
          setUser(userObj);
          localStorage.setItem('satoshi_user', JSON.stringify(userObj));
          localStorage.setItem('saved_pin', cleanPin);
          setView('dashboard');
        } else {
          setLoginError("Falsche PIN für diesen Namen!");
        }
      } else {
        const { error: insertError } = await supabase
          .from('players')
          .insert([{ name: cleanName, pin: hashedPin }]);

        if (insertError) {
          setLoginError("Name vergeben oder Datenbankfehler.");
        } else {
          const userObj = { name: cleanName, pubkey: null };
          setUser(userObj);
          localStorage.setItem('satoshi_user', JSON.stringify(userObj));
          localStorage.setItem('saved_pin', cleanPin);
          setView('dashboard');
        }
      }
    } catch (err) {
      setLoginError("Login fehlgeschlagen.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleNostrLogin = async () => {
    if (!window.nostr) { alert("Keine Nostr-Extension!"); return; }
    try {
      const pubkey = await window.nostr.getPublicKey();
      const userObj = { name: `nostr-${pubkey.substring(0, 6)}`, pubkey: pubkey };
      setUser(userObj);
      localStorage.setItem('satoshi_user', JSON.stringify(userObj));
      setView('dashboard');
    } catch (e) { console.error(e); }
  };

  // --- GAME HELPER ---

  const fetchStats = async () => {
    if (!user) return;
    const { data } = await supabase.from('duels').select('*')
      .or(`creator.eq.${user.name},challenger.eq.${user.name}`)
      .eq('status', 'finished');

    if (!data) return;
    let wins = 0, sats = 0;
    data.forEach(d => {
      let iAmCreator = d.creator === user.name;
      let myScore = iAmCreator ? d.creator_score : d.challenger_score;
      let myTime = iAmCreator ? d.creator_time : d.challenger_time;
      let oppScore = iAmCreator ? d.challenger_score : d.creator_score;
      let oppTime = iAmCreator ? d.challenger_time : d.creator_time;
      if (myScore > oppScore || (myScore === oppScore && myTime < oppTime)) {
        wins++;
        sats += d.amount;
      }
    });
    setStats({ wins, losses: data.length - wins, total: data.length, satsWon: sats });
  };

  const fetchDuels = async () => {
    const { data } = await supabase.from('duels').select('*').eq('status', 'open').order('created_at', { ascending: false });
    if (data) setDuelsList(data);
  };

  const fetchMyDuels = async () => {
    if (!user) return;
    const { data } = await supabase.from('duels').select('*')
      .or(`creator.eq.${user.name},challenger.eq.${user.name}`)
      .order('created_at', { ascending: false });
    if (data) setMyDuels(data);
  };

  const checkPaymentStatus = async () => {
    if (!invoice.hash) return;
    try {
      const url = `${LNBITS_URL}/api/v1/payments/${invoice.hash}?ts=${Date.now()}`;
      const res = await fetch(url, { headers: { 'X-Api-Key': ADMIN_KEY } });
      const data = await res.json();
      if (data.paid === true || data.status === 'success') {
        setCheckingPayment(true); 
        startGame(); 
      } 
    } catch(e) { console.error(e); }
  };

  const checkWithdrawStatus = async () => {
  if (!withdrawId) return;
  try {
    const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links/${withdrawId}`, {
      headers: { 'X-Api-Key': ADMIN_KEY }
    });
    const data = await res.json();
    
    // used === 1 bedeutet, der Link wurde erfolgreich eingelöst
    if (data.used >= 1 || data.spent === true) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setView('dashboard');
        resetGameState(); // Alles für das nächste Spiel aufräumen
        setWithdrawId('');
      }, 2000); // 2 Sekunden warten, damit man den Erfolg noch sieht
    }
  } catch (e) {
    console.error("Fehler beim Prüfen des Auszahlungsstatus", e);
  }
};

  const handleManualCheck = async () => {
    setManualCheckLoading(true);
    await checkPaymentStatus(); 
    setTimeout(() => setManualCheckLoading(false), 1000);
  };

  const checkDuelStatus = async () => {
    if (!activeDuel) return;
    const { data } = await supabase.from('duels').select('*').eq('id', activeDuel.id).single();
    if (data && data.status === 'finished') {
      setActiveDuel(data);
      determineWinner(data, role, score, totalTime);
    }
  };

  const resetGameState = () => {
    setWithdrawLink(''); setWithdrawError(''); setScore(0); setTotalTime(0); setCurrentQ(0);
    setInvoice({ req: '', hash: '', amount: 0 });
  };

  const openCreateSetup = () => { resetGameState(); setWager(500); setView('create_setup'); };

  const submitCreateDuel = async () => {
    const qs = getRandomQuestions();
    setQuestions(qs); setRole('creator'); await fetchInvoice(wager);
  };

  const initJoinDuel = async (duel) => {
    resetGameState(); setActiveDuel(duel); setQuestions(duel.questions); setRole('challenger'); 
    await fetchInvoice(duel.amount);
  };

  const fetchInvoice = async (amountSat) => {
    try {
      const res = await fetch(`${LNBITS_URL}/api/v1/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY },
        body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell`, expiry: 600 })
      });
      const data = await res.json();
      setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat });
      setCheckingPayment(false); setView('payment');
    } catch (e) { alert("LNbits Error"); setView('dashboard'); }
  };

  const startGame = () => { setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15); setView('game'); };

  const handleAnswer = (index) => {
    setTotalTime(prev => prev + (15 - timeLeft));
    if (index === questions[currentQ].correct) setScore(s => s + 1);
    if (currentQ < questions.length - 1) { setCurrentQ(p => p + 1); setTimeLeft(15); } 
    else { finishGameLogic(); }
  };

  const finishGameLogic = async () => {
    if (role === 'creator') {
      await supabase.from('duels').insert([{
        creator: user.name, creator_score: score, creator_time: totalTime, 
        questions: questions, status: 'open', amount: invoice.amount
      }]);
      setView('dashboard');
    } else {
      const { data } = await supabase.from('duels').update({
        challenger: user.name, challenger_score: score, challenger_time: totalTime, status: 'finished'
      }).eq('id', activeDuel.id).select();
      if (data) { setActiveDuel(data[0]); determineWinner(data[0], 'challenger', score, totalTime); }
    }
  };

  const openPastDuel = (duel) => {
    setActiveDuel(duel);
    const myRole = duel.creator === user.name ? 'creator' : 'challenger';
    setRole(myRole);
    const myScore = myRole === 'creator' ? duel.creator_score : duel.challenger_score;
    const myTime = myRole === 'creator' ? duel.creator_time : duel.challenger_time;
    determineWinner(duel, myRole, myScore, myTime);
  };

  const determineWinner = async (duel, myRole, myScore, myTime) => {
    setView('result_final');
    const oppScore = myRole === 'creator' ? duel.challenger_score : duel.creator_score;
    const oppTime = myRole === 'creator' ? duel.challenger_time : duel.creator_time;
    const won = myScore > oppScore || (myScore === oppScore && myTime < (oppTime || 999));
    
    if (duel.status === 'finished' && won) { 
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); 
      await createWithdrawLink(duel.amount, duel.id); 
    }
  };

  const createWithdrawLink = async (duelAmount, duelId) => {
    if (withdrawLink || !ADMIN_KEY) return;
    try {
      const prize = (duelAmount * 2); 
      const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': ADMIN_KEY },
        body: JSON.stringify({ title: `SatoshiDuell Win`, min_withdrawable: prize, max_withdrawable: prize, uses: 1, wait_time: 1, is_unique: true })
      });
      // ... innerhalb von createWithdrawLink ...
  const data = await res.json();
    if (data.lnurl) {
      setWithdrawLink(data.lnurl);
      setWithdrawId(data.id); // <--- NEU: Die ID speichern zum Prüfen
  
      await supabase.from('duels').update({ claimed: true }).eq('id', duelId);
      setMyDuels(curr => curr.map(d => d.id === duelId ? {...d, claimed: true} : d));
   }
  
    } catch(e) { setWithdrawError("Withdraw Error"); }
  };

  const handleLogout = () => { 
    localStorage.removeItem('satoshi_user'); 
    localStorage.removeItem('saved_pin');
    setUser(null); 
    setLoginPin('');
    setView('login'); 
  };

  // --- VIEWS ---

  if (view === 'login') return (
    <Background>
      <div className="w-full max-w-sm flex flex-col gap-8 animate-float">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6 shadow-orange-500/20 animate-neon">
            <Zap size={48} className="text-orange-500 fill-orange-500" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">SATOSHI<span className="text-orange-500">DUELL</span></h1>
          <p className="text-neutral-400 font-medium text-xs uppercase tracking-widest">Lightning PvP Quiz</p>
        </div>

        <div className="flex flex-col gap-4">
          <form onSubmit={handleManualLogin} className="flex flex-col gap-3">
            <div className="relative">
              <User className="absolute left-4 top-4 text-neutral-500" size={18}/>
              <input type="text" placeholder="GAMERTAG" value={loginName} onChange={(e) => setLoginName(e.target.value)} className="w-full p-4 pl-12 rounded-xl bg-neutral-900/50 border border-white/10 text-white outline-none focus:border-orange-500 font-bold uppercase tracking-wider"/>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-neutral-500" size={18}/>
              <input type="password" placeholder="PIN" value={loginPin} onChange={(e) => setLoginPin(e.target.value)} className="w-full p-4 pl-12 rounded-xl bg-neutral-900/50 border border-white/10 text-white outline-none focus:border-orange-500 font-bold tracking-widest"/>
            </div>
            {loginError && <p className="text-red-500 text-xs font-bold text-center bg-red-500/10 p-2 rounded border border-red-500/20">{loginError}</p>}
            <Button variant="primary" onClick={handleManualLogin} disabled={isLoginLoading}>
              {isLoginLoading ? <Loader2 className="animate-spin mx-auto"/> : "LOGIN / START"}
            </Button>
          </form>

          <div className="relative py-2 text-center">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
            <span className="relative bg-neutral-950 px-3 text-[10px] uppercase font-bold text-neutral-600">Oder</span>
          </div>

          <Button variant="secondary" onClick={handleNostrLogin}><Fingerprint size={18}/> Login mit Nostr</Button>
        </div>
      </div>
    </Background>
  );

  if (view === 'dashboard') return (
    <Background>
      <div className="w-full max-w-md flex flex-col h-[90vh] gap-4">
        <Card className="flex justify-between items-center py-3 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center font-black text-black text-lg uppercase">{user.name.charAt(0)}</div>
            <div>
               <p className="font-bold text-white text-sm leading-none mb-1 uppercase tracking-tight">{user.name}</p>
               <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Online
               </span>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
             <div>
               <p className="text-[10px] text-neutral-500 uppercase font-bold">Wins</p>
               <p className="text-orange-400 font-mono font-black">{stats.satsWon.toLocaleString()} sats</p>
             </div>
             <button onClick={handleLogout} className="p-2 hover:bg-white/5 rounded-lg text-neutral-500"><LogOut size={18}/></button>
          </div>
        </Card>

        <Button onClick={openCreateSetup} className="py-4 text-lg animate-neon shadow-orange-500/20"><Plus size={24} strokeWidth={3}/> NEUES DUELL</Button>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest px-2"><History size={12}/> Deine Spiele</div>
          <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {myDuels.length === 0 && <p className="text-xs text-neutral-600 px-2 italic">Keine Duelle gefunden.</p>}
            {myDuels.map(d => {
              const iAmCreator = d.creator === user.name;
              const isFinished = d.status === 'finished';
              const myScore = iAmCreator ? d.creator_score : d.challenger_score;
              const oppScore = iAmCreator ? d.challenger_score : d.creator_score;
              const myTime = iAmCreator ? d.creator_time : d.challenger_time;
              const oppTime = iAmCreator ? d.challenger_time : d.creator_time;
              const won = isFinished && (myScore > (oppScore || 0) || (myScore === oppScore && myTime < (oppTime || 999)));
              
              return (
                <div key={d.id} className="bg-neutral-900/40 border border-white/5 p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="text-xs text-neutral-400 font-bold uppercase">vs {iAmCreator ? (d.challenger || "???") : d.creator}</div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-orange-400 font-mono">{d.amount} sats</span>
                      {isFinished && <span className={won ? "text-green-500 font-black" : "text-red-500 font-black"}>{won ? "GEWONNEN!" : "VERLOREN"}</span>}
                    </div>
                  </div>
                  {isFinished ? (
                    d.claimed ? <span className="text-[10px] text-neutral-600 font-bold border border-white/5 px-3 py-1.5 rounded-lg uppercase">Bezahlt ✅</span> :
                    <button onClick={() => openPastDuel(d)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${won ? 'bg-green-500 text-black border-green-500 animate-pulse' : 'bg-transparent text-neutral-500 border-white/10'}`}>{won ? 'ABHOLEN ⚡' : 'DETAILS'}</button>
                  ) : <div className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] text-neutral-500 animate-pulse uppercase font-bold">Warten...</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 overflow-hidden bg-neutral-900/20 rounded-2xl border border-white/5 p-2">
          <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest px-2"><Swords size={12}/> Lobby</div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {duelsList.filter(d => d.creator !== user.name).length === 0 && <p className="text-center text-neutral-700 text-xs py-10 uppercase font-bold">Lobby leer</p>}
            {duelsList.filter(d => d.creator !== user.name).map(d => (
              <div key={d.id} className="bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-xl flex justify-between items-center transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 font-bold text-xs uppercase">{d.creator.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-white text-xs uppercase">{d.creator}</p>
                    <p className="text-[10px] text-orange-400 font-mono font-bold">{d.amount} sats</p>
                  </div>
                </div>
                <button onClick={() => initJoinDuel(d)} className="bg-neutral-800 hover:bg-orange-500 hover:text-black border border-white/10 hover:border-orange-400 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase">Fight</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Background>
  );

  if (view === 'create_setup') return (
    <Background>
      <div className="w-full max-w-sm">
        <Card className="text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50"></div>
           <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Einsatz wählen</h2>
           <div className="mb-10">
             <input type="number" value={wager} onChange={(e) => setWager(Number(e.target.value))} className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"/>
             <p className="text-neutral-500 text-[10px] uppercase font-bold mt-2 tracking-widest italic">Satoshis</p>
           </div>
           <div className="grid grid-cols-4 gap-2 mb-8">
             {[100, 500, 1000, 2100].map(amt => (
               <button key={amt} onClick={() => setWager(amt)} className={`py-2 rounded-lg text-xs font-bold border transition-all ${wager === amt ? 'bg-orange-500 text-black border-orange-500' : 'bg-neutral-800 text-neutral-400 border-white/5'}`}>{amt}</button>
             ))}
           </div>
           <div className="grid gap-3">
             <Button variant="primary" onClick={submitCreateDuel}>Duel Erstellen</Button>
             <Button variant="secondary" onClick={() => setView('dashboard')}>Abbrechen</Button>
           </div>
        </Card>
      </div>
    </Background>
  );

  if (view === 'payment') return (
    <Background>
      <div className="w-full max-w-sm text-center">
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">EINSATZ ZAHLEN</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 inline-block px-4 py-1.5 rounded-full text-sm font-mono font-bold mb-8">{invoice.amount || wager} SATS</div>
        <div className="bg-white p-4 rounded-3xl mx-auto mb-8 flex justify-center items-center shadow-2xl relative group">
           {invoice.req ? <QRCodeCanvas value={`lightning:${invoice.req.toUpperCase()}`} size={220} includeMargin={true}/> : <Loader2 className="animate-spin text-neutral-900 mx-auto py-20" size={40}/>}
        </div>
        <div className="grid gap-3">
          <Button variant="primary" onClick={handleManualCheck} className="mb-2">
            {manualCheckLoading ? <Loader2 className="animate-spin" size={20}/> : <RefreshCw size={20}/>} {manualCheckLoading ? "PRÜFE..." : "STATUS PRÜFEN"}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => window.location.href = `lightning:${invoice.req}`}><ExternalLink size={18}/> Wallet</Button>
            <Button variant="secondary" onClick={() => {navigator.clipboard.writeText(invoice.req); setCopied(true); setTimeout(() => setCopied(false), 2000);}}>{copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>} Copy</Button>
          </div>
          <button onClick={() => setView('dashboard')} className="text-xs text-neutral-500 hover:text-white mt-4 uppercase font-bold transition-colors">Abbrechen</button>
        </div>
        <div className="mt-8 text-orange-400 text-xs animate-pulse font-mono flex items-center justify-center gap-2"><Zap size={14} className="fill-orange-400"/> Warten auf Zahlung...</div>
      </div>
    </Background>
  );

  if (view === 'game') return (
    <Background>
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh]">
        <div className="flex justify-between items-end mb-4 px-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Frage {currentQ + 1} / 5</span>
          <span className={`text-3xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_red]' : 'text-white'}`}>{timeLeft}</span>
        </div>
        <div className="w-full h-2 bg-neutral-900 rounded-full mb-8 overflow-hidden border border-white/5"><div className="h-full bg-orange-500 transition-all duration-1000 ease-linear shadow-orange-500/50 shadow-lg" style={{ width: `${(timeLeft / 15) * 100}%` }}></div></div>
        <div className="min-h-[140px] mb-8 flex items-center justify-center text-center px-4"><h3 className="text-2xl font-bold text-white leading-snug tracking-tight italic">"{questions[currentQ].q}"</h3></div>
        <div className="grid gap-3">
          {questions[currentQ].options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} className="group bg-neutral-900/40 hover:bg-orange-500 border border-white/10 hover:border-orange-400 p-5 rounded-2xl text-left transition-all active:scale-[0.98] flex items-center gap-4 relative overflow-hidden">
              <span className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-white text-neutral-400 group-hover:text-orange-600 flex items-center justify-center font-bold text-sm transition-colors">{String.fromCharCode(65 + idx)}</span>
              <span className="font-medium text-lg text-neutral-200 group-hover:text-white transition-colors uppercase tracking-wide">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </Background>
  );

  if (view === 'result_final') {
    const iAmCreator = role === 'creator';
    const duel = activeDuel;
    const myScore = iAmCreator ? duel.creator_score : duel.challenger_score;
    const oppScore = iAmCreator ? duel.challenger_score : duel.creator_score;
    const myTime = iAmCreator ? duel.creator_time : duel.challenger_time;
    const oppTime = iAmCreator ? duel.challenger_time : duel.creator_time;
    const won = myScore > (oppScore || 0) || (myScore === oppScore && myTime < (oppTime || 999));
    const gameDone = duel.status === 'finished';

    return (
      <Background>
         <div className="w-full max-w-sm text-center">
            <div className={`mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-8 ring-4 ring-offset-8 ring-offset-black shadow-2xl ${won && gameDone ? "bg-green-500 ring-green-500 shadow-green-500/20" : "bg-red-500 ring-red-500 shadow-red-500/20"}`}>
               {won && gameDone ? <Trophy size={56} className="text-black fill-black animate-bounce"/> : <Flame size={56} className="text-black fill-black"/>}
            </div>
            <h2 className={`text-5xl font-black mb-10 uppercase tracking-tighter ${won && gameDone ? "text-green-500" : "text-red-500"}`}>{!gameDone ? "OFFEN" : won ? "SIEG!" : "NIEDERLAGE"}</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <Card className="p-4 border-orange-500/50 bg-orange-500/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1 tracking-widest">Du</p>
                <p className="text-4xl font-black text-white mb-1 font-mono">{myScore}</p>
                <p className="text-xs text-neutral-500 font-mono italic">{myTime}s</p>
              </Card>
              <Card className="p-4 opacity-60">
                <p className="text-[10px] font-bold text-neutral-500 uppercase mb-1 tracking-widest">Gegner</p>
                <p className="text-4xl font-black text-white mb-1 font-mono">{oppScore ?? "-"}</p>
                <p className="text-xs text-neutral-500 font-mono italic">{oppTime ? oppTime + "s" : "-"}</p>
              </Card>
            </div>
            {withdrawLink ? (
              <div className="animate-in slide-in-from-bottom-5 duration-700">
                <Card className="bg-green-900/10 border-green-500/30 p-6 mb-4 backdrop-blur-md">
                  <div className="bg-white p-3 rounded-xl inline-block mb-6 shadow-xl"><QRCodeCanvas value={`lightning:${withdrawLink.toUpperCase()}`} size={180}/></div>
                  <Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>GEWINN ABHOLEN ⚡</Button>
                </Card>
              </div>
            ) : <button onClick={() => setView('dashboard')} className="text-neutral-500 hover:text-white uppercase font-black tracking-[0.2em] text-xs py-6 transition-colors">Zurück zum Dashboard</button>}
         </div>
      </Background>
    );
  }
}