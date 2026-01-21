import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check, ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame, History, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';

// --- KONFIGURATION ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

const HOUSE_FEE_PERCENT = 10; 

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ALL_QUESTIONS = [
  { id: 1, q: "Wer veröffentlichte das Bitcoin Whitepaper?", options: ["Vitalik Buterin", "Satoshi Nakamoto", "Adam Back", "Hal Finney"], correct: 1 },
  { id: 2, q: "Wann wurde der Genesis Block gemined?", options: ["2008", "2009", "2010", "2012"], correct: 1 },
  { id: 3, q: "Wie hoch ist der Max Supply von Bitcoin?", options: ["21 Millionen", "Unendlich", "100 Millionen", "18 Millionen"], correct: 0 },
  { id: 4, q: "Was passiert beim Halving?", options: ["Preis halbiert sich", "Hashrate halbiert sich", "Block-Reward halbiert sich", "Difficulty sinkt"], correct: 2 },
  { id: 5, q: "Was ist die kleinste Bitcoin-Einheit?", options: ["Bit", "Wei", "Satoshi", "Nano"], correct: 2 },
  { id: 6, q: "Was ist SegWit?", options: ["Ein Hard Fork", "Ein Soft Fork", "Ein Altcoin", "Eine Wallet"], correct: 1 },
  { id: 7, q: "Was ist der 'Mempool'?", options: ["Ein Mining Pool", "Warteraum für Transaktionen", "Eine Wallet", "Die Blockchain"], correct: 1 },
  { id: 8, q: "Welcher Port ist Standard für Bitcoin?", options: ["8080", "8333", "21", "443"], correct: 1 }
];

const getRandomQuestions = () => [...ALL_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5);

// --- DESIGN COMPONENTS (NEU GESTYLT) ---

const PlayerName = ({ name, large = false }) => {
  if (!name) return null;
  if (name.includes('#')) {
    const [n, tag] = name.split('#');
    return (
      <span className="font-mono tracking-tight">
        {n}<span className={`${large ? 'text-lg' : 'text-xs'} text-neutral-500 opacity-70`}>#{tag}</span>
      </span>
    );
  }
  return <span>{name}</span>;
};

// Neue "Glass" Karte
const Card = ({ children, className = "" }) => (
  <div className={`glass-panel rounded-2xl p-5 ${className} transition-all duration-300 hover:border-orange-500/30`}>
    {children}
  </div>
);

