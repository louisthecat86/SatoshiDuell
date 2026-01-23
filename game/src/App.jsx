import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, 
  Trophy, 
  Clock, 
  User, 
  Plus, 
  Swords, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Loader2, 
  LogOut, 
  Fingerprint, 
  Flame, 
  History, 
  Coins, 
  Lock, 
  Medal, 
  Share2, 
  Globe, 
  Settings, 
  Save, 
  Heart,
  Github,
  CheckCircle,
  RefreshCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import { nip19 } from 'nostr-tools'; 

// --- EIGENE IMPORTS ---
import { TRANSLATIONS } from './translations'; 
import Button from './components/Button';
import Card from './components/Card';
import Background from './components/Background';

// --- KONFIGURATION ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY; 

const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.primal.net',
  'wss://nos.lol'
];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- KONSTANTEN ---
const REFUND_TIMEOUT_MS = 3 * 24 * 60 * 60 * 1000; 

// --- HELPER FUNKTIONEN ---

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- HAUPT APP ---

export default function App() {
  // --- STATE MANAGEMENT ---
  
  // Navigation & User
  const [view, setView] = useState('loading_data'); 
  const [lang, setLang] = useState('de'); 
  const [user, setUser] = useState(null);
  
  // Daten vom Server
  const [allQuestions, setAllQuestions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Login
  const [loginInput, setLoginInput] = useState(''); 
  const [loginPin, setLoginPin] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Settings
  const [newPin, setNewPin] = useState('');
  const [settingsMsg, setSettingsMsg] = useState('');
  
  // Nostr
  const [nostrSetupPubkey, setNostrSetupPubkey] = useState(null);
  const [nostrSetupName, setNostrSetupName] = useState('');
  
  // Game & Lobby
  const [leaderboard, setLeaderboard] = useState([]);
  const [challengePlayer, setChallengePlayer] = useState(null);
  
  // LISTEN (GETRENNT)
  const [publicDuels, setPublicDuels] = useState([]);     
  const [targetedDuels, setTargetedDuels] = useState([]); 
  const [myDuels, setMyDuels] = useState([]);             
  
  const [activeDuel, setActiveDuel] = useState(null);
  const [role, setRole] = useState(null); 
  const [gameData, setGameData] = useState([]); 
  const [wager, setWager] = useState(''); 
  const [stats, setStats] = useState({ wins: 0, losses: 0, total: 0, satsWon: 0 });
  
  // Quiz
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  
  // Payment
  const [invoice, setInvoice] = useState({ req: '', hash: '', amount: 0 });
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);
  const [invoiceCopied, setInvoiceCopied] = useState(false);

  // Withdraw
  const [withdrawLink, setWithdrawLink] = useState('');
  const [withdrawId, setWithdrawId] = useState(''); 
  const [withdrawCopied, setWithdrawCopied] = useState(false); // NEU: Withdraw Copy State

  // Donation
  const [donationAmount, setDonationAmount] = useState(2100);
  const [donationInvoice, setDonationInvoice] = useState('');
  const [isDonationLoading, setIsDonationLoading] = useState(false);
  const [isDonationSuccess, setIsDonationSuccess] = useState(false);

  // Helper
  const txt = (key) => TRANSLATIONS[lang]?.[key] || key;

// --- INTELLIGENTER GENERATOR (Fisher-Yates + History) ---
  const generateGameData = (questionsSource) => {
    if (!questionsSource || questionsSource.length === 0) return [];

    // 1. Hole die Historie der bereits gespielten Fragen
    let playedIds = JSON.parse(localStorage.getItem('played_questions') || '[]');

    // 2. Filtere alle Fragen heraus, die wir schon hatten
    let availableIndices = questionsSource
      .map((_, i) => i)
      .filter(id => !playedIds.includes(id));

    // 3. Wenn weniger als 5 Fragen übrig sind (Pool erschöpft), setze Historie zurück
    if (availableIndices.length < 5) {
      playedIds = [];
      availableIndices = questionsSource.map((_, i) => i);
    }

    // 4. Fisher-Yates Shuffle (Der ECHTE Zufall)
    // Dieser Algorithmus mischt perfekt gleichmäßig
    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    // 5. Die ersten 5 auswählen
    const selectedIndices = availableIndices.slice(0, 5);

    // 6. Die neuen Fragen zur Historie hinzufügen und speichern
    const newHistory = [...playedIds, ...selectedIndices];
    localStorage.setItem('played_questions', JSON.stringify(newHistory));

    // 7. Struktur für das Spiel bauen (Antworten mischen wir auch mit Fisher-Yates)
    return selectedIndices.map(id => {
      const order = [0, 1, 2, 3];
      // Antworten mischen
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      
      return {
        id: id,
        order: order
      };
    });
  };

  // --- INITIALISIERUNG ---

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');
        if (!res.ok) throw new Error("Server Error");
        const data = await res.json();
        setAllQuestions(data);
        setIsDataLoaded(true);
      } catch (e) {
        console.error("Failed to load questions", e);
        alert("Fehler: Konnte Fragen nicht laden. Bitte Seite neu laden.");
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!isDataLoaded) return; 
    const savedLang = localStorage.getItem('satoshi_lang');
    const storedUser = localStorage.getItem('satoshi_user');
    const savedPin = localStorage.getItem('saved_pin');
    
    if (savedLang) {
      setLang(savedLang);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setView('dashboard');
      } else {
        setView('login');
        if (savedPin) setLoginPin(savedPin);
      }
    } else {
      setView('language_select');
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (view === 'dashboard' && user) {
      fetchAllLobbyData();
      const channel = supabase.channel('public:duels')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, () => {
          fetchAllLobbyData();
        })
        .subscribe();
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
      checkPaymentStatus();
      interval = setInterval(() => checkPaymentStatus(), 2000); 
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

  useEffect(() => {
    if (view === 'donate' && isDonationSuccess) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#FFA500', '#ffffff', '#FF4500'] });
      const timer = setTimeout(() => { setIsDonationSuccess(false); setDonationInvoice(''); setView('dashboard'); }, 3500);
      return () => clearTimeout(timer);
    }
  }, [view, isDonationSuccess]);

  // --- LOGIK ---
  
  const previewLanguage = (l) => { setLang(l); };
  
  const acceptDisclaimer = () => {
    localStorage.setItem('satoshi_lang', lang);
    if (localStorage.getItem('satoshi_user')) { setView('dashboard'); } else { setView('login'); }
  };

  const handleSmartLogin = async (e) => {
    if (e) e.preventDefault(); setLoginError(''); setIsLoginLoading(true);
    const input = loginInput.trim();
    let pubkeyFromInput = null; let nameFromInput = null;
    if (loginPin.length < 4) { setLoginError(txt('login_error_pin')); setIsLoginLoading(false); return; }
    if (input.startsWith('npub1')) {
      try { const { type, data } = nip19.decode(input); if (type === 'npub') pubkeyFromInput = data; } 
      catch (err) { setLoginError("Invalid NPUB"); setIsLoginLoading(false); return; }
    } else {
      nameFromInput = input.toLowerCase();
      if (nameFromInput.length < 3) { setLoginError(txt('login_error_name')); setIsLoginLoading(false); return; }
    }
    try {
      const hashedPin = await hashPin(loginPin);
      let query = supabase.from('players').select('*');
      if (pubkeyFromInput) query = query.eq('pubkey', pubkeyFromInput); else query = query.eq('name', nameFromInput);
      const { data: existingUser } = await query.single();
      if (existingUser) {
        if (nameFromInput && existingUser.pubkey) { setLoginError(txt('login_error_nostr')); setIsLoginLoading(false); return; }
        if (existingUser.pin === 'nostr-auth' || existingUser.pin === 'extension-auth') { setLoginError(txt('login_error_wrong_pin')); } 
        else if (existingUser.pin === hashedPin) { finishLogin(existingUser.name, existingUser.pubkey); } 
        else { setLoginError(txt('login_error_wrong_pin')); }
      } else {
        if (pubkeyFromInput) { localStorage.setItem('temp_nostr_pin', hashedPin); setNostrSetupPubkey(pubkeyFromInput); setIsLoginLoading(false); setView('nostr_setup'); } 
        else {
          const { data: nameTaken } = await supabase.from('players').select('*').eq('name', nameFromInput).single();
          if(nameTaken) { setLoginError(txt('login_error_taken')); setIsLoginLoading(false); return; }
          await supabase.from('players').insert([{ name: nameFromInput, pin: hashedPin }]);
          finishLogin(nameFromInput, null);
        }
      }
    } catch (err) { setLoginError("Error."); } finally { if (!nostrSetupPubkey) setIsLoginLoading(false); }
  };

  const finishLogin = (name, pubkey) => {
    const userObj = { name, pubkey };
    setUser(userObj); localStorage.setItem('satoshi_user', JSON.stringify(userObj)); localStorage.setItem('saved_pin', loginPin); setView('dashboard');
  };

  const handleExtensionLogin = async () => {
    if (!window.nostr) { alert("No Nostr Extension found!"); return; }
    try {
      const pubkey = await window.nostr.getPublicKey();
      setLoginInput(nip19.npubEncode(pubkey)); 
      const { data: existingUser } = await supabase.from('players').select('*').eq('pubkey', pubkey).single();
      if (existingUser) finishLogin(existingUser.name, pubkey);
      else { localStorage.setItem('temp_nostr_pin', 'extension-auth'); setNostrSetupPubkey(pubkey); setView('nostr_setup'); }
    } catch (e) { console.error(e); }
  };

  const completeNostrRegistration = async (e) => {
    if(e) e.preventDefault();
    const cleanName = nostrSetupName.trim().toLowerCase();
    if (cleanName.length < 3) return;
    const { data: nameTaken } = await supabase.from('players').select('*').eq('name', cleanName).single();
    if (nameTaken) { alert(txt('login_error_taken')); return; }
    const pinToSave = localStorage.getItem('temp_nostr_pin') || 'nostr-auth';
    await supabase.from('players').insert([{ name: cleanName, pubkey: nostrSetupPubkey, pin: pinToSave }]);
    localStorage.removeItem('temp_nostr_pin');
    finishLogin(cleanName, nostrSetupPubkey);
  };

  const handleUpdatePin = async () => {
    if (newPin.length < 4) { setSettingsMsg(txt('login_error_pin')); return; }
    try {
      const hashed = await hashPin(newPin);
      await supabase.from('players').update({ pin: hashed }).eq('name', user.name);
      setSettingsMsg(txt('settings_saved')); localStorage.setItem('saved_pin', newPin);
      setTimeout(() => { setView('dashboard'); setSettingsMsg(''); setNewPin(''); }, 1500);
    } catch (e) { setSettingsMsg("Error saving."); }
  };

  const shareDuelOnNostr = async (duel) => {
    let shareString = txt('nostr_share_text');
    shareString = shareString.replace('{amount}', duel.amount).replace('{score}', duel.creator_score);
    try {
      await navigator.clipboard.writeText(shareString);
      alert(txt('nostr_copied')); 
    } catch (e) {
      console.error(e);
      alert("Fehler beim Kopieren.");
    }
  };

  // --- DONATION LOGIC ---
  const openDonation = () => { setDonationInvoice(''); setDonationAmount(2100); setIsDonationSuccess(false); setView('donate'); };
  const handleGenerateDonation = async () => {
    setIsDonationLoading(true);
    try {
      const res = await fetch('/api/donate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: donationAmount }) });
      const data = await res.json();
      if (data.req) setDonationInvoice(data.req); else alert("Fehler bei der Erstellung");
    } catch (e) { console.error(e); alert("Connection Error"); }
    setIsDonationLoading(false);
  };
  const handleConfirmDonation = () => { setIsDonationSuccess(true); };

  // --- DATEN LADEN & SPIEL ---
  
  const fetchAllLobbyData = async () => {
    if (!user) return;

    // 1. Leaderboard & Stats
    const { data: finishedDuels } = await supabase.from('duels').select('*').eq('status', 'finished');
    if (finishedDuels) {
      const playerStats = {};
      let myWins = 0, mySats = 0;
      finishedDuels.forEach(d => {
        const p1Won = d.creator_score > d.challenger_score || (d.creator_score === d.challenger_score && d.creator_time < d.challenger_time);
        const winner = p1Won ? d.creator : d.challenger;
        [d.creator, d.challenger].forEach(p => { 
          if (!playerStats[p]) playerStats[p] = { name: p, wins: 0, satsWon: 0 }; 
          if (p === winner) { playerStats[p].wins++; playerStats[p].satsWon += d.amount; } 
        });
        if (d.creator === user.name || d.challenger === user.name) {
          const amICreator = d.creator === user.name;
          const iWon = (amICreator && p1Won) || (!amICreator && !p1Won);
          if (iWon) { myWins++; mySats += d.amount; }
        }
      });
      setLeaderboard(Object.values(playerStats).sort((a, b) => b.satsWon - a.satsWon).slice(0, 10));
      setStats(prev => ({ ...prev, wins: myWins, satsWon: mySats }));
    }

    // 2. ALLE offenen Duelle laden
    const { data: allOpen } = await supabase.from('duels').select('*').eq('status', 'open').order('created_at', { ascending: false });
    
    if (allOpen) {
      const publicData = allOpen.filter(d => !d.target_player || d.target_player.trim() === '');
      setPublicDuels(publicData);
      const targetData = allOpen.filter(d => d.target_player === user.name);
      setTargetedDuels(targetData);
    }

    // 3. Meine Geschichte
    const { data: myHistory } = await supabase
      .from('duels')
      .select('*')
      .or(`creator.eq.${user.name},challenger.eq.${user.name}`)
      .order('created_at', { ascending: false });
    
    if (myHistory) {
      setMyDuels(myHistory);
      const finishedCount = myHistory.filter(d => d.status === 'finished').length;
      setStats(prev => ({ ...prev, total: finishedCount, losses: finishedCount - prev.wins }));
    }
  };

  const fetchLeaderboard = () => {}; 
  const fetchStats = () => {};
  const fetchDuels = () => {};
  const fetchMyDuels = () => {};
  
  const checkPaymentStatus = async () => { if (!invoice.hash) return; try { const url = `${LNBITS_URL}/api/v1/payments/${invoice.hash}?ts=${Date.now()}`; const res = await fetch(url, { headers: { 'X-Api-Key': INVOICE_KEY } }); const data = await res.json(); if (data.paid === true || data.status === 'success') { setCheckingPayment(true); startGame(); } } catch(e) {} };
  const checkWithdrawStatus = async () => { if (!withdrawId) return; try { const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links/${withdrawId}`, { headers: { 'X-Api-Key': INVOICE_KEY } }); const data = await res.json(); if (data.used >= 1 || data.spent === true) { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); setTimeout(() => { setView('dashboard'); resetGameState(); setWithdrawId(''); }, 2000); } } catch(e) {} };
  const handleManualCheck = async () => { setManualCheckLoading(true); await checkPaymentStatus(); setTimeout(() => setManualCheckLoading(false), 1000); };
  
  const resetGameState = () => { 
    setWithdrawLink(''); setWithdrawId(''); setScore(0); setTotalTime(0); setCurrentQ(0); 
    setInvoice({ req: '', hash: '', amount: 0 }); 
    setSelectedAnswer(null); 
    setInvoiceCopied(false); 
    setWithdrawCopied(false); // NEU: Reset Withdraw
  };
  
  const startChallenge = (target) => { 
    setChallengePlayer(target); 
    resetGameState();
    setWager('');
    setView('create_setup'); 
  };
  
  const openCreateSetup = () => { 
    setChallengePlayer(null); 
    resetGameState(); 
    setWager(''); 
    setView('create_setup'); 
  };
  
  const submitCreateDuel = async () => { 
    if (!wager || Number(wager) <= 0) { alert("Bitte einen Einsatz wählen!"); return; }
    const gameConfig = generateGameData(allQuestions); 
    setGameData(gameConfig); setRole('creator'); await fetchInvoice(Number(wager)); 
  };
  
  const initJoinDuel = async (duel) => { 
    resetGameState(); setActiveDuel(duel); 
    const rawQuestions = duel.questions;
    let safeGameData = [];
    if (rawQuestions && typeof rawQuestions[0] === 'number') { safeGameData = rawQuestions.map(id => ({ id: id, order: [0, 1, 2, 3] })); } 
    else { safeGameData = rawQuestions; }
    setGameData(safeGameData); setRole('challenger'); await fetchInvoice(duel.amount); 
  };

  const handleRefund = async (duel) => {
    if (!confirm("Einsatz wirklich zurückfordern?")) return;
    try {
      const res = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: duel.amount, duelId: duel.id, reason: 'timeout' })
      });
      const data = await res.json();
      if (data.lnurl) {
        setWithdrawLink(data.lnurl);
        setWithdrawId(data.id);
        await supabase.from('duels').update({ status: 'refunded' }).eq('id', duel.id);
        setView('result_final');
      } else { alert("Fehler beim Erstellen des Refunds."); }
    } catch (e) { console.error(e); alert("Verbindungsfehler"); }
  };

  const fetchInvoice = async (amountSat) => {
    try { const res = await fetch(`${LNBITS_URL}/api/v1/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY }, body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell`, expiry: 600 }) }); const data = await res.json(); setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat }); setCheckingPayment(false); setView('payment'); } catch (e) { alert("LNbits Error"); setView('dashboard'); }
  };

  const startGame = () => { setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15); setSelectedAnswer(null); setView('game'); };

  const handleAnswer = (displayIndex) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(displayIndex);
    setTotalTime(prev => prev + (15 - timeLeft)); 
    const roundConfig = gameData[currentQ];
    const originalIndex = roundConfig.order[displayIndex];
    const correctIndex = allQuestions[roundConfig.id].correct;
    const isCorrect = (originalIndex === correctIndex);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentQ < 4) { setCurrentQ(p => p + 1); setTimeLeft(15); setSelectedAnswer(null); } 
      else { finishGameLogic(isCorrect ? score + 1 : score); }
    }, 2000);
  };

  const finishGameLogic = async (finalScore = score) => {
    if (role === 'creator') {
      await supabase.from('duels').insert([{ 
        creator: user.name, 
        creator_score: finalScore, 
        creator_time: totalTime, 
        questions: gameData, 
        status: 'open', 
        amount: invoice.amount, 
        target_player: challengePlayer 
      }]); 
      setView('dashboard');
    } else {
      const { data } = await supabase.from('duels').update({ challenger: user.name, challenger_score: finalScore, challenger_time: totalTime, status: 'finished' }).eq('id', activeDuel.id).select();
      if (data) { setActiveDuel(data[0]); determineWinner(data[0], 'challenger', finalScore, totalTime); }
    }
  };

  const openPastDuel = (duel) => { setActiveDuel(duel); const myRole = duel.creator === user.name ? 'creator' : 'challenger'; setRole(myRole); const myS = myRole === 'creator' ? duel.creator_score : duel.challenger_score; const myT = myRole === 'creator' ? duel.creator_time : duel.challenger_time; determineWinner(duel, myRole, myS, myT); };
  
  const determineWinner = async (duel, myRole, myScore, myTime) => { 
    if (duel.status === 'refunded') { setView('result_final'); return; }
    setView('result_final'); 
    const oppScore = myRole === 'creator' ? (duel.challenger_score || 0) : duel.creator_score; 
    const oppTime = myRole === 'creator' ? (duel.challenger_time || 999) : duel.creator_time; 
    const won = myScore > oppScore || (myScore === oppScore && myTime < oppTime); 
    if (duel.status === 'finished' && won && !duel.claimed) { 
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); 
      await createWithdrawLink(duel.amount, duel.id); 
    } 
  };
  
  const createWithdrawLink = async (duelAmount, duelId) => { try { const res = await fetch('/api/claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: duelAmount, duelId: duelId }) }); const data = await res.json(); if (data.lnurl) { setWithdrawLink(data.lnurl); setWithdrawId(data.id); await supabase.from('duels').update({ claimed: true }).eq('id', duelId); } } catch(e) { console.error("Withdraw Error:", e); } };
  
  const handleLogout = () => { localStorage.clear(); setUser(null); setView('language_select'); };

  // --- VIEWS ---

  if (view === 'loading_data') {
    return (<Background><div className="flex flex-col items-center justify-center h-screen"><Loader2 size={48} className="text-orange-500 animate-spin"/><p className="text-white mt-4 font-bold uppercase tracking-widest">Lade Quiz Daten...</p></div></Background>);
  }

  if (view === 'language_select') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col items-center justify-center min-h-[90vh] px-4 gap-6 animate-float">
          <div className="flex flex-col items-center justify-center">
             <div className="relative mb-4"><div className="absolute inset-0 bg-orange-500 blur-[50px] opacity-20 rounded-full"></div><img src="/logo.png" alt="Satoshi Duell" className="relative w-40 h-40 object-contain drop-shadow-2xl mx-auto" /></div>
             <h1 className="text-4xl font-black text-white italic uppercase drop-shadow-md">SATOSHI<span className="text-orange-500">DUELL</span></h1>
          </div>
          <div className="flex gap-4 mb-2">
            <button onClick={() => previewLanguage('de')} className={`text-3xl p-3 rounded-xl border transition-all ${lang === 'de' ? 'bg-orange-500/20 border-orange-500 scale-110' : 'bg-black/40 border-white/10 hover:bg-white/10'}`}>🇩🇪</button>
            <button onClick={() => previewLanguage('en')} className={`text-3xl p-3 rounded-xl border transition-all ${lang === 'en' ? 'bg-orange-500/20 border-orange-500 scale-110' : 'bg-black/40 border-white/10 hover:bg-white/10'}`}>🇺🇸</button>
            <button onClick={() => previewLanguage('es')} className={`text-3xl p-3 rounded-xl border transition-all ${lang === 'es' ? 'bg-orange-500/20 border-orange-500 scale-110' : 'bg-black/40 border-white/10 hover:bg-white/10'}`}>🇪🇸</button>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-sm"><h3 className="text-orange-500 font-bold uppercase text-xs mb-2 tracking-widest text-center">{txt('welcome_disclaimer')}</h3><p className="text-neutral-400 text-xs text-center leading-relaxed">{txt('welcome_text')}</p></div>
          <Button variant="primary" onClick={acceptDisclaimer}>{txt('btn_understood')}</Button>
          <a href="https://github.com/louisthecat86/SatoshiDuell" target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center gap-2 text-white/20 hover:text-white/50 transition-colors text-[10px] uppercase tracking-widest"><Github size={14} /><span>Open Source Everything</span></a>
        </div>
      </Background>
    );
  }

  if (view === 'login') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
          <div className="flex flex-col items-center justify-center">
             <div className="relative mb-4"><div className="absolute inset-0 bg-orange-500 blur-[50px] opacity-20 rounded-full"></div><img src="/logo.png" alt="Satoshi Duell" className="relative w-48 h-48 object-contain drop-shadow-2xl mx-auto" /></div>
             <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase drop-shadow-md">SATOSHI<span className="text-orange-500">DUELL</span></h1>
          </div>
          <form onSubmit={handleSmartLogin} className="flex flex-col gap-4 mt-2">
            <input type="text" placeholder={txt('login_placeholder')} value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-black transition-all font-bold uppercase text-center shadow-lg placeholder:text-neutral-600"/>
            <input type="password" placeholder={txt('pin_placeholder')} value={loginPin} onChange={(e) => setLoginPin(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-black transition-all font-bold text-center shadow-lg placeholder:text-neutral-600"/>
            {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
            <Button variant="primary" onClick={handleSmartLogin} disabled={isLoginLoading}>{isLoginLoading ? <Loader2 className="animate-spin mx-auto"/> : txt('login_btn')}</Button>
          </form>
          <div className="relative py-2 text-center"><span className="relative bg-[#1a1a1a] px-3 text-[10px] uppercase font-bold text-neutral-600 rounded">Option</span></div>
          <Button variant="secondary" onClick={handleExtensionLogin}><Fingerprint size={18}/> {txt('btn_nostr_ext')}</Button>
          <button onClick={() => setView('language_select')} className="text-neutral-500 text-xs uppercase font-bold mt-4 hover:text-white">Back / Zurück 🌐</button>
        </div>
      </Background>
    );
  }

  if (view === 'donate') {
    if (isDonationSuccess) {
      return (<Background><div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4 items-center justify-center h-[80vh]"><div className="relative"><div className="absolute inset-0 bg-green-500 blur-[60px] opacity-40 rounded-full animate-pulse"></div><Heart size={120} className="text-green-500 fill-green-500 relative animate-bounce"/></div><h2 className="text-4xl font-black text-white uppercase drop-shadow-lg">{txt('donate_thanks')}</h2><p className="text-neutral-400 text-sm animate-pulse">Redirecting to Dashboard...</p></div></Background>);
    }
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
          <Heart size={48} className="text-orange-500 mx-auto animate-pulse"/>
          <h2 className="text-2xl font-black text-white uppercase">{txt('donate_title')}</h2>
          <p className="text-neutral-400 text-sm">{txt('donate_text')}</p>
          {!donationInvoice ? (
            <div className="flex flex-col gap-4">
               <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(Number(e.target.value))} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white font-mono text-2xl font-bold text-center outline-none focus:border-orange-500"/>
               <div className="grid grid-cols-3 gap-2">{[500, 2100, 5000].map(amt => (<button key={amt} onClick={() => setDonationAmount(amt)} className="bg-neutral-800 p-2 rounded border border-white/5 hover:bg-orange-500/20 text-xs text-white transition-colors">{amt}</button>))}</div>
               <Button variant="primary" onClick={handleGenerateDonation} disabled={isDonationLoading}>{isDonationLoading ? <Loader2 className="animate-spin mx-auto"/> : txt('donate_btn')}</Button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-5 flex flex-col gap-4">
               <div className="bg-white p-4 rounded-3xl inline-block mx-auto shadow-2xl"><QRCodeCanvas value={`lightning:${donationInvoice.toUpperCase()}`} size={220}/></div>
               <div className="flex flex-col gap-2"><Button variant="secondary" onClick={() => window.location.href = `lightning:${donationInvoice}`}>{txt('btn_wallet')}</Button><button onClick={handleConfirmDonation} className="w-full py-3 bg-green-600/20 border border-green-500/50 rounded-xl text-green-400 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600/40 transition-all"><CheckCircle size={16}/> Ich habe gesendet!</button></div>
            </div>
          )}
          <button onClick={() => setView('dashboard')} className="text-xs text-neutral-600 uppercase font-bold mt-4">{txt('settings_back')}</button>
        </div>
      </Background>
    );
  }

  if (view === 'settings') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
          <h2 className="text-2xl font-black text-white uppercase">{txt('settings_title')}</h2>
          <p className="text-neutral-400 text-sm">{txt('settings_text')}</p>
          <div className="flex flex-col gap-4">
             <input type="password" placeholder={txt('pin_placeholder')} value={newPin} onChange={(e) => setNewPin(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 font-bold text-center shadow-lg"/>
             {settingsMsg && <p className={`text-xs font-bold ${settingsMsg.includes('!') ? 'text-green-500' : 'text-red-500'}`}>{settingsMsg}</p>}
             <Button variant="primary" onClick={handleUpdatePin}><Save size={18}/> {txt('settings_save')}</Button>
             <button onClick={() => setView('dashboard')} className="text-xs text-neutral-600 uppercase font-bold mt-4">{txt('settings_back')}</button>
          </div>
        </div>
      </Background>
    );
  }

  if (view === 'nostr_setup') {
    return (
      <Background>
         <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-purple-400 border border-purple-500/50"><Globe size={32}/></div>
            <h2 className="text-2xl font-black text-white uppercase">{txt('nostr_setup_title')}</h2><p className="text-neutral-400 text-sm">{txt('nostr_setup_text')}</p>
            <form onSubmit={completeNostrRegistration} className="flex flex-col gap-4"><input type="text" placeholder="GAMERTAG" value={nostrSetupName} onChange={(e) => setNostrSetupName(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 font-bold uppercase text-center shadow-lg"/><Button variant="primary" onClick={completeNostrRegistration}>OK</Button><button onClick={() => setView('login')} className="text-xs text-neutral-600 uppercase font-bold">Zurück</button></form>
         </div>
      </Background>
    );
  }

  if (view === 'dashboard') {
    return (
      <Background>
        <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 overflow-hidden px-2">
          <Card className="flex justify-between items-center py-3 border-orange-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center font-black text-black text-xl">{user.name.charAt(0).toUpperCase()}</div>
              <div className="text-left"><p className="font-bold text-white text-sm uppercase">{user.name}</p><p className="text-[10px] text-orange-400 font-mono">{stats.satsWon.toLocaleString()} {txt('sats_won')}</p></div>
            </div>
            <div className="flex gap-2"><button onClick={() => setView('settings')} className="p-2 text-neutral-500 hover:text-white"><Settings size={18}/></button><button onClick={handleLogout} className="p-2 text-neutral-500 hover:text-white"><LogOut size={18}/></button></div>
          </Card>

          <Button onClick={openCreateSetup} className="py-4 text-lg animate-neon"><Plus size={24}/> {txt('dashboard_new_duel')}</Button>

          <div className="flex-1 overflow-hidden flex flex-col gap-4">
            
            {/* 1. HERAUSFORDERUNGEN AN MICH */}
            {targetedDuels.length > 0 && (
              <div className="flex flex-col gap-2 flex-shrink-0 animate-in slide-in-from-right duration-500">
                 <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest px-2 animate-pulse">{txt('lobby_challenges')}</div>
                 <div className="space-y-2 pr-1">
                   {targetedDuels.map(d => (
                     <div key={d.id} className="bg-purple-500/10 p-3 rounded-xl flex justify-between items-center border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                       <div><p className="font-bold text-white text-xs uppercase">{d.creator} ⚔️</p><p className="text-[10px] text-purple-300 font-mono">{d.amount} sats</p></div>
                       <button onClick={() => initJoinDuel(d)} className="bg-purple-500 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:scale-105 transition-transform">ACCEPT</button>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {/* 2. OFFENE LOBBY (NUR PUBLIC!) */}
            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
               <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-2">{txt('lobby_open')}</div>
               <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                 {/* WICHTIG: Doppelte Filterung für maximale Sicherheit */}
                 {publicDuels.filter(d => d.creator !== user.name && (!d.target_player || d.target_player === '')).length === 0 && <p className="text-neutral-600 text-xs italic text-center py-4">Keine offenen Duelle</p>}
                 {publicDuels.filter(d => d.creator !== user.name && (!d.target_player || d.target_player === '')).map(d => (
                   <div key={d.id} className="bg-white/5 p-3 rounded-xl flex justify-between items-center border border-white/5">
                     <div><p className="font-bold text-white text-xs uppercase">{d.creator}</p><p className="text-[10px] text-orange-400 font-mono">{d.amount} sats</p></div>
                     <button onClick={() => initJoinDuel(d)} className="bg-orange-500 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase">{txt('lobby_fight')}</button>
                   </div>
                 ))}
               </div>
            </div>

            {/* 3. DEINE GESCHICHTE (MIT REFUND) */}
            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
               <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-2">{txt('lobby_history')}</div>
               <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                 {myDuels.map(d => {
                   const isMyOpenDuel = d.creator === user.name && d.status === 'open';
                   // Check ob 3 Tage vergangen sind
                   const created = new Date(d.created_at).getTime();
                   const now = Date.now();
                   const canRefund = isMyOpenDuel && (now - created > REFUND_TIMEOUT_MS);

                   return (
                     <div key={d.id} className="bg-neutral-900/50 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
                       <div className="flex justify-between items-center">
                         <div className="text-left">
                           <p className="text-neutral-400 font-bold uppercase text-xs">
                             {d.target_player 
                               ? `${txt('challenge_sent')} ${d.target_player}` 
                               : `vs ${d.creator === user.name ? (d.challenger || "???") : d.creator}`
                             }
                           </p>
                           <p className="text-[10px] font-mono text-orange-500">{d.amount} sats</p>
                         </div>
                         {d.status === 'finished' ? (
                           <button onClick={() => openPastDuel(d)} className="text-orange-500 font-black uppercase text-[10px]">{d.claimed ? txt('lobby_paid') : txt('lobby_details')}</button>
                         ) : d.status === 'refunded' ? (
                           <span className="text-red-500 font-black text-[10px] uppercase">REFUNDED</span>
                         ) : canRefund ? (
                           // REFUND BUTTON
                           <button onClick={() => handleRefund(d)} className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all flex items-center gap-1">
                             <RefreshCcw size={10}/> {txt('btn_refund')}
                           </button>
                         ) : (
                           <span className="animate-pulse text-neutral-600 uppercase font-black text-[10px]">
                             {d.target_player ? txt('refund_wait') : txt('lobby_wait')}
                           </span>
                         )}
                       </div>
                       {/* NOSTR SHARE BUTTON (Nur wenn offen und kein Refund möglich) */}
                       {d.status === 'open' && d.creator === user.name && !canRefund && (
                         <button onClick={(e) => {e.stopPropagation(); shareDuelOnNostr(d);}} className="w-full bg-purple-500/10 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all group">
                           <Share2 size={14} className="group-hover:animate-pulse"/>
                           <span className="text-[10px] font-bold uppercase tracking-widest">{txt('share_nostr')}</span>
                         </button>
                       )}
                     </div>
                   );
                 })}
               </div>
            </div>
          </div>
          
          <button onClick={openDonation} className="w-full py-2 bg-gradient-to-r from-orange-900/50 to-orange-600/50 border border-orange-500/30 rounded-xl text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-125 transition-all shadow-lg mt-2">
             <Heart size={14} className="fill-orange-500 text-orange-500"/> {txt('dashboard_donate')}
          </button>

          <div className="flex flex-col gap-2 bg-neutral-900/50 p-3 rounded-2xl border border-white/5 mt-2">
            <div className="flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest px-1"><Trophy size={14}/> {txt('leaderboard')}</div>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar">
              {leaderboard.map((p, i) => (
                <div key={p.name} className="flex justify-between items-center bg-black/20 p-2 rounded-lg text-xs">
                  <span className="text-neutral-500 font-mono w-5 text-center">{i + 1}</span>
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
  }

  if (view === 'create_setup') {
    return (
      <Background>
        <Card className="w-full max-w-sm text-center">
          <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">
            {challengePlayer ? `${txt('setup_target')} ${challengePlayer.toUpperCase()}` : txt('setup_title')}
          </h2>
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">{txt('setup_wager_label')}</p>
          <input type="number" value={wager} onChange={(e) => setWager(e.target.value)} placeholder="0" className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none mb-10 placeholder:text-neutral-800"/>
          
          <p className="text-[10px] text-neutral-500 mb-8 italic">{txt('setup_refund_info')}</p>

          <div className="grid grid-cols-4 gap-2 mb-8">{[100, 500, 1000, 2100].map(amt => (<button key={amt} onClick={() => setWager(amt)} className={`py-2 rounded-lg text-xs font-bold border ${Number(wager) === amt ? 'bg-orange-500 text-black border-orange-500' : 'bg-neutral-800 text-neutral-400 border-white/5'}`}>{amt}</button>))}</div>
          <div className="grid gap-3"><Button variant="primary" onClick={submitCreateDuel}>{txt('btn_start')}</Button><button onClick={() => setView('dashboard')} className="text-xs text-neutral-600 uppercase font-bold mt-2">{txt('btn_cancel')}</button></div>
        </Card>
      </Background>
    );
  }

  if (view === 'payment') {
    return (
      <Background>
        <div className="w-full max-w-sm text-center">
          <h2 className="text-2xl font-black text-white mb-8 uppercase">{txt('pay_title')}</h2>
          <div className="bg-white p-4 rounded-3xl mx-auto mb-8 flex justify-center shadow-2xl">{invoice.req && <QRCodeCanvas value={`lightning:${invoice.req.toUpperCase()}`} size={220} includeMargin={true}/>}</div>
          
          {/* KOPIER BUTTON FÜR INVOICE */}
          <div className="my-4 flex justify-center">
             <button 
               onClick={() => {
                 navigator.clipboard.writeText(invoice.req);
                 setInvoiceCopied(true);
                 setTimeout(() => setInvoiceCopied(false), 2000);
               }}
               className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/5"
             >
               {invoiceCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>}
               {txt('btn_copy_invoice')}
             </button>
          </div>

          <div className="grid gap-3"><Button variant="primary" onClick={handleManualCheck}>{txt('btn_check')}</Button><Button variant="secondary" onClick={() => window.location.href = `lightning:${invoice.req}`}>{txt('btn_wallet')}</Button><button onClick={() => setView('dashboard')} className="text-xs text-neutral-500 mt-4 font-bold uppercase">{txt('btn_cancel')}</button></div>
        </div>
      </Background>
    );
  }
  
  if (view === 'game') {
    if (!allQuestions || allQuestions.length === 0) { return (<Background><div className="text-white">Fehler: Keine Fragen geladen.</div></Background>); }
    const roundConfig = gameData[currentQ];
    const questionID = roundConfig.id;
    const shuffledOrder = roundConfig.order;
    const questionData = allQuestions[questionID][lang];
    const originalOptions = questionData.options;
    const correctIndex = allQuestions[questionID].correct;

    return (
      <Background>
        <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4">
          <div className="flex justify-between items-end mb-4 px-1"><span className="text-xs font-bold text-neutral-500 uppercase">{txt('game_q')} {currentQ + 1}/5</span><span className={`text-4xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_red]' : 'text-white'}`}>{timeLeft}</span></div>
          <div className="w-full h-2 bg-neutral-900 rounded-full mb-10 overflow-hidden"><div className="h-full bg-orange-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div></div>
          <h3 className="text-2xl font-bold text-white text-center mb-10 min-h-[100px]">"{questionData.q}"</h3>
          <div className="grid gap-3">{[0,1,2,3].map((displayIndex) => { const originalOptionIndex = shuffledOrder[displayIndex]; const optionText = originalOptions[originalOptionIndex]; let btnClass = "bg-neutral-900/50 hover:bg-orange-500 border-white/10"; const isCorrect = originalOptionIndex === correctIndex; const isSelected = selectedAnswer === displayIndex; if (selectedAnswer !== null) { if (isCorrect) btnClass = "bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"; else if (isSelected) btnClass = "bg-red-500 text-white border-red-500"; else btnClass = "opacity-30 border-transparent"; } return (<button key={`${currentQ}-${displayIndex}`} onClick={() => handleAnswer(displayIndex)} disabled={selectedAnswer !== null} className={`border p-5 rounded-2xl text-left transition-all active:scale-[0.95] flex items-center gap-4 ${btnClass}`}><span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selectedAnswer !== null && isCorrect ? 'bg-black text-green-500' : 'bg-neutral-800 text-neutral-400'}`}>{String.fromCharCode(65 + displayIndex)}</span><span className="font-bold text-lg text-neutral-200">{optionText}</span></button>); })}</div>
        </div>
      </Background>
    );
  }

  if (view === 'result_final') { 
    if (activeDuel && activeDuel.status === 'refunded') {
       return (
         <Background>
           <div className="w-full max-w-sm text-center">
             <h2 className="text-4xl font-black text-white mb-8 uppercase">REFUND</h2>
             <p className="text-neutral-400 mb-8">{txt('refund_info')}</p>
             {withdrawLink && (
                <div className="animate-in slide-in-from-bottom-5">
                  <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl"><QRCodeCanvas value={`lightning:${withdrawLink.toUpperCase()}`} size={180}/></div>
                  <div className="my-4 flex justify-center">
                     <button onClick={() => { navigator.clipboard.writeText(withdrawLink); setWithdrawCopied(true); setTimeout(() => setWithdrawCopied(false), 2000); }} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/5">
                       {withdrawCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {txt('btn_copy_withdraw')}
                     </button>
                  </div>
                  <Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>SATs ABHOLEN</Button>
                </div>
             )}
             <button onClick={() => setView('dashboard')} className="text-neutral-500 font-black uppercase text-xs tracking-widest mt-6">{txt('btn_lobby')}</button>
           </div>
         </Background>
       )
    }

    const duel = activeDuel; 
    const iAmCreator = role === 'creator'; 
    const myS = iAmCreator ? duel.creator_score : duel.challenger_score; 
    const myT = iAmCreator ? duel.creator_time : duel.challenger_time; 
    const opS = iAmCreator ? (duel.challenger_score ?? 0) : (duel.creator_score ?? 0); 
    const opT = iAmCreator ? (duel.challenger_time ?? 999) : (duel.creator_time ?? 999); 
    const won = myS > opS || (myS === opS && myT < opT); 
    const isFinished = duel.status === 'finished'; 
    
    return (
      <Background>
         <div className="w-full max-w-sm text-center">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-4 ring-offset-4 ring-offset-black ${won && isFinished ? "bg-green-500 ring-green-500" : "bg-red-500 ring-red-500"}`}>{won && isFinished ? <Trophy size={48} className="text-black animate-bounce"/> : <Flame size={48} className="text-black"/>}</div>
            <h2 className={`text-5xl font-black mb-10 uppercase ${won && isFinished ? "text-green-500" : "text-red-500"}`}>{!isFinished ? txt('result_wait') : won ? txt('result_win') : txt('result_loss')}</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <Card className="p-4 bg-white/5 border-orange-500/30"><p className="text-[10px] font-bold text-neutral-500 uppercase">Du</p><p className="text-4xl font-black text-white font-mono">{myS}</p><p className="text-[10px] text-neutral-500 italic">{myT}s</p></Card>
              <Card className="p-4 bg-white/5 opacity-50"><p className="text-[10px] font-bold text-neutral-500 uppercase">Gegner</p><p className="text-4xl font-black text-white font-mono">{duel.status === 'finished' ? opS : '?'}</p><p className="text-[10px] text-neutral-500 italic">{duel.status === 'finished' ? opT + 's' : 'läuft...'}</p></Card>
            </div>
            {withdrawLink ? (
              <div className="animate-in slide-in-from-bottom-5 duration-700">
                <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl"><QRCodeCanvas value={`lightning:${withdrawLink.toUpperCase()}`} size={180}/></div>
                <div className="my-4 flex justify-center">
                   <button onClick={() => { navigator.clipboard.writeText(withdrawLink); setWithdrawCopied(true); setTimeout(() => setWithdrawCopied(false), 2000); }} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/5">
                     {withdrawCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {txt('btn_copy_withdraw')}
                   </button>
                </div>
                <Button variant="success" onClick={() => window.location.href = `lightning:${withdrawLink}`}>{txt('btn_withdraw')}</Button>
                <p className="text-orange-400 text-[10px] mt-4 font-mono animate-pulse uppercase tracking-widest italic">App springt nach Einlösung automatisch zurück</p>
              </div>
            ) : (
              <button onClick={() => setView('dashboard')} className="text-neutral-500 font-black uppercase text-xs tracking-widest mt-6">{txt('btn_lobby')}</button>
            )}
         </div>
      </Background>
    ); 
  }
}