import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check, ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame, History, Coins, Lock, Medal, Share2, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import { nip19 } from 'nostr-tools'; 

// --- EIGENE IMPORTS ---
import { ALL_QUESTIONS } from './questions';
import Button from './components/Button';
import Card from './components/Card';
import Background from './components/Background';

// --- KONFIGURATION ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

// Standard Relays für das Publishen
const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.primal.net',
  'wss://nos.lol'
];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- HELPER: FRAGEN MISCHEN ---
const getRandomQuestions = () => {
  return [...ALL_QUESTIONS]
    .sort(() => 0.5 - Math.random()) 
    .slice(0, 5)
    .map(q => {
      const shuffledOptions = q.options
        .map((opt, idx) => ({ text: opt, isCorrect: idx === q.correct }))
        .sort(() => Math.random() - 0.5); 
      const newCorrectIndex = shuffledOptions.findIndex(o => o.isCorrect);
      return { ...q, options: shuffledOptions.map(o => o.text), correct: newCorrectIndex };
    });
};

// --- HELPER: SICHERHEIT (PIN Hashing) ---
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
  const [loginInput, setLoginInput] = useState(''); // Name ODER npub
  const [loginPin, setLoginPin] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Nostr Setup
  const [nostrSetupPubkey, setNostrSetupPubkey] = useState(null);
  const [nostrSetupName, setNostrSetupName] = useState('');
  
  // Community & Game
  const [leaderboard, setLeaderboard] = useState([]);
  const [challengePlayer, setChallengePlayer] = useState(null);
  const [duelsList, setDuelsList] = useState([]);
  const [myDuels, setMyDuels] = useState([]);
  const [activeDuel, setActiveDuel] = useState(null);
  const [role, setRole] = useState(null); 
  const [questions, setQuestions] = useState([]);
  const [wager, setWager] = useState(500); 
  const [stats, setStats] = useState({ wins: 0, losses: 0, total: 0, satsWon: 0 });
  
  // Quiz Logic
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  
  // Payment
  const [invoice, setInvoice] = useState({ req: '', hash: '', amount: 0 });
  const [withdrawLink, setWithdrawLink] = useState('');
  const [withdrawId, setWithdrawId] = useState(''); 
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);

  // --- INITIALISIERUNG ---

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
      fetchDuels(); fetchMyDuels(); fetchStats(); fetchLeaderboard();
      const channel = supabase.channel('public:duels')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, () => {
          fetchDuels(); fetchMyDuels(); fetchStats(); fetchLeaderboard();
        }).subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [view, user]);

  useEffect(() => {
    let timer;
    if (view === 'game' && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (view === 'game' && timeLeft === 0 && selectedAnswer === null) {
      handleAnswer(-1); 
    }
    return () => clearInterval(timer);
  }, [view, timeLeft, selectedAnswer]);

  useEffect(() => {
    let interval;
    if (view === 'payment' && invoice.hash && !checkingPayment) {
      checkPaymentStatus(); interval = setInterval(() => checkPaymentStatus(), 2000); 
    }
    return () => clearInterval(interval);
  }, [view, invoice, checkingPayment]);

  useEffect(() => {
    let interval;
    if (view === 'result_final' && withdrawId) {
      interval = setInterval(() => checkWithdrawStatus(), 2000);
    }
    return () => clearInterval(interval);
  }, [view, withdrawId]);

  // --- LOGIN LOGIK ---

  const handleSmartLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError(''); setIsLoginLoading(true);
    
    const input = loginInput.trim();
    let pubkeyFromInput = null;
    let nameFromInput = null;

    if (input.startsWith('npub1')) {
      try {
        const { type, data } = nip19.decode(input);
        if (type === 'npub') pubkeyFromInput = data;
      } catch (err) {
        setLoginError("Ungültiger npub Key."); setIsLoginLoading(false); return;
      }
    } else {
      nameFromInput = input.toLowerCase();
      if (nameFromInput.length < 3) { setLoginError("Name zu kurz."); setIsLoginLoading(false); return; }
    }

    try {
      let query = supabase.from('players').select('*');
      if (pubkeyFromInput) {
        query = query.eq('pubkey', pubkeyFromInput);
      } else {
        query = query.eq('name', nameFromInput);
      }
      const { data: existingUser } = await query.single();

      if (existingUser) {
        if (nameFromInput && existingUser.pubkey) {
          setLoginError("Account ist Nostr-geschützt. Bitte npub nutzen.");
          setIsLoginLoading(false); return;
        }

        if (pubkeyFromInput) {
          finishLogin(existingUser.name, pubkeyFromInput);
        } else {
           const hashedPin = await hashPin(loginPin);
           if (existingUser.pin === hashedPin) {
             finishLogin(existingUser.name, null);
           } else {
             setLoginError("Falsche PIN!");
           }
        }
      } 
      else {
        if (pubkeyFromInput) {
          setNostrSetupPubkey(pubkeyFromInput);
          setIsLoginLoading(false);
          setView('nostr_setup');
        } else {
          if (loginPin.length < 4) { setLoginError("PIN min. 4 Stellen."); setIsLoginLoading(false); return; }
          const hashedPin = await hashPin(loginPin);
          await supabase.from('players').insert([{ name: nameFromInput, pin: hashedPin }]);
          finishLogin(nameFromInput, null);
        }
      }
    } catch (err) { setLoginError("Verbindungsfehler."); } 
    finally { if (!nostrSetupPubkey) setIsLoginLoading(false); }
  };

  const finishLogin = (name, pubkey) => {
    const userObj = { name, pubkey };
    setUser(userObj);
    localStorage.setItem('satoshi_user', JSON.stringify(userObj));
    if (!pubkey) localStorage.setItem('saved_pin', loginPin);
    setView('dashboard');
  };

  const handleExtensionLogin = async () => {
    if (!window.nostr) { alert("Keine Nostr-Extension gefunden!"); return; }
    try {
      const pubkey = await window.nostr.getPublicKey();
      setLoginInput(nip19.npubEncode(pubkey)); 
      const { data: existingUser } = await supabase.from('players').select('*').eq('pubkey', pubkey).single();
      if (existingUser) {
        finishLogin(existingUser.name, pubkey);
      } else {
        setNostrSetupPubkey(pubkey);
        setView('nostr_setup');
      }
    } catch (e) { console.error(e); }
  };

  const completeNostrRegistration = async (e) => {
    if(e) e.preventDefault();
    const cleanName = nostrSetupName.trim().toLowerCase();
    if (cleanName.length < 3) { alert("Name zu kurz"); return; }
    
    const { data: nameTaken } = await supabase.from('players').select('*').eq('name', cleanName).single();
    if (nameTaken) { alert("Name schon vergeben."); return; }

    await supabase.from('players').insert([{ name: cleanName, pubkey: nostrSetupPubkey, pin: 'nostr-auth' }]);
    finishLogin(cleanName, nostrSetupPubkey);
  };

  // --- NOSTR SHARING ---

  const shareDuelOnNostr = async (duel) => {
    const shareText = `⚡ SATOSHI DUELL CHALLENGE ⚡\n\nIch wette ${duel.amount} Sats, dass du mich im Bitcoin-Quiz nicht schlägst!\n\nMein Score: ${duel.creator_score}/5 in ${duel.creator_time}s.\n\nTraust du dich? 👇\nhttps://satoshi-duell.vercel.app\n\n#Bitcoin #Lightning #SatoshiDuell #Zap`;

    if (window.nostr) {
      try {
        const event = {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [['t', 'satoshiDuell'], ['t', 'bitcoin']],
          content: shareText,
        };
        const signedEvent = await window.nostr.signEvent(event);
        DEFAULT_RELAYS.forEach(url => {
           const ws = new WebSocket(url);
           ws.onopen = () => { ws.send(JSON.stringify(["EVENT", signedEvent])); ws.close(); };
        });
        alert("Auf Nostr veröffentlicht! ⚡");
      } catch (e) {
        alert("Fehler beim Signieren.");
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Text kopiert! Teile ihn auf Nostr.");
    }
  };

  // --- SPIEL FUNKTIONEN ---
  const fetchLeaderboard = async () => {
    const { data } = await supabase.from('duels').select('*').eq('status', 'finished');
    if (!data) return;
    const playerStats = {};
    data.forEach(d => {
      const p1Won = d.creator_score > d.challenger_score || (d.creator_score === d.challenger_score && d.creator_time < d.challenger_time);
      const winner = p1Won ? d.creator : d.challenger;
      [d.creator, d.challenger].forEach(p => {
        if (!playerStats[p]) playerStats[p] = { name: p, wins: 0, satsWon: 0 };
        if (p === winner) { playerStats[p].wins++; playerStats[p].satsWon += d.amount; }
      });
    });
    setLeaderboard(Object.values(playerStats).sort((a, b) => b.satsWon - a.satsWon).slice(0, 10));
  };

  const fetchStats = async () => {
    if (!user) return;
    const { data } = await supabase.from('duels').select('*').or(`creator.eq.${user.name},challenger.eq.${user.name}`).eq('status', 'finished');
    if (!data) return;
    let wins = 0, sats = 0;
    data.forEach(d => {
      let iAmCreator = d.creator === user.name;
      let myS = iAmCreator ? d.creator_score : d.challenger_score;
      let myT = iAmCreator ? d.creator_time : d.challenger_time;
      let opS = iAmCreator ? d.challenger_score : d.creator_score;
      let opT = iAmCreator ? d.challenger_time : d.creator_time;
      if (myS > opS || (myS === opS && myT < opT)) { wins++; sats += d.amount; }
    });
    setStats({ wins, losses: data.length - wins, total: data.length, satsWon: sats });
  };

  const fetchDuels = async () => {
    const { data } = await supabase.from('duels').select('*').eq('status', 'open').or(`target_player.is.null,target_player.eq.${user.name}`).order('created_at', { ascending: false });
    if (data) setDuelsList(data);
  };

  const fetchMyDuels = async () => {
    if (!user) return;
    const { data } = await supabase.from('duels').select('*').or(`creator.eq.${user.name},challenger.eq.${user.name}`).order('created_at', { ascending: false });
    if (data) setMyDuels(data);
  };

  const checkPaymentStatus = async () => {
    if (!invoice.hash) return;
    try {
      const url = `${LNBITS_URL}/api/v1/payments/${invoice.hash}?ts=${Date.now()}`;
      const res = await fetch(url, { headers: { 'X-Api-Key': ADMIN_KEY } });
      const data = await res.json();
      if (data.paid === true || data.status === 'success') { setCheckingPayment(true); startGame(); } 
    } catch(e) {}
  };

  const checkWithdrawStatus = async () => {
    if (!withdrawId) return;
    try {
      const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links/${withdrawId}`, { headers: { 'X-Api-Key': ADMIN_KEY } });
      const data = await res.json();
      if (data.used >= 1 || data.spent === true) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => { setView('dashboard'); resetGameState(); setWithdrawId(''); }, 2000);
      }
    } catch (e) {}
  };

  const handleManualCheck = async () => { setManualCheckLoading(true); await checkPaymentStatus(); setTimeout(() => setManualCheckLoading(false), 1000); };
  const resetGameState = () => { setWithdrawLink(''); setWithdrawId(''); setScore(0); setTotalTime(0); setCurrentQ(0); setInvoice({ req: '', hash: '', amount: 0 }); setChallengePlayer(null); setSelectedAnswer(null); };
  const startChallenge = (target) => { setChallengePlayer(target); openCreateSetup(); };
  const openCreateSetup = () => { resetGameState(); setWager(500); setView('create_setup'); };
  const submitCreateDuel = async () => { const qs = getRandomQuestions(); setQuestions(qs); setRole('creator'); await fetchInvoice(wager); };
  const initJoinDuel = async (duel) => { resetGameState(); setActiveDuel(duel); setQuestions(duel.questions); setRole('challenger'); await fetchInvoice(duel.amount); };
  const fetchInvoice = async (amountSat) => {
    try {
      const res = await fetch(`${LNBITS_URL}/api/v1/payments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY },
        body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell`, expiry: 600 })
      });
      const data = await res.json();
      setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat });
      setCheckingPayment(false); setView('payment');
    } catch (e) { alert("LNbits Error"); setView('dashboard'); }
  };
  const startGame = () => { setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15); setSelectedAnswer(null); setView('game'); };
  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(index);
    setTotalTime(prev => prev + (15 - timeLeft)); 
    const isCorrect = (index === questions[currentQ].correct);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentQ < questions.length - 1) { setCurrentQ(p => p + 1); setTimeLeft(15); setSelectedAnswer(null); } 
      else { finishGameLogic(isCorrect ? score + 1 : score); }
    }, 2000);
  };
  const finishGameLogic = async (finalScore = score) => {
    if (role === 'creator') {
      await supabase.from('duels').insert([{
        creator: user.name, creator_score: finalScore, creator_time: totalTime, 
        questions: questions, status: 'open', amount: invoice.amount, target_player: challengePlayer
      }]);
      setView('dashboard');
    } else {
      const { data } = await supabase.from('duels').update({
        challenger: user.name, challenger_score: finalScore, challenger_time: totalTime, status: 'finished'
      }).eq('id', activeDuel.id).select();
      if (data) { setActiveDuel(data[0]); determineWinner(data[0], 'challenger', finalScore, totalTime); }
    }
  };
  const openPastDuel = (duel) => {
    setActiveDuel(duel);
    const myRole = duel.creator === user.name ? 'creator' : 'challenger';
    setRole(myRole);
    const myS = myRole === 'creator' ? duel.creator_score : duel.challenger_score;
    const myT = myRole === 'creator' ? duel.creator_time : duel.challenger_time;
    determineWinner(duel, myRole, myS, myT);
  };
  const determineWinner = async (duel, myRole, myScore, myTime) => {
    setView('result_final');
    const oppScore = myRole === 'creator' ? (duel.challenger_score || 0) : duel.creator_score;
    const oppTime = myRole === 'creator' ? (duel.challenger_time || 999) : duel.creator_time;
    const won = myScore > oppScore || (myScore === oppScore && myTime < oppTime);
    if (duel.status === 'finished' && won && !duel.claimed) { 
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); 
      await createWithdrawLink(duel.amount, duel.id); 
    }
  };
  const createWithdrawLink = async (duelAmount, duelId) => {
    if (!ADMIN_KEY) return;
    try {
      const prize = (duelAmount * 2); 
      const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Api-Key': ADMIN_KEY },
        body: JSON.stringify({ title: `SatoshiDuell Win`, min_withdrawable: prize, max_withdrawable: prize, uses: 1, wait_time: 1, is_unique: true })
      });
      const data = await res.json();
      if (data.lnurl) { setWithdrawLink(data.lnurl); setWithdrawId(data.id); await supabase.from('duels').update({ claimed: true }).eq('id', duelId); }
    } catch(e) { console.error(e); }
  };
  const handleLogout = () => { localStorage.clear(); setUser(null); setView('login'); };

  // --- VIEWS ---

  if (view === 'login') return (
    <Background>
      <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
        <div className="flex flex-col items-center justify-center">
           <div className="relative mb-4">
              <div className="absolute inset-0 bg-orange-500 blur-[50px] opacity-20 rounded-full"></div>
              <img src="/logo.png" alt="Satoshi Duell" className="relative w-48 h-48 object-contain drop-shadow-2xl mx-auto" />
           </div>
           <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase drop-shadow-md">
             SATOSHI<span className="text-orange-500">DUELL</span>
           </h1>
        </div>

        <form onSubmit={handleSmartLogin} className="flex flex-col gap-4 mt-2">
          <div>
            <input 
              type="text" 
              placeholder="GAMERTAG ODER NPUB" 
              value={loginInput} 
              onChange={(e) => setLoginInput(e.target.value)} 
              className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-black transition-all font-bold uppercase text-center shadow-lg placeholder:text-neutral-600"
            />
            <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold tracking-wider">NPUB = Kein Passwort nötig</p>
          </div>
          <input 
            type="password" 
            placeholder="PIN (Nur bei Gamertag)" 
            value={loginPin} 
            onChange={(e) => setLoginPin(e.target.value)} 
            className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-black transition-all font-bold text-center shadow-lg placeholder:text-neutral-600"
          />
          {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
          <Button variant="primary" onClick={handleSmartLogin} disabled={isLoginLoading}>
             {isLoginLoading ? <Loader2 className="animate-spin mx-auto"/> : "LOGIN / START"}
          </Button>
        </form>

        <div className="relative py-2 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
          <span className="relative bg-[#1a1a1a] px-3 text-[10px] uppercase font-bold text-neutral-600 rounded">Option</span>
        </div>

        <Button variant="secondary" onClick={handleExtensionLogin}><Fingerprint size={18}/> Login mit Alby (Extension)</Button>
      </div>
    </Background>
  );

  if (view === 'nostr_setup') return (
    <Background>
       <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-purple-400 border border-purple-500/50"><Globe size={32}/></div>
          <h2 className="text-2xl font-black text-white uppercase">Willkommen Bitcoiner!</h2>
          <p className="text-neutral-400 text-sm">Dein Nostr Key wurde erkannt.<br/>Wähle nun deinen Gamertag für die Rangliste.</p>
          <form onSubmit={completeNostrRegistration} className="flex flex-col gap-4">
            <input type="text" placeholder="DEIN GAMERTAG" value={nostrSetupName} onChange={(e) => setNostrSetupName(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 font-bold uppercase text-center shadow-lg"/>
            <Button variant="primary" onClick={completeNostrRegistration}>Abschließen</Button>
            <button onClick={() => setView('login')} className="text-xs text-neutral-600 uppercase font-bold">Zurück</button>
          </form>
       </div>
    </Background>
  );

  if (view === 'dashboard') return (
    <Background>
      <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 overflow-hidden px-2">
        <Card className="flex justify-between items-center py-3 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center font-black text-black text-xl">{user.name.charAt(0).toUpperCase()}</div>
            <div className="text-left"><p className="font-bold text-white text-sm uppercase">{user.name}</p><p className="text-[10px] text-orange-400 font-mono">{stats.satsWon.toLocaleString()} sats gewonnen</p></div>
          </div>
          <button onClick={handleLogout} className="p-2 text-neutral-500 hover:text-white"><LogOut size={18}/></button>
        </Card>

        <Button onClick={openCreateSetup} className="py-4 text-lg animate-neon"><Plus size={24}/> NEUES DUELL</Button>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
             <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-2">Offene Lobby</div>
             <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
               {duelsList.filter(d => d.creator !== user.name).map(d => (
                 <div key={d.id} className="bg-white/5 p-3 rounded-xl flex justify-between items-center border border-white/5">
                   <div><p className="font-bold text-white text-xs uppercase">{d.creator} {d.target_player && "🎯"}</p><p className="text-[10px] text-orange-400 font-mono">{d.amount} sats</p></div>
                   <button onClick={() => initJoinDuel(d)} className="bg-orange-500 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase">Fight</button>
                 </div>
               ))}
             </div>
          </div>
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
             <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-2">Deine Geschichte</div>
             <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
               {myDuels.map(d => (
                 <div key={d.id} className="bg-neutral-900/50 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                     <div className="text-left">
                       <p className="text-neutral-400 font-bold uppercase text-xs">vs {d.creator === user.name ? (d.challenger || "???") : d.creator}</p>
                       <p className="text-[10px] font-mono text-orange-500">{d.amount} sats</p>
                     </div>
                     {d.status === 'finished' ? (
                       <button onClick={() => openPastDuel(d)} className="text-orange-500 font-black uppercase text-[10px]">{d.claimed ? 'Bezahlt ✓' : 'Details'}</button>
                     ) : <span className="animate-pulse text-neutral-600 uppercase font-black text-[10px]">Warten...</span>}
                   </div>

                   {/* DER GROSSE NEUE BUTTON FÜR NOSTR */}
                   {d.status === 'open' && d.creator === user.name && (
                     <button
                       onClick={(e) => {e.stopPropagation(); shareDuelOnNostr(d);}}
                       className="w-full bg-purple-500/10 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all group"
                     >
                       <Share2 size={14} className="group-hover:animate-pulse"/>
                       <span className="text-[10px] font-bold uppercase tracking-widest">Herausforderung auf Nostr teilen</span>
                     </button>
                   )}
                 </div>
               ))}
             </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 bg-neutral-900/50 p-3 rounded-2xl border border-white/5 mt-2">
          <div className="flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest px-1"><Trophy size={14}/> Top 10 Bestenliste</div>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar">
            {leaderboard.map((p, i) => (
              <div key={p.name} className="flex justify-between items-center bg-black/20 p-2 rounded-lg text-xs">
                <span className="text-neutral-500 font-mono w-5 text-center">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</span>
                <span className="text-white font-bold uppercase flex-1 ml-2">{p.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 font-mono text-[10px]">{p.satsWon} sats</span>
                  {p.name !== user.name && <button onClick={() => startChallenge(p.name)} className="text-orange-500 hover:text-white"><Swords size={14}/></button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Background>
  );

  // RESTLICHE VIEWS
  if (view === 'create_setup') return (<Background><Card className="w-full max-w-sm text-center"><h2 className="text-xl font-black text-white mb-8 uppercase italic tracking-widest">{challengePlayer ? `Target: ${challengePlayer.toUpperCase()}` : 'Einsatz wählen'}</h2><input type="number" value={wager} onChange={(e) => setWager(Number(e.target.value))} className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none mb-10"/><div className="grid grid-cols-4 gap-2 mb-8">{[100, 500, 1000, 2100].map(amt => (<button key={amt} onClick={() => setWager(amt)} className={`py-2 rounded-lg text-xs font-bold border ${wager === amt ? 'bg-orange-500 text-black border-orange-500' : 'bg-neutral-800 text-neutral-400 border-white/5'}`}>{amt}</button>))}</div><div className="grid gap-3"><Button variant="primary" onClick={submitCreateDuel}>Start Duel</Button><button onClick={() => setView('dashboard')} className="text-xs text-neutral-600 uppercase font-bold mt-2">Abbrechen</button></div></Card></Background>);
  if (view === 'payment') return (<Background><div className="w-full max-w-sm text-center"><h2 className="text-2xl font-black text-white mb-8 uppercase">Zahlen zum Spielen</h2><div className="bg-white p-4 rounded-3xl mx-auto mb-8 flex justify-center shadow-2xl">{invoice.req && <QRCodeCanvas value={`lightning:${invoice.req.toUpperCase()}`} size={220} includeMargin={true}/>}</div><div className="grid gap-3"><Button variant="primary" onClick={handleManualCheck}>Status Prüfen</Button><Button variant="secondary" onClick={() => window.location.href = `lightning:${invoice.req}`}>Wallet öffnen</Button><button onClick={() => setView('dashboard')} className="text-xs text-neutral-500 mt-4 font-bold uppercase">Abbrechen</button></div></div></Background>);
  if (view === 'game') return (<Background><div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4"><div className="flex justify-between items-end mb-4 px-1"><span className="text-xs font-bold text-neutral-500 uppercase">Frage {currentQ + 1}/5</span><span className={`text-4xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_red]' : 'text-white'}`}>{timeLeft}</span></div><div className="w-full h-2 bg-neutral-900 rounded-full mb-10 overflow-hidden"><div className="h-full bg-orange-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div></div><h3 className="text-2xl font-bold text-white text-center mb-10 min-h-[100px]">"{questions[currentQ].q}"</h3><div className="grid gap-3">{questions[currentQ].options.map((opt, idx) => { let btnClass = "bg-neutral-900/50 hover:bg-orange-500 border-white/10"; const isCorrect = idx === questions[currentQ].correct; const isSelected = selectedAnswer === idx; if (selectedAnswer !== null) { if (isCorrect) { btnClass = "bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"; } else if (isSelected) { btnClass = "bg-red-500 text-white border-red-500"; } else { btnClass = "opacity-30 border-transparent"; } } return (<button key={idx} onClick={() => handleAnswer(idx)} disabled={selectedAnswer !== null} className={`border p-5 rounded-2xl text-left transition-all active:scale-[0.95] flex items-center gap-4 ${btnClass}`}><span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selectedAnswer !== null && isCorrect ? 'bg-black text-green-500' : 'bg-neutral-800 text-neutral-400'}`}>{String.fromCharCode(65 + idx)}</span><span className="font-bold text-lg text-neutral-200">{opt}</span></button>); })}</div></div></Background>);
  if (view === 'result_final') { const duel = activeDuel; const iAmCreator = role === 'creator'; const myS = iAmCreator ? duel.creator_score : duel.challenger_score; const myT = iAmCreator ? duel.creator_time : duel.challenger_time; const opS = iAmCreator ? (duel.challenger_score ?? 0) : (duel.creator_score ?? 0); const opT = iAmCreator ? (duel.challenger_time ?? 999) : (duel.creator_time ?? 999); const won = myS > opS || (myS === opS && myT < opT); const isFinished = duel.status === 'finished'; return (<Background><div className="w-full max-w-sm text-center"><div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-4 ring-offset-4 ring-offset-black ${won && isFinished ? "bg-green-500 ring-green-500" : "bg-red-500 ring-red-500"}`}>{won && isFinished ? <Trophy size={48} className="text-black animate-bounce"/> : <Flame size={48} className="text-black"/>}</div><h2 className={`text-5xl font-black mb-10 uppercase ${won && isFinished ? "text-green-500" : "text-red-500"}`}>{!isFinished ? "Warten..." : won ? "SIEG!" : "NIEDERLAGE"}</h2><div className="grid grid-cols-2 gap-4 mb-10"><Card className="p-4 bg-white/5 border-orange-500/30"><p className="text-[10px] font-bold text-neutral-500 uppercase">Du</p><p className="text-4xl font-black text-white font-mono">{myS}</p><p className="text-[10px] text-neutral-500 italic">{myT}s</p></Card><Card className="p-4 bg-white/5 opacity-50"><p className="text-[10px] font-bold text-neutral-500 uppercase">Gegner</p><p className="text-4xl font-black text-white font-mono">{duel.status === 'finished' ? opS : '?'}</p><p className="text-[10px] text-neutral-500 italic">{duel.status === 'finished' ? opT + 's' : 'läuft...'}</p></Card></div>{withdrawLink ? (<div className="animate-in slide-in-from-bottom-5 duration-700"><div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl"><QRCodeCanvas value={`lightning:${withdrawLink.toUpperCase()}`} size={180}/></div><Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>GEWINN ABHOLEN ⚡</Button><p className="text-orange-400 text-[10px] mt-4 font-mono animate-pulse uppercase tracking-widest italic">App springt nach Einlösung automatisch zurück</p></div>) : <button onClick={() => setView('dashboard')} className="text-neutral-500 font-black uppercase text-xs tracking-widest mt-6">Zurück zur Lobby</button>}</div></Background>); }
}