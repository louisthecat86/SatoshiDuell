import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check, 
  ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame, 
  History, Coins, Lock, Medal, Share2, Globe, Settings, Save, Heart, 
  Github, CheckCircle, RefreshCcw, Rocket, ArrowLeft, Users, AlertCircle, 
  Bell, Shield, Search, Link as LinkIcon, PlayCircle, Edit2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import { nip19 } from 'nostr-tools'; 

// --- EIGENE IMPORTS ---
// Stelle sicher, dass diese Dateien in deinem Projekt existieren!
import { TRANSLATIONS } from './translations'; 
import Button from './components/Button';
import Card from './components/Card';
import Background from './components/Background';
import AdminQuestionManager from './components/AdminQuestionManager';
import SubmitQuestion from './components/SubmitQuestion';

// --- KONFIGURATION ---
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const LNBITS_URL = import.meta.env.VITE_LNBITS_URL;
const INVOICE_KEY = import.meta.env.VITE_INVOICE_KEY; 

// 🔥 DEINE DOMAIN (Für Share-Links)
const MAIN_DOMAIN = "https://satoshiduell.vercel.app"; 

// --- SUPABASE CLIENT INITIALISIERUNG ---
// Wir definieren das HIER, außerhalb der Komponente, damit es nur 1x passiert.
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- KONSTANTEN ---
const REFUND_TIMEOUT_MS = 3 * 24 * 60 * 60 * 1000; // 3 Tage

// --- HELPER FUNKTIONEN ---

// Hash Pin sicher
async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Formatiere Namen (z.B. npub kürzen)
const formatName = (name) => {
  if (!name) return 'Unknown';
  if (name.length <= 14) return name.toUpperCase();
  return (name.substring(0, 6) + '...' + name.substring(name.length - 4)).toUpperCase();
};

// ============================================================================
// HAUPTKOMPONENTE APP
// ============================================================================

