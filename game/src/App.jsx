import React, { useState, useEffect } from 'react';
// DIESE ZEILE FEHLT BEI DIR WAHRSCHEINLICH:
import { createClient } from '@supabase/supabase-js'; 
import { Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check, ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame, History, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';

// --- KONFIGURATION (Laden aus .env) ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

// ... Rest des Codes ...

// EINSTELLUNG: Wieviel % behält das Haus?
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

// --- UI COMPONENTS (JETZT AUSSERHALB DER APP, DAMIT DER FOKUS BLEIBT) ---

const PlayerName = ({ name, large = false }) => {
  if (!name) return null;
  if (name.includes('#')) {
    const [n, tag] = name.split('#');
    return (
      <span>
        {n}<span className={`${large ? 'text-lg' : 'text-xs'} text-neutral-500 font-mono`}>#{tag}</span>
      </span>
    );
  }
  return <span>{name}</span>;
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const base = "w-full py-4 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-orange-500 hover:bg-orange-400 text-black shadow-lg shadow-orange-900/20",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700",
    nostr: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20",
    success: "bg-green-500 hover:bg-green-400 text-black shadow-lg shadow-green-900/20"
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

    // Gamertag Logik
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
    
    if (won) { 
      confetti(); 
      await createWithdrawLink(duel.amount || 500); 
    }
  };

  const createWithdrawLink = async (duelAmount) => {
    if (withdrawLink) return;
    if (!ADMIN_KEY) { setWithdrawError("Kein Admin Key!"); return; }
    setWithdrawError(''); 
    
    // Fee Logik
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

  // --- VIEWS ---

  if (view === 'login') return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans text-neutral-200">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/30 mb-4 shadow-[0_0_40px_rgba(249,115,22,0.1)]">
            <Zap size={40} className="text-orange-500 fill-orange-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">SATOSHI<span className="text-orange-500">DUELL</span></h1>
          <p className="text-neutral-500 font-medium">Lightning Quiz PvP</p>
        </div>

        <Button variant="nostr" onClick={handleNostrLogin}>
           <Fingerprint size={20}/> Login mit Nostr
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-neutral-950 px-2 text-neutral-600">Oder</span></div>
        </div>

        <form onSubmit={handleManualLogin} className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Spielername eingeben..." 
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            className="w-full p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-center font-bold"
          />
          <Button variant="secondary" onClick={handleManualLogin}>Starten</Button>
        </form>
      </div>
    </div>
  );

  if (view === 'dashboard') return (
    <div className="min-h-screen bg-neutral-950 p-4 font-sans text-neutral-200">
      <div className="max-w-md mx-auto flex flex-col h-full gap-4">
        
        <Card className="flex justify-between items-center bg-neutral-900/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
               <p className="font-bold text-white leading-none"><PlayerName name={user.name}/></p>
               <p className="text-xs text-green-500 font-mono mt-1">● ONLINE</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-500 transition-colors"><LogOut size={20}/></button>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="flex flex-col items-center justify-center gap-1 bg-green-900/10 border-green-500/20">
            <span className="text-xs font-bold text-green-500 uppercase">Siege</span>
            <span className="text-3xl font-mono font-black text-white">{stats.wins}</span>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-1 bg-red-900/10 border-red-500/20">
             <span className="text-xs font-bold text-red-500 uppercase">Niederlagen</span>
             <span className="text-3xl font-mono font-black text-white">{stats.losses}</span>
          </Card>
          <Card className="col-span-2 flex justify-between items-center bg-orange-500/5 border-orange-500/20">
             <div className="flex items-center gap-2 text-orange-500">
               <Trophy size={18}/> <span className="text-xs font-bold uppercase">Gewinn (Total)</span>
             </div>
             <span className="text-2xl font-mono font-black text-white">{stats.satsWon} <span className="text-sm text-neutral-500 font-sans">sats</span></span>
          </Card>
        </div>

        <Button onClick={openCreateSetup} className="shadow-orange-500/20 py-6 text-lg">
          <Plus size={24} strokeWidth={3}/> NEUES DUELL STARTEN
        </Button>

        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center gap-2 text-neutral-500 text-sm font-bold uppercase tracking-wider px-1 mt-4">
            <History size={14}/> Lobby
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pb-20">
            {duelsList.length === 0 && (
              <div className="text-center py-10 opacity-30 border-2 border-dashed border-neutral-800 rounded-xl">
                <Swords size={40} className="mx-auto mb-2"/>
                <p>Keine offenen Duelle</p>
              </div>
            )}
            {duelsList.map(d => (
              <div key={d.id} className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 p-4 rounded-xl flex justify-between items-center transition-all group">
                <div className="flex items-center gap-3">
                  <div className="bg-neutral-800 p-2 rounded-lg text-neutral-400 group-hover:text-white transition-colors">
                    <User size={18}/>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm"><PlayerName name={d.creator}/></p>
                    <p className="text-xs text-orange-500 font-mono font-bold mt-1 flex items-center gap-1">
                       <Coins size={10}/> {d.amount || 500} SATS
                    </p>
                  </div>
                </div>
                {d.creator !== user.name ? (
                  <button onClick={() => initJoinDuel(d)} className="bg-neutral-800 hover:bg-green-500 hover:text-black border border-neutral-700 hover:border-green-400 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                    FIGHT <Swords size={14}/>
                  </button>
                ) : (
                  <span className="text-[10px] bg-neutral-800 text-neutral-500 px-2 py-1 rounded font-mono">DEIN SPIEL</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (view === 'create_setup') return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-200">
      <div className="w-full max-w-sm">
        <Card className="text-center">
           <h2 className="text-2xl font-black text-white mb-6">Einsatz wählen</h2>
           
           <div className="mb-8 relative group">
             <input 
               type="number" 
               min="1"
               value={wager}
               onChange={(e) => setWager(Number(e.target.value))}
               className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none border-b-2 border-transparent focus:border-orange-500 transition-all appearance-none m-0 p-0"
             />
             <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2">Sats eingeben oder schieben</p>
           </div>

           <input 
             type="range" 
             min="10" 
             max="10000" 
             step="10"
             value={wager}
             onChange={(e) => setWager(parseInt(e.target.value))}
             className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-8"
           />

           <div className="grid grid-cols-4 gap-2 mb-8">
             {[100, 500, 1000, 2100].map(amt => (
               <button key={amt} onClick={() => setWager(amt)} className={`py-2 rounded-lg text-xs font-bold ${wager === amt ? 'bg-orange-500 text-black' : 'bg-neutral-800 hover:bg-neutral-700'}`}>
                 {amt}
               </button>
             ))}
           </div>

           <div className="grid gap-3">
             <Button variant="primary" onClick={submitCreateDuel}>Duell erstellen</Button>
             <Button variant="secondary" onClick={() => setView('dashboard')}>Abbrechen</Button>
           </div>
        </Card>
      </div>
    </div>
  );

  if (view === 'payment') return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-200 font-sans">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-2xl font-black text-white mb-2">Einsatz zahlen</h2>
        <div className="bg-orange-500/10 text-orange-500 inline-block px-3 py-1 rounded-full text-xs font-mono font-bold mb-8">
           {invoice.amount || wager} SATS
        </div>
        
        <div className="bg-white p-4 rounded-2xl mx-auto mb-8 shadow-2xl relative flex justify-center items-center">
           {invoice.req ? (
             <QRCodeCanvas value={`lightning:${invoice.req.toUpperCase()}`} size={240} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={true}/>
           ) : <Loader2 className="animate-spin text-neutral-900 mx-auto py-20" size={40}/>}
        </div>

        <div className="grid gap-3">
          <Button variant="primary" onClick={() => window.location.href = `lightning:${invoice.req}`}>
            <ExternalLink size={18}/> Wallet öffnen
          </Button>
          <Button variant="secondary" onClick={copyInvoice}>
            {copied ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>} Invoice kopieren
          </Button>
          <Button variant="secondary" onClick={() => setView('dashboard')}>Abbrechen</Button>
        </div>
        <div className="mt-8 flex justify-center items-center gap-2 text-neutral-500 text-xs animate-pulse">
           <Zap size={14} className="text-orange-500 fill-orange-500"/> Warte auf Zahlungseingang...
        </div>
      </div>
    </div>
  );

  if (view === 'game') return (
    <div className="min-h-screen bg-neutral-950 p-6 flex flex-col font-sans text-neutral-200">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-4">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Frage {currentQ + 1} / 5</span>
          <span className={`text-2xl font-black font-mono ${timeLeft < 5 ? 'text-red-500' : 'text-white'}`}>{timeLeft}</span>
        </div>
        <div className="w-full h-2 bg-neutral-900 rounded-full mb-8 overflow-hidden">
          <div className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 5 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
        </div>
        <div className="min-h-[120px] mb-8 flex items-center">
          <h3 className="text-2xl font-bold text-white leading-tight">{questions[currentQ].q}</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {questions[currentQ].options.map((opt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleAnswer(idx)} 
              className="group relative bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-500 p-5 rounded-xl text-left transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-orange-500 text-neutral-400 group-hover:text-black flex items-center justify-center font-bold text-sm transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-medium text-lg group-hover:text-white">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (view === 'result_wait') return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-200">
      <div className="w-full max-w-sm text-center">
        <div className="relative inline-flex justify-center items-center mb-8">
           <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
           <Clock size={80} className="text-orange-500 relative animate-[spin_4s_linear_infinite]"/>
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Warte auf Gegner...</h2>
        <p className="text-neutral-500 mb-8">Deine Antworten sind sicher. Gleich geht's weiter.</p>
        <Button variant="secondary" onClick={checkDuelStatus}>
          {manualCheckLoading ? <Loader2 className="animate-spin" size={18}/> : <RefreshCw size={18}/>} Status prüfen
        </Button>
      </div>
    </div>
  );

  if (view === 'result_final') {
    const iAmCreator = role === 'creator';
    const myScore = iAmCreator ? activeDuel.creator_score : activeDuel.challenger_score;
    const oppScore = iAmCreator ? activeDuel.challenger_score : activeDuel.creator_score;
    const myTime = iAmCreator ? activeDuel.creator_time : activeDuel.challenger_time;
    const oppTime = iAmCreator ? activeDuel.challenger_time : activeDuel.creator_time;
    const duelAmount = activeDuel.amount || 500;
    
    // Fee Logik für die Anzeige
    const totalPot = duelAmount * 2;
    const fee = Math.floor(totalPot * (HOUSE_FEE_PERCENT / 100));
    const prize = totalPot - fee;

    const wonByScore = myScore > oppScore;
    const wonByTime = myScore === oppScore && myTime < oppTime;
    const isWinner = withdrawLink || wonByScore || wonByTime;

    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans text-neutral-200">
         <div className="w-full max-w-sm text-center">
            
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ring-4 ${isWinner ? "bg-green-500/10 ring-green-500/30" : "bg-red-500/10 ring-red-500/30"}`}>
               {isWinner ? <Trophy size={48} className="text-green-500 fill-green-500"/> : <Flame size={48} className="text-red-500 fill-red-500"/>}
            </div>

            <h2 className={`text-4xl font-black mb-8 uppercase tracking-tight ${isWinner ? "text-white" : "text-neutral-500"}`}>
              {isWinner ? "GEWONNEN!" : "VERLOREN"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className={`text-center ${iAmCreator ? 'border-orange-500' : 'opacity-50'}`}>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Du</p>
                <p className="text-4xl font-black font-mono text-white mb-1">{myScore}</p>
                <p className="text-xs font-mono text-neutral-600">{myTime}s</p>
              </Card>
              <Card className={`text-center ${!iAmCreator ? 'border-orange-500' : 'opacity-50'}`}>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Gegner</p>
                <p className="text-4xl font-black font-mono text-white mb-1">{oppScore}</p>
                <p className="text-xs font-mono text-neutral-600">{oppTime}s</p>
              </Card>
            </div>

            {withdrawLink ? (
              <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
                <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                  <div className="bg-white p-2 rounded-xl inline-block mb-4">
                    <QRCodeCanvas value={`lightning:${withdrawLink}`.toUpperCase()} size={160} level={"L"} includeMargin={true}/>
                  </div>
                  <Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>
                    <Zap size={18} className="fill-black"/> {prize} SATS ABHOLEN
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
              <p className="text-neutral-600 text-sm mb-8">Viel Erfolg beim nächsten Mal.</p>
            )}

            <button onClick={() => setView('dashboard')} className="text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors py-4">
              Zurück zur Lobby
            </button>
         </div>
      </div>
    );
  }
}