// Neuer "Shiny" Button
const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const base = "btn-shine w-full py-4 rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-sm";
  const variants = {
    primary: "bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-400 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] border border-orange-400/50",
    secondary: "bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 border border-white/10 backdrop-blur",
    nostr: "bg-gradient-to-r from-purple-700 to-indigo-600 hover:to-indigo-500 text-white shadow-lg border border-purple-500/50",
    danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20",
    success: "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-400/50"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- HAUPT APP ---

export default function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null);
  const [loginName, setLoginName] = useState(''); 
  
  // Game Data
  const [duelsList, setDuelsList] = useState([]);
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

  // --- LOGIC ---

  useEffect(() => {
    const storedUser = localStorage.getItem('satoshi_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (view === 'dashboard' && user) {
      fetchDuels();
      fetchStats();
      const channel = supabase.channel('public:duels')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, () => {
          fetchDuels();
          fetchStats();
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [view, user]);

  useEffect(() => {
    if (view === 'result_wait' && activeDuel) {
      const channel = supabase.channel(`duel-${activeDuel.id}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'duels', filter: `id=eq.${activeDuel.id}` }, (payload) => {
          if (payload.new.status === 'finished') {
            setActiveDuel(payload.new);
            determineWinner(payload.new, role, score, totalTime);
          }
        })
        .subscribe();

      const interval = setInterval(() => checkDuelStatus(), 3000);
      return () => { supabase.removeChannel(channel); clearInterval(interval); };
    }
  }, [view, activeDuel, role, score, totalTime]);

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
      interval = setInterval(() => checkPaymentStatus(), 1000);
    }
    return () => clearInterval(interval);
  }, [view, invoice, checkingPayment]);

  // --- HELPER FUNCTIONS ---

  const resetGameState = () => {
    setWithdrawLink('');
    setWithdrawError('');
    setScore(0);
    setTotalTime(0);
    setCurrentQ(0);
    setInvoice({ req: '', hash: '', amount: 0 });
  };

  const fetchStats = async () => {
    if (!user) return;
    const { data } = await supabase.from('duels').select('*')
      .or(`creator.eq.${user.name},challenger.eq.${user.name}`)
      .eq('status', 'finished');

    if (!data) return;
    let wins = 0, losses = 0, sats = 0;
    data.forEach(d => {
      let iAmCreator = d.creator === user.name;
      let myScore = iAmCreator ? d.creator_score : d.challenger_score;
      let myTime = iAmCreator ? d.creator_time : d.challenger_time;
      let oppScore = iAmCreator ? d.challenger_score : d.creator_score;
      let oppTime = iAmCreator ? d.challenger_time : d.creator_time;
      const duelAmount = d.amount || 500;
      
      if (myScore > oppScore) { wins++; sats += duelAmount; }
      else if (myScore === oppScore && myTime < oppTime) { wins++; sats += duelAmount; }
      else losses++;
    });
    setStats({ wins, losses, total: wins + losses, satsWon: sats });
  };

  const checkDuelStatus = async () => {
    if (!activeDuel) return;
    setManualCheckLoading(true);
    const { data } = await supabase.from('duels').select('*').eq('id', activeDuel.id).single();
    if (data && data.status === 'finished') {
      setActiveDuel(data);
      determineWinner(data, role, score, totalTime);
    }
    setManualCheckLoading(false);
  };

  const checkPaymentStatus = async () => {
    if (!invoice.hash) return;
    try {
      const res = await fetch(`${LNBITS_URL}/api/v1/payments/${invoice.hash}`, { headers: { 'X-Api-Key': INVOICE_KEY } });
      const data = await res.json();
      if (data.paid) { setCheckingPayment(true); startGame(); }
    } catch(e) { console.error("Check Error", e); }
  };

  const copyInvoice = () => {
    if (!invoice.req) return;
    navigator.clipboard.writeText(invoice.req);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchDuels = async () => {
    const { data } = await supabase.from('duels').select('*').eq('status', 'open').order('created_at', { ascending: false });
    if (data) setDuelsList(data);
  };

  const handleNostrLogin = async () => {
    if (!window.nostr) { alert("Keine Nostr-Extension gefunden!"); return; }
    try {
      const pubkey = await window.nostr.getPublicKey();
      const newUser = { name: `Nostr-${pubkey.substring(0, 6)}`, pubkey: pubkey };
      setUser(newUser);
      localStorage.setItem('satoshi_user', JSON.stringify(newUser));
      setView('dashboard');
    } catch (e) { alert("Login abgebrochen."); }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!loginName.trim()) return;
    const randomTag = Math.floor(1000 + Math.random() * 9000);
    const uniqueName = `${loginName.trim()}#${randomTag}`;
    const newUser = { name: uniqueName, pubkey: null };
    setUser(newUser);
    localStorage.setItem('satoshi_user', JSON.stringify(newUser));
    setView('dashboard');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('satoshi_user');
    setUser(null); setLoginName(''); setView('login');
  };

  const openCreateSetup = () => {
    resetGameState();
    setWager(500); 
    setView('create_setup');
  };

  const submitCreateDuel = async () => {
    const qs = getRandomQuestions();
    setQuestions(qs); 
    setRole('creator'); 
    await fetchInvoice(wager);
  };

  const initJoinDuel = async (duel) => {
    resetGameState();
    setActiveDuel(duel); 
    setQuestions(duel.questions); 
    setRole('challenger'); 
    const amountToPay = duel.amount || 500;
    setWager(amountToPay);
    await fetchInvoice(amountToPay);
  };

  const fetchInvoice = async (amountSat) => {
    try {
      const res = await fetch(`${LNBITS_URL}/api/v1/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY },
        body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell (${amountSat} sats)`, expiry: 600 })
      });
      const data = await res.json();
      setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat });
      setCheckingPayment(false); setView('payment');
    } catch (e) { alert("LNbits Error: " + e); setView('dashboard'); }
  };

  const startGame = () => {
    setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15); setView('game');
  };

  const handleAnswer = (index) => {
    const timeTaken = 15 - timeLeft;
    setTotalTime(prev => prev + timeTaken);
    if (index === questions[currentQ].correct) setScore(s => s + 1);
    if (currentQ < questions.length - 1) { setCurrentQ(p => p + 1); setTimeLeft(15); } 
    else { finishGameLogic(); }
  };

  const finishGameLogic = async () => {
    if (role === 'creator') {
      const { data, error } = await supabase.from('duels').insert([{
        creator: user.name, 
        creator_score: score, 
        creator_time: totalTime, 
        questions: questions, 
        status: 'open',
        amount: invoice.amount
      }]).select();
      if (!error) { setActiveDuel(data[0]); setView('result_wait'); }
    } else {
      const { data, error } = await supabase.from('duels').update({
        challenger: user.name, challenger_score: score, challenger_time: totalTime, status: 'finished'
      }).eq('id', activeDuel.id).select();
      if (!error) { 
        const finishedDuel = data[0]; setActiveDuel(finishedDuel); determineWinner(finishedDuel, 'challenger', score, totalTime); 
      }
    }
  };

  const determineWinner = async (duel, myRole, myScore, myTime) => {
    setView('result_final');
    const oppScore = myRole === 'creator' ? duel.challenger_score : duel.creator_score;
    const oppTime = myRole === 'creator' ? duel.challenger_time : duel.creator_time;
    let won = false;
    if (myScore > oppScore) won = true;
    else if (myScore === oppScore && myTime < oppTime) won = true;
    if (won) { confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); await createWithdrawLink(duel.amount || 500); }
  };

  const createWithdrawLink = async (duelAmount) => {
    if (withdrawLink) return;
    if (!ADMIN_KEY) { setWithdrawError("Kein Admin Key!"); return; }
    setWithdrawError(''); 
    
    const totalPot = duelAmount * 2;
    const fee = Math.floor(totalPot * (HOUSE_FEE_PERCENT / 100));
    const prize = totalPot - fee;

    try {
      const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': ADMIN_KEY },
        body: JSON.stringify({ 
          title: `SatoshiDuell Gewinn (${prize} sats)`, 
          min_withdrawable: prize, 
          max_withdrawable: prize, 
          uses: 1, 
          wait_time: 1, 
          is_unique: true 
        })
      });
      const data = await res.json();
      if (data.lnurl) setWithdrawLink(data.lnurl);
      else setWithdrawError(data.detail || JSON.stringify(data));
    } catch(e) { setWithdrawError("Netzwerkfehler: " + e.message); }
  };

  // --- BACKGROUND WRAPPER ---
  const Background = ({ children }) => (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden relative selection:bg-orange-500 selection:text-black">
      {/* Animiertes Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      
      {/* Weicher Glow Oben/Unten */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center min-h-screen">
         {children}
      </div>
    </div>
  );

  // --- VIEWS ---

  if (view === 'login') return (
    <Background>
      <div className="w-full max-w-sm flex flex-col gap-8 animate-float">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6 shadow-[0_0_50px_rgba(249,115,22,0.2)] animate-neon">
            <Zap size={48} className="text-orange-500 fill-orange-500 drop-shadow-md" />
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500 tracking-tighter mb-2">
            SATOSHI<span className="text-orange-500">DUELL</span>
          </h1>
          <p className="text-neutral-400 font-medium tracking-wide text-sm uppercase">Lightning Quiz PvP</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button variant="nostr" onClick={handleNostrLogin}>
             <Fingerprint size={20}/> Login mit Nostr
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="bg-neutral-950 px-3 text-neutral-600">Oder</span></div>
          </div>

          <form onSubmit={handleManualLogin} className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="DEIN NAME..." 
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="w-full p-4 rounded-xl bg-neutral-900/50 border border-white/10 text-white placeholder-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-center font-bold uppercase tracking-wider backdrop-blur-sm"
            />
            <Button variant="secondary" onClick={handleManualLogin}>Starten</Button>
          </form>
          <p className="text-[10px] text-center text-neutral-600 font-mono">ID wird automatisch generiert • Keine Anmeldung nötig</p>
        </div>
      </div>
    </Background>
  );

  if (view === 'dashboard') return (
    <Background>
      <div className="w-full max-w-md flex flex-col h-[85vh] gap-4">
        
        <Card className="flex justify-between items-center border-orange-500/20 bg-orange-900/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-orange-900/40">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
               <p className="font-bold text-white text-lg leading-none mb-1"><PlayerName name={user.name} large/></p>
               <div className="flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 <span className="text-xs text-green-400 font-bold tracking-wider">ONLINE</span>
               </div>
            </div>
          </div>
          <button onClick={handleLogout} className="p-3 hover:bg-white/5 rounded-xl text-neutral-400 hover:text-red-400 transition-colors border border-transparent hover:border-white/10"><LogOut size={20}/></button>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="flex flex-col items-center justify-center gap-1 bg-green-500/5 border-green-500/10 hover:border-green-500/30">
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Siege</span>
            <span className="text-3xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{stats.wins}</span>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-1 bg-red-500/5 border-red-500/10 hover:border-red-500/30">
             <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Niederlagen</span>
             <span className="text-3xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{stats.losses}</span>
          </Card>
          <Card className="col-span-2 flex justify-between items-center bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/20">
             <div className="flex items-center gap-3 text-orange-400">
               <div className="bg-orange-500/20 p-2 rounded-lg"><Trophy size={18}/></div>
               <span className="text-xs font-bold uppercase tracking-wider">Total Gewinn</span>
             </div>
             <span className="text-2xl font-mono font-black text-white">{stats.satsWon.toLocaleString()} <span className="text-xs text-neutral-500 font-sans font-bold">SATS</span></span>
          </Card>
        </div>

        <Button onClick={openCreateSetup} className="py-6 text-lg animate-neon">
          <Plus size={24} strokeWidth={3}/> NEUES DUELL STARTEN
        </Button>

        <div className="flex-1 flex flex-col gap-3 overflow-hidden bg-neutral-900/30 rounded-2xl border border-white/5 p-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest px-3 mt-2">
            <History size={12}/> Live Lobby
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {duelsList.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <Swords size={40} className="mb-3 text-neutral-500"/>
                <p className="text-sm font-medium">Warte auf Gegner...</p>
              </div>
            )}
            {duelsList.map(d => (
              <div key={d.id} className="bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-xl flex justify-between items-center transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 font-bold border border-white/5">
                    {d.creator.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-none mb-1"><PlayerName name={d.creator}/></p>
                    <p className="text-xs text-orange-400 font-mono font-bold flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-md inline-block">
                       <Coins size={10}/> {d.amount || 500}
                    </p>
                  </div>
                </div>
                {d.creator !== user.name ? (
                  <button onClick={() => initJoinDuel(d)} className="bg-neutral-800 hover:bg-green-500 hover:text-black border border-white/10 hover:border-green-400 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg">
                    FIGHT <Swords size={14}/>
                  </button>
                ) : (
                  <span className="text-[10px] bg-white/5 text-neutral-500 px-2 py-1 rounded font-mono border border-white/5">DU</span>
                )}
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
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
           <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Einsatz wählen</h2>
           
           <div className="mb-10 relative group">
             <input 
               type="number" 
               min="1"
               value={wager}
               onChange={(e) => setWager(Number(e.target.value))}
               className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10 relative"
             />
             <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Sats Amount</p>
           </div>

           <input 
             type="range" 
             min="10" 
             max="10000" 
             step="10"
             value={wager}
             onChange={(e) => setWager(parseInt(e.target.value))}
             className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-8 hover:accent-orange-400"
           />

           <div className="grid grid-cols-4 gap-2 mb-8">
             {[100, 500, 1000, 2100].map(amt => (
               <button key={amt} onClick={() => setWager(amt)} className={`py-2 rounded-lg text-xs font-bold transition-all border ${wager === amt ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-neutral-800 text-neutral-400 border-white/5 hover:border-white/20'}`}>
                 {amt}
               </button>
             ))}
           </div>

           <div className="grid gap-3">
             <Button variant="primary" onClick={submitCreateDuel}>Erstellen</Button>
             <Button variant="secondary" onClick={() => setView('dashboard')}>Abbrechen</Button>
           </div>
        </Card>
      </div>
    </Background>
  );

  if (view === 'payment') return (
    <Background>
      <div className="w-full max-w-sm text-center">
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">EINSATZ ZAHLEN</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 inline-block px-4 py-1.5 rounded-full text-sm font-mono font-bold mb-8 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
           {invoice.amount || wager} SATS
        </div>
        
        <div className="bg-white p-4 rounded-3xl mx-auto mb-8 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative flex justify-center items-center group transition-transform hover:scale-105 duration-300">
           {invoice.req ? (
             <QRCodeCanvas value={`lightning:${invoice.req.toUpperCase()}`} size={220} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={true}/>
           ) : <Loader2 className="animate-spin text-neutral-900 mx-auto py-20" size={40}/>}
        </div>

        <div className="grid gap-3">
          <Button variant="primary" onClick={() => window.location.href = `lightning:${invoice.req}`}>
            <ExternalLink size={18}/> Wallet öffnen
          </Button>
          <Button variant="secondary" onClick={copyInvoice}>
            {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>} Invoice kopieren
          </Button>
          <button onClick={() => setView('dashboard')} className="text-xs text-neutral-500 hover:text-white mt-4 uppercase tracking-widest font-bold transition-colors">Abbrechen</button>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-2 text-orange-400 text-xs animate-pulse font-mono">
           <Zap size={14} className="fill-orange-400"/> Warte auf Zahlung...
        </div>
      </div>
    </Background>
  );

  if (view === 'game') return (
    <Background>
      <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh]">
        <div className="flex justify-between items-end mb-4 px-1">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Frage {currentQ + 1} / 5</span>
          <span className={`text-3xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-white'}`}>{timeLeft}</span>
        </div>
        
        {/* Progress Bar mit Glow */}
        <div className="w-full h-2 bg-neutral-900 rounded-full mb-8 overflow-hidden border border-white/5 relative">
          <div className={`h-full transition-all duration-1000 ease-linear relative z-10 ${timeLeft < 5 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
          <div className={`absolute top-0 left-0 h-full blur-[4px] opacity-50 ${timeLeft < 5 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
        </div>

        <div className="min-h-[140px] mb-8 flex items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-white leading-snug drop-shadow-md">{questions[currentQ].q}</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {questions[currentQ].options.map((opt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleAnswer(idx)} 
              className="group relative bg-neutral-900/40 hover:bg-orange-500 border border-white/10 hover:border-orange-400 p-5 rounded-2xl text-left transition-all active:scale-[0.98] backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="flex items-center gap-4 relative z-10">
                <span className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-white text-neutral-400 group-hover:text-orange-600 flex items-center justify-center font-bold text-sm transition-colors shadow-inner">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-medium text-lg text-neutral-200 group-hover:text-white tracking-wide">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Background>
  );

  if (view === 'result_wait') return (
    <Background>
      <div className="w-full max-w-sm text-center">
        <div className="relative inline-flex justify-center items-center mb-10">
           <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse"></div>
           <Clock size={100} className="text-orange-500 relative animate-[spin_10s_linear_infinite] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"/>
        </div>
        <h2 className="text-3xl font-black text-white mb-3">WARTE AUF GEGNER</h2>
        <p className="text-neutral-500 mb-10 text-sm tracking-wide">Der Kampf ist noch nicht vorbei.</p>
        <Button variant="secondary" onClick={checkDuelStatus}>
          {manualCheckLoading ? <Loader2 className="animate-spin" size={18}/> : <RefreshCw size={18}/>} Status prüfen
        </Button>
      </div>
    </Background>
  );

  if (view === 'result_final') {
    const iAmCreator = role === 'creator';
    const myScore = iAmCreator ? activeDuel.creator_score : activeDuel.challenger_score;
    const oppScore = iAmCreator ? activeDuel.challenger_score : activeDuel.creator_score;
    const myTime = iAmCreator ? activeDuel.creator_time : activeDuel.challenger_time;
    const oppTime = iAmCreator ? activeDuel.challenger_time : activeDuel.creator_time;
    const duelAmount = activeDuel.amount || 500;
    
    const totalPot = duelAmount * 2;
    const fee = Math.floor(totalPot * (HOUSE_FEE_PERCENT / 100));
    const prize = totalPot - fee;

    const wonByScore = myScore > oppScore;
    const wonByTime = myScore === oppScore && myTime < oppTime;
    const isWinner = withdrawLink || wonByScore || wonByTime;

    return (
      <Background>
         <div className="w-full max-w-sm text-center">
            
            <div className={`mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-8 ring-4 ring-offset-4 ring-offset-black shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isWinner ? "bg-green-500 ring-green-500 shadow-green-500/20" : "bg-red-500 ring-red-500 shadow-red-500/20"}`}>
               {isWinner ? <Trophy size={56} className="text-black fill-black animate-bounce"/> : <Flame size={56} className="text-black fill-black"/>}
            </div>

            <h2 className={`text-5xl font-black mb-10 uppercase tracking-tighter drop-shadow-lg ${isWinner ? "text-green-500" : "text-red-500"}`}>
              {isWinner ? "GEWONNEN!" : "VERLOREN"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <Card className={`text-center relative overflow-hidden ${iAmCreator ? 'border-orange-500/50 bg-orange-500/10' : 'opacity-60 grayscale'}`}>
                {iAmCreator && <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_10px_orange]"></div>}
                <p className="text-[10px] font-bold uppercase text-neutral-500 mb-2 tracking-widest">Du</p>
                <p className="text-4xl font-black font-mono text-white mb-1">{myScore}</p>
                <p className="text-xs font-mono text-neutral-500">{myTime}s</p>
              </Card>
              <Card className={`text-center relative overflow-hidden ${!iAmCreator ? 'border-orange-500/50 bg-orange-500/10' : 'opacity-60 grayscale'}`}>
                {!iAmCreator && <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_10px_orange]"></div>}
                <p className="text-[10px] font-bold uppercase text-neutral-500 mb-2 tracking-widest">Gegner</p>
                <p className="text-4xl font-black font-mono text-white mb-1">{oppScore}</p>
                <p className="text-xs font-mono text-neutral-500">{oppTime}s</p>
              </Card>
            </div>

            {withdrawLink ? (
              <div className="animate-in slide-in-from-bottom-5 fade-in duration-700">
                <Card className="bg-gradient-to-b from-green-900/20 to-green-900/5 border-green-500/30 p-6 mb-4 backdrop-blur-md">
                  <div className="bg-white p-3 rounded-xl inline-block mb-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <QRCodeCanvas value={`lightning:${withdrawLink}`.toUpperCase()} size={180} level={"L"} includeMargin={true}/>
                  </div>
                  <Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>
                    <Zap size={18} className="fill-white"/> {prize} SATS ABHOLEN
                  </Button>
                </Card>
              </div>
            ) : isWinner && withdrawError ? (
              <Card className="bg-red-500/10 border-red-500/30 mb-6">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-2 justify-center"><AlertTriangle size={18}/> Fehler</div>
                <p className="text-xs text-red-300 mb-4">{withdrawError}</p>
                <Button variant="danger" onClick={() => createWithdrawLink(duelAmount)}>Erneut versuchen</Button>
              </Card>
            ) : (
              <p className="text-neutral-500 text-sm mb-8 font-medium">Viel Erfolg beim nächsten Mal.</p>
            )}

            <button onClick={() => setView('dashboard')} className="text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors py-4">
              Zurück zur Lobby
            </button>
         </div>
      </Background>
    );
  }
}