export default function App() {
  
  // --- STATE: NAVIGATION ---
  const [view, setView] = useState('loading_data'); 
  const [dashboardView, setDashboardView] = useState('home'); 
  
  // --- STATE: USER & DATEN ---
  const [lang, setLang] = useState('de'); 
  const [user, setUser] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // --- STATE: LOGIN ---
  const [loginInput, setLoginInput] = useState(''); 
  const [loginPin, setLoginPin] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // --- STATE: SETTINGS ---
  const [newPin, setNewPin] = useState('');
  const [settingsMsg, setSettingsMsg] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // --- STATE: ADMIN ---
  const [adminDuels, setAdminDuels] = useState([]);
  const [adminSearch, setAdminSearch] = useState(''); 
  const [adminFilter, setAdminFilter] = useState('all'); 
  
  // --- STATE: NOSTR ---
  const [nostrSetupPubkey, setNostrSetupPubkey] = useState(null);
  const [nostrSetupName, setNostrSetupName] = useState('');
  
  // --- STATE: LOBBY & GAME DATA ---
  const [leaderboard, setLeaderboard] = useState([]);
  const [challengePlayer, setChallengePlayer] = useState(null);
  const [publicDuels, setPublicDuels] = useState([]);      
  const [targetedDuels, setTargetedDuels] = useState([]); 
  const [myDuels, setMyDuels] = useState([]);              
  const [stats, setStats] = useState({ wins: 0, losses: 0, total: 0, satsWon: 0 });
  
  // --- STATE: ACTIVE GAME ---
  const [activeDuel, setActiveDuel] = useState(null);
  const [role, setRole] = useState(null); 
  const [gameData, setGameData] = useState([]); 
  const [wager, setWager] = useState(''); 
  
  // --- STATE: QUIZ ---
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15.0); 
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessingGame, setIsProcessingGame] = useState(false); 
  
  // --- STATE: PAYMENT & CLAIM ---
  const [invoice, setInvoice] = useState({ req: '', hash: '', amount: 0 });
  const [withdrawLink, setWithdrawLink] = useState('');
  const [withdrawId, setWithdrawId] = useState(''); 
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);
  const [invoiceCopied, setInvoiceCopied] = useState(false);
  const [withdrawCopied, setWithdrawCopied] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // --- STATE: DONATION ---
  const [donationAmount, setDonationAmount] = useState(2100);
  const [donationInvoice, setDonationInvoice] = useState('');
  const [isDonationLoading, setIsDonationLoading] = useState(false);
  const [isDonationSuccess, setIsDonationSuccess] = useState(false);

  // Helper für Text
  const txt = (key) => TRANSLATIONS[lang]?.[key] || key;

  // --- LOGIC: GAME GENERATOR ---
  const generateGameData = (questionsSource) => {
    if (!questionsSource || questionsSource.length === 0) return [];
    let playedIds = JSON.parse(localStorage.getItem('played_questions') || '[]');
    let availableIndices = questionsSource.map((_, i) => i).filter(id => !playedIds.includes(id));
    if (availableIndices.length < 5) {
      playedIds = [];
      availableIndices = questionsSource.map((_, i) => i);
    }
    for (let i = availableIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }
    const selectedIndices = availableIndices.slice(0, 5);
    const newHistory = [...playedIds, ...selectedIndices];
    localStorage.setItem('played_questions', JSON.stringify(newHistory));
    return selectedIndices.map(id => {
      const order = [0, 1, 2, 3];
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      return { id: id, order: order };
    });
  };

  // --- EFFECT: INITIALISIERUNG ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId) {
      localStorage.setItem('pending_join_id', joinId);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from('questions').select('*').eq('is_active', true);
        if (error) throw error;
        
        // Daten für App aufbereiten
        const formattedQuestions = data.map((row) => ({
          de: { q: row.question_de, options: row.options_de },
          en: { q: row.question_en, options: row.options_en },
          es: { q: row.question_es, options: row.options_es },
          correct: row.correct_index,
          db_id: row.id 
        }));
        
        setAllQuestions(formattedQuestions);
        setIsDataLoaded(true);
      } catch (e) {
        console.error("Failed to load questions", e);
        alert("Fehler: Konnte Fragen nicht laden. Bitte Seite neu laden.");
      }
    };
    fetchQuestions();
  }, []);

  // --- EFFECT: AUTH CHECK ---
  useEffect(() => {
    if (!isDataLoaded) return; 
    const savedLang = localStorage.getItem('satoshi_lang');
    const storedUser = localStorage.getItem('satoshi_user');
    const savedPin = localStorage.getItem('saved_pin');
    
    if (Notification.permission === 'granted') setNotificationsEnabled(true);

    if (savedLang) {
      setLang(savedLang);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        checkPendingJoinAfterAuth(JSON.parse(storedUser));
      } else {
        setView('login');
        if (savedPin) setLoginPin(savedPin);
      }
    } else {
      setView('language_select');
    }
  }, [isDataLoaded]);

  const checkPendingJoinAfterAuth = async (currentUser) => {
    const pendingId = localStorage.getItem('pending_join_id');
    if (pendingId) {
      try {
        const { data: duel } = await supabase.from('duels').select('*').eq('id', pendingId).single();
        if (duel && duel.status === 'open' && duel.creator !== currentUser.name) {
          localStorage.removeItem('pending_join_id');
          initJoinDuel(duel);
          return; 
        } else if (duel && duel.creator === currentUser.name) {
           localStorage.removeItem('pending_join_id');
           alert("Du kannst deinem eigenen Spiel nicht beitreten.");
        }
      } catch (e) { console.error("Deep Link Error", e); }
      localStorage.removeItem('pending_join_id'); 
    }
    setView('dashboard');
  };

  // --- EFFECT: DASHBOARD UPDATES & NOTIFICATIONS ---
  useEffect(() => {
    if (view === 'dashboard' && user) {
      fetchAllLobbyData();
      
      // NEU: Check ob eingereichte Fragen angenommen wurden
      const checkSubmissions = async () => {
         const { data } = await supabase.from('questions').select('id')
           .eq('submitted_by', user.name)
           .eq('is_verified', true)
           .eq('user_notified', false);
         
         if (data && data.length > 0) {
            const msg = `Glückwunsch! ${data.length} deiner Fragen wurden angenommen!`;
            if (Notification.permission === 'granted') new Notification("SatoshiDuell", { body: msg, icon: '/logo.png' });
            alert(msg + " 🎉");
            
            const ids = data.map(q => q.id);
            await supabase.from('questions').update({ user_notified: true }).in('id', ids);
         }
      };
      checkSubmissions();

      const channel = supabase.channel('public:duels')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, (payload) => {
          fetchAllLobbyData();
          if (Notification.permission === 'granted' && payload.eventType === 'INSERT') {
             if (payload.new.target_player === user.name) new Notification("SatoshiDuell", { body: txt('msg_challenged'), icon: '/logo.png' });
          }
          if (Notification.permission === 'granted' && payload.eventType === 'UPDATE') {
             if (payload.new.status === 'finished') {
                const isPart = payload.new.creator === user.name || payload.new.challenger === user.name;
                if(isPart) new Notification("SatoshiDuell", { body: txt('msg_won'), icon: '/logo.png' });
             }
          }
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [view, user]);

  // --- EFFECT: GAME TIMER ---
  useEffect(() => {
    let timer;
    if (view === 'game' && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 0.1)), 100);
    } else if (view === 'game' && timeLeft <= 0 && selectedAnswer === null) {
      handleAnswer(-1); 
    }
    return () => clearInterval(timer);
  }, [view, timeLeft, selectedAnswer]);

  // --- EFFECT: PAYMENT CHECK ---
  useEffect(() => {
    let interval;
    if (view === 'payment' && invoice.hash && !checkingPayment) {
      checkPaymentStatus();
      interval = setInterval(() => checkPaymentStatus(), 2000); 
    }
    return () => clearInterval(interval);
  }, [view, invoice, checkingPayment]);

  // --- EFFECT: WITHDRAW CHECK ---
  useEffect(() => {
    let interval;
    if (view === 'result_final' && withdrawId) {
      interval = setInterval(() => checkWithdrawStatus(), 2000);
    }
    return () => clearInterval(interval);
  }, [view, withdrawId]);

  // --- EFFECT: DONATION SUCCESS ---
  useEffect(() => {
    if (view === 'donate' && isDonationSuccess) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#FFA500', '#ffffff', '#FF4500'] });
      const timer = setTimeout(() => { setIsDonationSuccess(false); setDonationInvoice(''); setView('dashboard'); }, 3500);
      return () => clearTimeout(timer);
    }
  }, [view, isDonationSuccess]);

  // --- LOGIC: DATA FETCHING ---
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
    
    // 2. Open Games (Lobby & Challenges)
    const { data: allOpen } = await supabase.from('duels').select('*').eq('status', 'open').order('created_at', { ascending: false });
    if (allOpen) {
      setPublicDuels(allOpen.filter(d => !d.target_player || d.target_player.trim() === ''));
      setTargetedDuels(allOpen.filter(d => d.target_player === user.name));
    } else {
      setPublicDuels([]); setTargetedDuels([]);
    }

    // 3. My History
    const { data: myHistory } = await supabase.from('duels').select('*').or(`creator.eq.${user.name},challenger.eq.${user.name}`).order('created_at', { ascending: false });
    if (myHistory) {
      setMyDuels(myHistory);
      const finishedCount = myHistory.filter(d => d.status === 'finished').length;
      setStats(prev => ({ ...prev, total: finishedCount, losses: finishedCount - prev.wins }));
    } else {
      setMyDuels([]);
    }
  };

  const checkPaymentStatus = async () => { 
    if (!invoice.hash) return; 
    try { 
      const res = await fetch(`${LNBITS_URL}/api/v1/payments/${invoice.hash}?ts=${Date.now()}`, { headers: { 'X-Api-Key': INVOICE_KEY } }); 
      const data = await res.json(); 
      if (data.paid === true || data.status === 'success') { setCheckingPayment(true); setView('pre_game'); } 
    } catch(e) {} 
  };

  const checkWithdrawStatus = async () => { if (!withdrawId) return; try { const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links/${withdrawId}`, { headers: { 'X-Api-Key': INVOICE_KEY } }); const data = await res.json(); if (data.used >= 1 || data.spent === true) { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); setTimeout(() => { setView('dashboard'); resetGameState(); setWithdrawId(''); }, 2000); } } catch(e) {} };
  const handleManualCheck = async () => { setManualCheckLoading(true); await checkPaymentStatus(); setTimeout(() => setManualCheckLoading(false), 1000); };
  
  const resetGameState = () => { 
    setWithdrawLink(''); setWithdrawId(''); setScore(0); setTotalTime(0); setCurrentQ(0); 
    setInvoice({ req: '', hash: '', amount: 0 }); setSelectedAnswer(null); setInvoiceCopied(false); setWithdrawCopied(false); setIsProcessingGame(false); setIsClaiming(false); setDashboardView('home'); 
  };
  
  const startChallenge = (target) => { setChallengePlayer(target); resetGameState(); setWager(''); setView('create_setup'); };
  const openCreateSetup = () => { setChallengePlayer(null); resetGameState(); setWager(''); setView('create_setup'); };
  
  const submitCreateDuel = async () => { 
    const val = Number(wager);
    if (!wager || val <= 0) { alert("Bitte einen Einsatz wählen!"); return; }
    if (val > 9999) { alert("Maximal 9999 Sats erlaubt!"); return; } 
    const gameConfig = generateGameData(allQuestions); 
    setGameData(gameConfig); setRole('creator'); await fetchInvoice(val); 
  };
  
  const initJoinDuel = async (duel) => { 
    resetGameState(); setActiveDuel(duel); 
    const rawQuestions = duel.questions;
    let safeGameData = Array.isArray(rawQuestions) ? rawQuestions : [];
    if (safeGameData.length > 0 && typeof safeGameData[0] === 'number') { safeGameData = safeGameData.map(id => ({ id: id, order: [0, 1, 2, 3] })); } 
    setGameData(safeGameData); setRole('challenger'); await fetchInvoice(duel.amount); 
  };

  const handleRefund = async (duel) => {
    if (!confirm("Einsatz wirklich zurückfordern?")) return;
    try {
      const res = await fetch('/api/refund', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: duel.amount, duelId: duel.id, reason: 'timeout' }) });
      const data = await res.json();
      if (data.lnurl) { setWithdrawLink(data.lnurl); setWithdrawId(data.id); await supabase.from('duels').update({ status: 'refunded' }).eq('id', duel.id); setView('result_final'); } else { alert("Fehler beim Erstellen des Refunds."); }
    } catch (e) { console.error(e); alert("Verbindungsfehler"); }
  };

  const fetchInvoice = async (amountSat) => {
    try { const res = await fetch(`${LNBITS_URL}/api/v1/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY }, body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell`, expiry: 600 }) }); const data = await res.json(); setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat }); setCheckingPayment(false); setView('payment'); } catch (e) { alert("LNbits Error"); setView('dashboard'); }
  };

  const startGame = () => { setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15.0); setSelectedAnswer(null); setIsProcessingGame(false); setView('game'); };

  const handleAnswer = (displayIndex) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(displayIndex);
    setTotalTime(prev => prev + (15.0 - timeLeft)); 
    const roundConfig = gameData[currentQ];
    if (!roundConfig || !allQuestions[roundConfig.id]) {
       setTimeout(() => { if (currentQ < 4) { setCurrentQ(p => p + 1); setTimeLeft(15.0); setSelectedAnswer(null); } else { finishGameLogic(score); } }, 500); return;
    }
    const originalIndex = roundConfig.order[displayIndex];
    const correctIndex = allQuestions[roundConfig.id].correct;
    const isCorrect = (originalIndex === correctIndex);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => { if (currentQ < 4) { setCurrentQ(p => p + 1); setTimeLeft(15.0); setSelectedAnswer(null); } else { finishGameLogic(isCorrect ? score + 1 : score); } }, 2000);
  };

  const finishGameLogic = async (finalScore = score) => {
    if (isProcessingGame) return; setIsProcessingGame(true);
    const cleanTime = parseFloat((totalTime || 0).toFixed(1));
    try {
      if (role === 'creator') {
        const { error } = await supabase.from('duels').insert([{ creator: user.name, creator_score: finalScore, creator_time: cleanTime, questions: gameData, status: 'open', amount: invoice.amount, target_player: challengePlayer }]);
        if (error) throw error;
        setView('dashboard');
      } else {
        const { data, error } = await supabase.from('duels').update({ challenger: user.name, challenger_score: finalScore, challenger_time: cleanTime, status: 'finished' }).eq('id', activeDuel.id).select();
        if (error) throw error;
        if (data && data.length > 0) { setActiveDuel(data[0]); setView('result_final'); } else { throw new Error("Fehler beim Laden des Spielstatus"); }
      }
    } catch (e) { console.error(e); alert("Speicherfehler: " + (e.message || JSON.stringify(e))); setIsProcessingGame(false); }
  };

  const openPastDuel = (duel) => { setActiveDuel(duel); const myRole = duel.creator === user.name ? 'creator' : 'challenger'; setRole(myRole); determineWinner(duel); };
  const determineWinner = async (duel) => { if (duel.status === 'refunded') { setView('result_final'); return; } setView('result_final'); };
  
  const handleClaimReward = async () => {
    if (isClaiming) return; setIsClaiming(true);
    try {
        const res = await fetch('/api/claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: activeDuel.amount, duelId: activeDuel.id }) });
        const data = await res.json();
        if (res.status !== 200) { alert("Auszahlungsfehler: " + (data.details || data.error || "Unbekannter Fehler")); } else if (data.lnurl) { setWithdrawLink(data.lnurl); setWithdrawId(data.id); setActiveDuel(prev => ({...prev, claimed: true})); confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }
    } catch (e) { console.error("Claim Error:", e); alert("Verbindungsfehler: " + e.message); } finally { setIsClaiming(false); }
  };

  const handleLogout = () => { localStorage.clear(); setUser(null); setView('language_select'); };
  
  const handleSmartLogin = async (e) => {
    if (e) e.preventDefault(); setLoginError(''); setIsLoginLoading(true);
    const input = loginInput.trim();
    let pubkeyFromInput = null; let nameFromInput = null;
    if (loginPin.length < 4) { setLoginError(txt('login_error_pin')); setIsLoginLoading(false); return; }
    if (input.startsWith('npub1')) { try { const { type, data } = nip19.decode(input); if (type === 'npub') pubkeyFromInput = data; } catch (err) { setLoginError("Invalid NPUB"); setIsLoginLoading(false); return; } } else { nameFromInput = input.toLowerCase(); if (nameFromInput.length < 3) { setLoginError(txt('login_error_name')); setIsLoginLoading(false); return; } }
    try {
      const hashedPin = await hashPin(loginPin);
      let query = supabase.from('players').select('*');
      if (pubkeyFromInput) query = query.eq('pubkey', pubkeyFromInput); else query = query.eq('name', nameFromInput);
      const { data: existingUser } = await query.single();
      if (existingUser) { if (existingUser.pin === hashedPin) { finishLogin(existingUser.name, existingUser.pubkey, existingUser.is_admin); } else { setLoginError(txt('login_error_wrong_pin')); } } else {
        if (pubkeyFromInput) { localStorage.setItem('temp_nostr_pin', hashedPin); setNostrSetupPubkey(pubkeyFromInput); setIsLoginLoading(false); setView('nostr_setup'); } 
        else { const { data: nameTaken } = await supabase.from('players').select('*').eq('name', nameFromInput).single(); if(nameTaken) { setLoginError(txt('login_error_taken')); setIsLoginLoading(false); return; } await supabase.from('players').insert([{ name: nameFromInput, pin: hashedPin }]); finishLogin(nameFromInput, null, false); }
      }
    } catch (err) { console.error(err); setLoginError("Error."); } finally { if (!nostrSetupPubkey) setIsLoginLoading(false); }
  };
  
  const handleExtensionLogin = async () => { if (!window.nostr) return alert("Keine Nostr Extension!"); try { const pubkey = await window.nostr.getPublicKey(); const { data: existingUser } = await supabase.from('players').select('*').eq('pubkey', pubkey).single(); if (existingUser) finishLogin(existingUser.name, pubkey, existingUser.is_admin); else { setNostrSetupPubkey(pubkey); setView('nostr_setup'); } } catch (e) { console.error(e); } };
  
  const completeNostrRegistration = async (e) => { if(e) e.preventDefault(); const cleanName = nostrSetupName.trim().toLowerCase(); if (cleanName.length < 3) return; const pinToSave = localStorage.getItem('temp_nostr_pin') || 'nostr-auth'; await supabase.from('players').insert([{ name: cleanName, pubkey: nostrSetupPubkey, pin: pinToSave }]); localStorage.removeItem('temp_nostr_pin'); finishLogin(cleanName, nostrSetupPubkey, false); };
  
  const handleUpdatePin = async () => { if (newPin.length < 4) { setSettingsMsg(txt('login_error_pin')); return; } try { const hashed = await hashPin(newPin); await supabase.from('players').update({ pin: hashed }).eq('name', user.name); setSettingsMsg(txt('settings_saved')); localStorage.setItem('saved_pin', newPin); setTimeout(() => { setNewPin(''); setSettingsMsg(''); }, 1500); } catch (e) { setSettingsMsg("Error saving."); } };
  
  const toggleNotifications = async () => { if (!notificationsEnabled) { const permission = await Notification.requestPermission(); if (permission === 'granted') setNotificationsEnabled(true); } else { setNotificationsEnabled(false); } };
  
  const previewLanguage = (l) => { setLang(l); };
  
  const acceptDisclaimer = () => { localStorage.setItem('satoshi_lang', lang); if (localStorage.getItem('satoshi_user')) { setUser(JSON.parse(localStorage.getItem('satoshi_user'))); checkPendingJoinAfterAuth(JSON.parse(localStorage.getItem('satoshi_user'))); } else { setView('login'); } };
  
  const shareDuel = async (duel) => { const shareText = `${MAIN_DOMAIN}/?join=${duel.id}`; navigator.clipboard.writeText(shareText); alert(txt('share_success')); };

  // --- ADMIN LOGIC ---
  const fetchAdminData = async () => {
    if (!user.isAdmin) return;
    const { data } = await supabase.from('duels').select('*').order('created_at', { ascending: false });
    if (data) setAdminDuels(data);
  };

  // --- VIEWS ---

  if (view === 'loading_data') {
    return (
      <Background>
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2 size={48} className="text-orange-500 animate-spin"/>
          <p className="text-white mt-4 font-bold uppercase tracking-widest">Lade Daten...</p>
        </div>
      </Background>
    );
  }

  if (view === 'language_select') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col items-center justify-center min-h-[90vh] px-4 gap-6 animate-float">
          <h1 className="text-4xl font-black text-white italic uppercase drop-shadow-md">SATOSHI<span className="text-orange-500">DUELL</span></h1>
          <div className="flex gap-4 mb-2">
            <button onClick={() => previewLanguage('de')} className="text-3xl p-3 border-white/10 border bg-black/40 rounded-xl">🇩🇪</button>
            <button onClick={() => previewLanguage('en')} className="text-3xl p-3 border-white/10 border bg-black/40 rounded-xl">🇺🇸</button>
            <button onClick={() => previewLanguage('es')} className="text-3xl p-3 border-white/10 border bg-black/40 rounded-xl">🇪🇸</button>
          </div>
          <Button variant="primary" onClick={acceptDisclaimer}>{txt('btn_understood')}</Button>
        </div>
      </Background>
    );
  }

  if (view === 'login') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 px-4 py-10 text-center">
          <h1 className="text-4xl font-black text-white italic">LOGIN</h1>
          <form onSubmit={handleSmartLogin} className="flex flex-col gap-4">
            <input type="text" placeholder={txt('login_placeholder')} value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-orange-500 text-center"/>
            <input type="password" placeholder="PIN" value={loginPin} onChange={(e) => setLoginPin(e.target.value)} className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-orange-500 text-center"/>
            {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
            <Button variant="primary" onClick={handleSmartLogin} disabled={isLoginLoading}>{isLoginLoading ? <Loader2 className="animate-spin mx-auto"/> : "GO"}</Button>
          </form>
          <Button variant="secondary" onClick={handleExtensionLogin}><Fingerprint size={18}/> Nostr Login</Button>
          <button onClick={() => setView('language_select')} className="text-neutral-500 text-xs mt-4">BACK</button>
        </div>
      </Background>
    );
  }

  if (view === 'nostr_setup') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 px-4 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">NOSTR SETUP</h2>
          <input type="text" placeholder="GAMERTAG" value={nostrSetupName} onChange={(e) => setNostrSetupName(e.target.value)} className="p-4 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-orange-500 text-center"/>
          <Button variant="primary" onClick={completeNostrRegistration}>OK</Button>
          <button onClick={() => setView('login')} className="text-xs text-neutral-600">Zurück</button>
        </div>
      </Background>
    );
  }

  if (view === 'donate') {
    if (isDonationSuccess) {
      return (
        <Background>
          <div className="flex flex-col items-center justify-center h-screen">
            <Heart size={120} className="text-green-500 animate-bounce"/>
            <h2 className="text-4xl font-black text-white mt-4">DANKE!</h2>
          </div>
        </Background>
      );
    }
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col gap-6 px-4 py-10 text-center">
          <Heart size={48} className="text-orange-500 mx-auto"/>
          <h2 className="text-2xl font-black text-white">{txt('donate_title')}</h2>
          {!donationInvoice ? (
            <div className="flex flex-col gap-4">
              <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(Number(e.target.value))} className="p-4 bg-black/40 text-white text-center border border-white/10 rounded-xl"/>
              <Button variant="primary" onClick={handleGenerateDonation} disabled={isDonationLoading}>Generieren</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-white p-4 rounded-xl mx-auto"><QRCodeCanvas value={`lightning:${donationInvoice}`} size={220}/></div>
              <Button variant="secondary" onClick={() => window.location.href = `lightning:${donationInvoice}`}>Wallet öffnen</Button>
              <button onClick={handleConfirmDonation} className="text-green-500 font-bold uppercase text-xs">Gesendet!</button>
            </div>
          )}
          <button onClick={() => setView('dashboard')} className="text-xs text-neutral-600 uppercase font-bold">Zurück</button>
        </div>
      </Background>
    );
  }

  // --- DASHBOARD ROUTER ---
  if (view === 'dashboard') {
    const publicCount = (publicDuels||[]).filter(d => d.creator !== user.name).length;
    const challengeCount = (targetedDuels||[]).length;
    const myOpenDuels = (myDuels||[]).filter(d => d.creator === user.name && d.status === 'open');

    if (dashboardView === 'home') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <Card className="flex justify-between items-center py-3 border-orange-500/20 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center font-black text-black text-xl">{user.name.charAt(0).toUpperCase()}</div>
                <div className="text-left"><p className="font-bold text-white text-sm uppercase">{formatName(user.name)}</p><p className="text-[10px] text-orange-400 font-mono">{stats.satsWon.toLocaleString()} Sats</p></div>
              </div>
              <div className="flex gap-2"><button onClick={() => setDashboardView('settings')}><Settings size={18} className="text-neutral-500"/></button><button onClick={handleLogout}><LogOut size={18} className="text-neutral-500"/></button></div>
            </Card>
            <Button onClick={openCreateSetup} className="py-5 text-lg animate-neon shadow-lg mb-2"><Plus size={24}/> {txt('dashboard_new_duel')}</Button>
            
            <div className="grid grid-cols-2 gap-1 flex-1 overflow-y-auto pb-4">
              <button onClick={() => setDashboardView('lobby')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] relative hover:bg-neutral-800 transition-all">
                <Users size={28} className="text-orange-500"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_lobby')}</span>
                {publicCount > 0 && <span className="absolute top-2 right-2 bg-orange-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{publicCount}</span>}
              </button>
              
              <button onClick={() => setDashboardView('challenges')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] relative hover:bg-neutral-800 transition-all">
                <Swords size={28} className="text-purple-500"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_challenges')}</span>
                {challengeCount > 0 && <span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{challengeCount}</span>}
              </button>
              
              <button onClick={() => setDashboardView('active_games')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] relative hover:bg-neutral-800 transition-all">
                <PlayCircle size={28} className="text-green-500"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_active_games')}</span>
                {myOpenDuels.length > 0 && <span className="absolute top-2 right-2 bg-green-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{myOpenDuels.length}</span>}
              </button>
              
              <button onClick={() => setDashboardView('history')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] hover:bg-neutral-800 transition-all">
                <History size={28} className="text-blue-500"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_history')}</span>
              </button>
              
              <button onClick={() => setDashboardView('leaderboard')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] hover:bg-neutral-800 transition-all">
                <Trophy size={28} className="text-yellow-500"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_leaderboard')}</span>
              </button>
              
              <button onClick={() => setDashboardView('settings')} className="bg-neutral-900/60 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-[4/3] hover:bg-neutral-800 transition-all">
                <Settings size={28} className="text-neutral-400"/>
                <span className="text-[10px] font-bold text-neutral-300 uppercase">{txt('tile_settings')}</span>
              </button>
            </div>
            
            <button onClick={openDonation} className="w-full py-2 mb-2 bg-neutral-900 border border-white/5 rounded-xl text-neutral-500 text-[10px] font-bold uppercase flex items-center justify-center gap-2"><Heart size={12}/> Donate</button>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'lobby') {
      const list = (publicDuels||[]).filter(d => d.creator !== user.name);
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-white uppercase">{txt('tile_lobby')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {list.length === 0 && <div className="text-center py-20 text-neutral-600 italic">Keine Duelle.</div>}
              {list.map(d => (
                <div key={d.id} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <div><p className="font-bold text-white text-sm">{formatName(d.creator)}</p><p className="text-xs text-orange-400 font-mono">{d.amount} sats</p></div>
                  <button onClick={() => initJoinDuel(d)} className="bg-orange-500 text-black px-4 py-2 rounded-lg text-xs font-black">FIGHT</button>
                </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'challenges') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-white uppercase">{txt('tile_challenges')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {(targetedDuels||[]).map(d => (
                <div key={d.id} className="bg-purple-500/10 p-4 rounded-2xl flex justify-between items-center border border-purple-500/50">
                  <div><p className="font-bold text-white text-sm">{formatName(d.creator)}</p><p className="text-xs text-purple-300 font-mono">{d.amount} sats</p></div>
                  <button onClick={() => initJoinDuel(d)} className="bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-black">ACCEPT</button>
                </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'active_games') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-green-500 uppercase">{txt('tile_active_games')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {myOpenDuels.map(d => {
                 const canRefund = (Date.now() - new Date(d.created_at).getTime() > REFUND_TIMEOUT_MS);
                 return (
                    <div key={d.id} className="bg-neutral-900/80 border border-green-500/30 p-4 rounded-xl flex flex-col gap-3">
                       <div className="flex justify-between items-center">
                          <div className="flex flex-col"><span className="text-green-500 font-black">{d.amount} Sats</span><span className="text-neutral-500 text-[10px] uppercase">{d.target_player ? `Sent to ${formatName(d.target_player)}` : "Waiting in Lobby"}</span></div>
                          {canRefund ? <button onClick={() => handleRefund(d)} className="bg-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase">REFUND</button> : <span className="animate-pulse text-green-500/50 uppercase font-black text-[10px]">AKTIV</span>}
                       </div>
                       {!canRefund && <button onClick={() => shareDuel(d)} className="w-full bg-green-500/10 text-green-500 py-3 rounded-lg flex items-center justify-center gap-2"><LinkIcon size={16}/><span className="text-xs font-black uppercase">SHARE</span></button>}
                    </div>
                 );
              })}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'history') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-blue-400 uppercase">{txt('tile_history')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {(myDuels||[]).map(d => (
                <div key={d.id} className="bg-neutral-900/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div className="text-left"><p className="text-neutral-400 font-bold uppercase text-xs">vs {d.creator === user.name ? formatName(d.challenger || "???") : formatName(d.creator)}</p><p className="text-[10px] font-mono text-orange-500">{d.amount} sats</p></div>
                  {d.status === 'finished' ? <button onClick={() => openPastDuel(d)} className="text-orange-500 font-black uppercase text-[10px] bg-orange-500/10 px-3 py-1 rounded">DETAILS</button> : <span className="text-neutral-500 text-[10px]">{d.status}</span>}
                </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'leaderboard') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-yellow-500 uppercase">{txt('tile_leaderboard')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {leaderboard.map((p, i) => (
                <div key={p.name} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3"><span className="font-mono font-bold text-yellow-500">{i + 1}</span><div className="flex flex-col"><span className="text-white font-bold uppercase text-sm">{formatName(p.name)}</span><span className="text-orange-400 font-mono text-[10px]">{p.satsWon} sats</span></div></div>
                  {p.name !== user.name && <button onClick={() => startChallenge(p.name)} className="text-neutral-500 hover:text-white p-2"><Swords size={18}/></button>}
                </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'settings') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-neutral-400 uppercase">{txt('tile_settings')}</h2></div>
            
            <div className="flex-1 overflow-y-auto space-y-4 px-2">
               
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4 text-orange-500"><Bell size={20}/><span className="text-sm font-bold uppercase">{txt('settings_notifications')}</span></div>
                  <div className="flex justify-between items-center">
                     <p className="text-neutral-400 text-xs">{txt('settings_notifications_desc')}</p>
                     <button onClick={toggleNotifications} className={`w-12 h-6 rounded-full p-1 transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-neutral-700'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                     </button>
                  </div>
                  {!notificationsEnabled && <p className="text-[10px] text-neutral-600 mt-2 italic">{txt('perm_request')}</p>}
               </div>

               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4 text-blue-500"><Shield size={20}/><span className="text-sm font-bold uppercase">{txt('settings_security')}</span></div>
                  <p className="text-neutral-400 text-xs mb-3">{txt('settings_change_pin')}</p>
                  <div className="flex gap-2">
                     <input type="password" placeholder="****" value={newPin} onChange={(e) => setNewPin(e.target.value)} className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white text-center font-bold outline-none focus:border-blue-500"/>
                     <button onClick={handleUpdatePin} className="bg-blue-500 text-white px-4 rounded-xl"><Save size={18}/></button>
                  </div>
                  {settingsMsg && <p className={`text-xs font-bold mt-2 ${settingsMsg.includes('!') ? 'text-green-500' : 'text-red-500'}`}>{settingsMsg}</p>}
               </div>

               {/* BUTTON FÜR FRAGE EINREICHEN */}
               <button onClick={() => setView('submit_question')} className="w-full bg-purple-900/50 border border-purple-500/50 p-4 rounded-2xl flex items-center justify-center gap-2 text-purple-300 font-bold uppercase text-xs hover:bg-purple-900 hover:text-white transition-all">
                 <Plus size={16}/> Eigene Frage einreichen
               </button>

               {/* ADMIN BUTTON */}
               {user.isAdmin && (
                 <button onClick={() => { fetchAdminData(); setDashboardView('admin'); }} className="w-full bg-red-900/50 border border-red-500/50 p-4 rounded-2xl flex items-center justify-center gap-2 text-red-300 font-bold uppercase text-xs hover:bg-red-900 hover:text-white transition-all mt-4">
                   <Shield size={16}/> {txt('admin_title')}
                 </button>
               )}

            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'admin') {
      const filteredDuels = (adminDuels||[]).filter(d => {
         const match = d.creator.includes(adminSearch) || d.id.includes(adminSearch);
         if (adminFilter === 'open') return match && d.status === 'open';
         if (adminFilter === 'finished') return match && d.status !== 'open';
         return match;
      });
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            
            {/* Header */}
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('settings')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-red-500 uppercase">{txt('admin_title')}</h2></div>
            
            {/* Stats Dashboard */}
            <div className="grid grid-cols-3 gap-2 mb-2">
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_total')}</div><div className="text-white font-mono font-bold text-lg">{totalGames}</div></div>
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_open')}</div><div className="text-orange-500 font-mono font-bold text-lg">{openGames}</div></div>
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_volume')}</div><div className="text-green-500 font-mono font-bold text-xs mt-1">{totalVolume.toLocaleString()}</div></div>
            </div>

            {/* BUTTON ZUM FRAGEN MANAGER */}
            <div className="mb-2">
              <button 
                onClick={() => setView('admin_questions')}
                className="w-full bg-orange-500/10 border border-orange-500/50 p-3 rounded-xl flex items-center justify-center gap-2 text-orange-500 font-bold uppercase text-xs hover:bg-orange-500 hover:text-black transition-all"
              >
                <Edit2 size={16}/> Fragen bearbeiten / hinzufügen
              </button>
            </div>

            {/* Suche & Filter */}
            <div className="flex gap-2 mb-2">
               <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-3 text-neutral-500"/>
                  <input type="text" placeholder={txt('admin_search_placeholder')} value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-red-500"/>
               </div>
               <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                  <button onClick={() => setAdminFilter('all')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'all' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_all')}</button>
                  <button onClick={() => setAdminFilter('open')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'open' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_open')}</button>
                  <button onClick={() => setAdminFilter('finished')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'finished' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_finished')}</button>
               </div>
            </div>

            {/* Liste */}
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {filteredDuels.length === 0 && <p className="text-center text-neutral-600 text-xs italic py-10">Keine Ergebnisse</p>}
              {filteredDuels.map(d => {
                 return (
                   <div key={d.id} className="bg-neutral-900/80 border border-white/5 p-3 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="font-mono text-[10px] text-neutral-500">ID: {d.id}</span>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${d.status === 'open' ? 'bg-orange-500/20 text-orange-500' : d.status === 'finished' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{d.status.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                               {d.creator} <span className="text-neutral-600 text-[10px] font-normal">vs</span> {d.challenger || '?'}
                            </div>
                            <div className="text-[10px] text-neutral-400 mt-1">
                               Score: <span className="font-mono text-white">{d.creator_score ?? '-'}</span> : <span className="font-mono text-white">{d.challenger_score ?? '-'}</span>
                            </div>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className="font-mono text-xs text-white font-bold">{d.amount} sats</span>
                            {d.status === 'finished' && (
                               d.claimed ? <span className="text-[8px] text-yellow-500 font-bold mt-1">PAID OUT</span> : <span className="text-[8px] text-neutral-500 mt-1">UNCLAIMED</span>
                            )}
                         </div>
                      </div>
                   </div>
                 );
              })}
            </div>
          </div>
        </Background>
      );
    }
  }

  // --- ADMIN QUESTIONS MANAGER VIEW ---
  if (view === 'admin_questions') {
    return (
      <Background>
        <div className="w-full max-w-2xl flex flex-col h-[95vh] gap-4 px-4 mx-auto">
           <AdminQuestionManager onBack={() => { setView('dashboard'); setDashboardView('admin'); }} />
        </div>
      </Background>
    );
  }

  // --- SUBMIT QUESTION VIEW ---
  if (view === 'submit_question') {
    return (
      <Background>
        <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-4 mx-auto py-6">
           <SubmitQuestion user={user} onBack={() => setView('dashboard')} />
        </div>
      </Background>
    );
  }

  // --- PRE_GAME VIEW ---
  if (view === 'pre_game') {
     if (!checkingPayment) { confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } }); }
     return (
       <Background>
          <div className="w-full max-w-sm flex flex-col gap-6 animate-float text-center px-4 items-center justify-center min-h-[60vh]">
             <div className="relative"><div className="absolute inset-0 bg-green-500 blur-[50px] opacity-40 rounded-full animate-pulse"></div><CheckCircle size={100} className="text-green-500 relative animate-bounce" /></div>
             <div className="space-y-2"><h2 className="text-3xl font-black text-white uppercase drop-shadow-lg">{txt('pre_game_title')}</h2><p className="text-neutral-400 text-sm font-bold uppercase tracking-widest">{txt('pre_game_text')}</p></div>
             <Button variant="primary" onClick={startGame} className="animate-neon mt-8"><Rocket size={20} className="mr-2" />{txt('btn_ready')}</Button>
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
          <input type="number" max="9999" value={wager} onChange={(e) => setWager(e.target.value)} placeholder="0" className="text-6xl font-black text-orange-500 font-mono text-center bg-transparent w-full outline-none mb-10 placeholder:text-neutral-800"/>
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
          <div className="my-4 flex justify-center">
             <button onClick={() => { navigator.clipboard.writeText(invoice.req); setInvoiceCopied(true); setTimeout(() => setInvoiceCopied(false), 2000); }} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/5">
               {invoiceCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {txt('btn_copy_invoice')}
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
    const questionData = allQuestions[questionID]?.[lang]; // Safe Access
    
    // SAFE GUARD 1: Fehlende Frage
    if (!questionData) {
       return (
         <Background>
           <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4 text-center">
             <AlertTriangle size={64} className="text-red-500 mx-auto mb-4"/>
             <h3 className="text-xl font-bold text-white mb-2">Fehler beim Laden der Frage</h3>
             <p className="text-neutral-400 text-xs mb-8">Diese Frage existiert nicht mehr in der Datenbank. Das Spiel wird beendet.</p>
             <Button onClick={() => finishGameLogic(score)}>Trotzdem beenden</Button>
           </div>
         </Background>
       );
    }

    const originalOptions = questionData.options;
    const correctIndex = allQuestions[questionID].correct;

    return (
      <Background>
        <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4">
          <div className="flex justify-between items-end mb-4 px-1"><span className="text-xs font-bold text-neutral-500 uppercase">{txt('game_q')} {currentQ + 1}/5</span><span className={`text-4xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_red]' : 'text-white'}`}>{timeLeft.toFixed(1)}</span></div>
          <div className="w-full h-2 bg-neutral-900 rounded-full mb-10 overflow-hidden"><div className="h-full bg-orange-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div></div>
          <h3 className="text-2xl font-bold text-white text-center mb-10 min-h-[100px]">"{questionData.q}"</h3>
          <div className="grid gap-3">{[0,1,2,3].map((displayIndex) => { const originalOptionIndex = shuffledOrder[displayIndex]; const optionText = originalOptions[originalOptionIndex]; let btnClass = "bg-neutral-900/50 hover:bg-orange-500 border-white/10"; const isCorrect = originalOptionIndex === correctIndex; const isSelected = selectedAnswer === displayIndex; if (selectedAnswer !== null) { if (isCorrect) btnClass = "bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"; else if (isSelected) btnClass = "bg-red-500 text-white border-red-500"; else btnClass = "opacity-30 border-transparent"; } return (<button key={`${currentQ}-${displayIndex}`} onClick={() => handleAnswer(displayIndex)} disabled={selectedAnswer !== null} className={`border p-5 rounded-2xl text-left transition-all active:scale-[0.95] flex items-center gap-4 ${btnClass}`}><span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selectedAnswer !== null && isCorrect ? 'bg-black text-green-500' : 'bg-neutral-800 text-neutral-400'}`}>{String.fromCharCode(65 + displayIndex)}</span><span className="font-bold text-lg text-neutral-200">{optionText}</span></button>); })}</div>
          
          {/* LADE-OVERLAY BEIM SPEICHERN */}
          {isProcessingGame && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-in fade-in">
                <Loader2 size={64} className="text-orange-500 animate-spin mb-4"/>
                <p className="text-white font-black text-xl animate-pulse">FINISHING...</p>
            </div>
          )}
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

    // SAFE GUARD 2: Prüfen ob Daten da sind
    if (!activeDuel) return <Background><div className="text-white text-center mt-20">Lade Ergebnisse...</div></Background>;

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
         <div className="w-full max-w-sm text-center mt-10">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ring-4 ring-offset-4 ring-offset-black ${won && isFinished ? "bg-green-500 ring-green-500" : "bg-red-500 ring-red-500"}`}>{won && isFinished ? <Trophy size={48} className="text-black animate-bounce"/> : <Flame size={48} className="text-black"/>}</div>
            <h2 className={`text-5xl font-black mb-10 uppercase ${won && isFinished ? "text-green-500" : "text-red-500"}`}>{!isFinished ? txt('result_wait') : won ? txt('result_win') : txt('result_loss')}</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <Card className="p-4 bg-white/5 border-orange-500/30"><p className="text-[10px] font-bold text-neutral-500 uppercase">Du</p><p className="text-4xl font-black text-white font-mono">{myS}</p><p className="text-[10px] text-neutral-500 italic">{myT?.toFixed(1)}s</p></Card>
              <Card className="p-4 bg-white/5 opacity-50"><p className="text-[10px] font-bold text-neutral-500 uppercase">Gegner</p><p className="text-4xl font-black text-white font-mono">{duel.status === 'finished' ? opS : '?'}</p><p className="text-[10px] text-neutral-500 italic">{duel.status === 'finished' ? (typeof opT === 'number' ? opT.toFixed(1) + 's' : opT) : 'läuft...'}</p></Card>
            </div>
            
            {/* MANUELLER CLAIM BUTTON - DER FIX! */}
            {isFinished && won && !duel.claimed && !withdrawLink && (
             <div className="flex flex-col gap-2">
                <div className="bg-orange-500/10 border border-orange-500/50 p-2 rounded-xl mb-2 text-orange-400 text-[10px] font-black uppercase tracking-widest">JACKPOT: {duel.amount * 2} SATS</div>
                <Button onClick={handleClaimReward} disabled={isClaiming} className="bg-green-500 text-black animate-pulse">
                  {isClaiming ? <Loader2 className="animate-spin mx-auto"/> : `${txt('btn_withdraw')} (${duel.amount * 2} Sats)`}
                </Button>
             </div>
            )}

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