import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Zap, Trophy, Clock, User, Plus, Swords, RefreshCw, Copy, Check,
  ExternalLink, AlertTriangle, Loader2, LogOut, Fingerprint, Flame,
  History, Coins, Lock, Medal, Share2, Globe, Settings, Save, Heart,
  Github, CheckCircle, RefreshCcw, Rocket, ArrowLeft, Users, AlertCircle,
  Bell, Shield, Search, Link as LinkIcon, PlayCircle, Edit2, 
  Volume2, VolumeX, Smartphone, Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import { nip19 } from 'nostr-tools';

// --- EIGENE IMPORTS ---
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

const MAIN_DOMAIN = "https://satoshiduell.vercel.app"; 

// --- SUPABASE CLIENT ---
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const REFUND_TIMEOUT_MS = 3 * 24 * 60 * 60 * 1000; 

// --- HELPER COMPONENT (Hier definiert, damit sie verfügbar ist) ---
const DashboardTile = ({ title, icon, color, count, onClick }) => {
  const colorClasses = {
    blue: 'border-blue-500/50 hover:bg-blue-500/10 text-blue-500',
    orange: 'border-orange-500/50 hover:bg-orange-500/10 text-orange-500',
    red: 'border-red-500/50 hover:bg-red-500/10 text-red-500',
    green: 'border-green-500/50 hover:bg-green-500/10 text-green-500',
    neutral: 'border-white/10 hover:bg-white/5 text-neutral-400',
    yellow: 'border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-500',
    purple: 'border-purple-500/50 hover:bg-purple-500/10 text-purple-500',
  };

  const activeClass = colorClasses[color] || colorClasses.neutral;

  return (
    <button 
      onClick={onClick} 
      className={`relative p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all active:scale-95 bg-neutral-900/60 aspect-[4/3] group ${activeClass}`}
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-center shadow-black drop-shadow-md">{title}</span>
      
      {count > 0 && (
        <div className={`absolute top-2 right-2 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border border-white/20 shadow-lg ${color === 'neutral' ? 'bg-white text-black' : 'bg-current text-black'}`}>
          <span className="text-white mix-blend-difference">{count}</span>
        </div>
      )}
    </button>
  );
};

// --- HELPER FUNKTIONEN ---

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const formatName = (name) => {
  if (!name) return '';
  if (name.length <= 14) return name.toUpperCase();
  return (name.substring(0, 6) + '...' + name.substring(name.length - 4)).toUpperCase();
};

const fetchNostrImage = async (pubkey) => {
  if (!pubkey) return null;
  try {
    const res = await fetch(`https://api.nostr.band/v0/profile/${pubkey}`);
    const data = await res.json();
    return data?.profile?.picture || null;
  } catch (e) {
    console.error("Nostr img error", e);
    return null;
  }
};

const getRobotAvatar = (name) => {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${name}`;
};

const playSound = (type, muted = false) => {
  if (navigator.vibrate) {
    if (type === 'click') navigator.vibrate(10);
    if (type === 'correct') navigator.vibrate([50, 50, 50]);
    if (type === 'wrong') navigator.vibrate(200);
    if (type === 'win') navigator.vibrate([100, 50, 100, 50, 200]);
  }

  if (muted) return;

  let file = '';
  if (type === 'click') file = '/click.mp3';
  if (type === 'correct') file = '/correct.mp3';
  if (type === 'wrong') file = '/wrong.mp3';

  if (file) {
    const audio = new Audio(file);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play error", e));
  }
};

// --- HAUPT APP ---

export default function App() {
  // --- STATE MANAGEMENT ---
  const tickRef = useRef(null); 
  
  const [view, setView] = useState('loading_data'); 
  const [dashboardView, setDashboardView] = useState('home'); 
  
  const [lang, setLang] = useState('de'); 
  const [user, setUser] = useState(null);

  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('satoshi_muted') === 'true');

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('satoshi_muted', newState);
  };
  
  const [allQuestions, setAllQuestions] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Login
  const [loginInput, setLoginInput] = useState(''); 
  const [loginPin, setLoginPin] = useState(''); 
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Settings & Notifications
  const [newPin, setNewPin] = useState('');
  const [settingsMsg, setSettingsMsg] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Admin Data & Search
  const [adminDuels, setAdminDuels] = useState([]);
  const [adminSearch, setAdminSearch] = useState(''); 
  const [adminFilter, setAdminFilter] = useState('all'); 
  
  // Nostr
  const [nostrSetupPubkey, setNostrSetupPubkey] = useState(null);
  const [nostrSetupName, setNostrSetupName] = useState('');
  
  // Game & Lobby
  const [leaderboard, setLeaderboard] = useState([]);
  const [challengePlayer, setChallengePlayer] = useState(null);
  
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
  const [timeLeft, setTimeLeft] = useState(15.0); 
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessingGame, setIsProcessingGame] = useState(false); 
  
  // Payment & Withdraw
  const [invoice, setInvoice] = useState({ req: '', hash: '', amount: 0 });
  const [withdrawLink, setWithdrawLink] = useState('');
  const [withdrawId, setWithdrawId] = useState(''); 
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);
  const [invoiceCopied, setInvoiceCopied] = useState(false);
  const [withdrawCopied, setWithdrawCopied] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Donation
  const [donationAmount, setDonationAmount] = useState(2100);
  const [donationInvoice, setDonationInvoice] = useState('');
  const [isDonationLoading, setIsDonationLoading] = useState(false);
  const [isDonationSuccess, setIsDonationSuccess] = useState(false);

  // Helper
  const txt = (key) => TRANSLATIONS[lang]?.[key] || key;

  // Generator
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

  // --- SOUND PLAYER EFFECT ---
  useEffect(() => {
    if (view === 'game' && selectedAnswer === null && !isMuted) {
      if (!tickRef.current) {
         tickRef.current = new Audio('/tick.mp3'); 
         tickRef.current.loop = true;  
         tickRef.current.volume = 0.4; 
      }
      tickRef.current.play().catch(e => { });
    } else {
      if (tickRef.current) {
        tickRef.current.pause();
        tickRef.current.currentTime = 0; 
      }
    }
    return () => {
      if (tickRef.current) tickRef.current.pause();
    };
  }, [view, selectedAnswer, isMuted]);

  // --- AMBER LOGIN LISTENER ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amberPubkey = params.get('pubkey') || params.get('npub') || params.get('signature'); 

    if (amberPubkey) {
      window.history.replaceState({}, document.title, window.location.pathname);

      const handleAmberReturn = async () => {
        setIsLoginLoading(true);
        try {
          let hexKey = amberPubkey;
          if (amberPubkey.startsWith('npub')) {
             try {
               const { data } = nip19.decode(amberPubkey);
               hexKey = data;
             } catch (e) {
               return; 
             }
          }

          const nostrPic = await fetchNostrImage(hexKey);
          const { data: existingUser } = await supabase.from('players').select('*').eq('pubkey', hexKey).single();

          if (existingUser) {
             finishLogin(existingUser.name, hexKey, existingUser.is_admin, nostrPic);
          } else {
             setNostrSetupPubkey(hexKey);
             if(nostrPic) localStorage.setItem('temp_nostr_avatar', nostrPic);
             setView('nostr_setup');
          }
        } catch (e) {
          console.error("Amber Login Error", e);
        } finally {
          setIsLoginLoading(false);
        }
      };
      
      handleAmberReturn();
    }
  }, []);

  // --- INITIALISIERUNG ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId) {
      localStorage.setItem('pending_join_id', joinId);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;

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

  useEffect(() => {
    if (!isDataLoaded) return; 
    const savedLang = localStorage.getItem('satoshi_lang');
    const storedUser = localStorage.getItem('satoshi_user');
    const savedPin = localStorage.getItem('saved_pin');
    
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }

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
        const { data: duel, error } = await supabase
          .from('duels')
          .select('*')
          .eq('id', pendingId)
          .single();

        if (duel && duel.status === 'open' && duel.creator !== currentUser.name) {
          localStorage.removeItem('pending_join_id');
          initJoinDuel(duel);
          return; 
        } else if (duel && duel.creator === currentUser.name) {
           localStorage.removeItem('pending_join_id');
           alert("Du kannst deinem eigenen Spiel nicht beitreten.");
        }
      } catch (e) {
        console.error("Deep Link Error", e);
      }
      localStorage.removeItem('pending_join_id'); 
    }
    
    setView('dashboard');
  };

  useEffect(() => {
    if (view === 'dashboard' && user) {
      fetchAllLobbyData();
      
      const checkSubmissions = async () => {
         const { data } = await supabase
           .from('questions')
           .select('id')
           .eq('submitted_by', user.name)
           .eq('is_verified', true)
           .eq('user_notified', false);
         
         if (data && data.length > 0) {
            const msg = `Glückwunsch! ${data.length} deiner Fragen wurden angenommen!`;
            if (Notification.permission === 'granted') {
               new Notification("SatoshiDuell", { body: msg, icon: '/logo.png' });
            }
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
             const newDuel = payload.new;
             if (newDuel.target_player === user.name) {
                new Notification("SatoshiDuell", { body: txt('msg_challenged'), icon: '/logo.png' });
             }
          }
          if (Notification.permission === 'granted' && payload.eventType === 'UPDATE') {
             const updatedDuel = payload.new;
             if (updatedDuel.status === 'finished') {
                const iAmCreator = updatedDuel.creator === user.name;
                const iAmChallenger = updatedDuel.challenger === user.name;
                if (iAmCreator || iAmChallenger) {
                   const creatorWon = updatedDuel.creator_score > updatedDuel.challenger_score || (updatedDuel.creator_score === updatedDuel.challenger_score && updatedDuel.creator_time < updatedDuel.challenger_time);
                   const iWon = (iAmCreator && creatorWon) || (iAmChallenger && !creatorWon);
                   if (iWon) {
                      new Notification("SatoshiDuell", { body: txt('msg_won'), icon: '/logo.png' });
                   }
                }
             }
          }
        })
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, [view, user]);

 // --- TIMER LOGIK ---
  useEffect(() => {
    let timer;
    if (view === 'game' && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          return Math.max(0, t - 1); 
        });
      }, 1000); 
    } else if (view === 'game' && timeLeft <= 0 && selectedAnswer === null) {
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
    if (localStorage.getItem('satoshi_user')) { 
        const u = JSON.parse(localStorage.getItem('satoshi_user'));
        setUser(u);
        checkPendingJoinAfterAuth(u);
    } else { 
        setView('login'); 
    }
  };

 // --- REPARIERTER SMART LOGIN ---
  const handleSmartLogin = async (e) => {
    if (e) e.preventDefault(); 
    setLoginError(''); 
    setIsLoginLoading(true);

    let input = loginInput.trim();
    if (input.startsWith('nostr:')) {
        input = input.replace('nostr:', '');
    }

    let pubkeyFromInput = null; 
    let nameFromInput = null;

    if (loginPin.length < 4) { 
        setLoginError(txt('login_error_pin')); 
        setIsLoginLoading(false); 
        return; 
    }

    if (input.startsWith('npub1')) {
      try { 
          const { type, data } = nip19.decode(input); 
          if (type === 'npub') pubkeyFromInput = data; 
      } catch (err) { 
          setLoginError("Der eingefügte npub-Key ist ungültig."); 
          setIsLoginLoading(false); 
          return; 
      }
    } 
    else if (/^[0-9a-fA-F]{64}$/.test(input)) {
        pubkeyFromInput = input.toLowerCase();
    }
    else {
      nameFromInput = input.toLowerCase();
      if (nameFromInput.length < 3) { 
          setLoginError(txt('login_error_name')); 
          setIsLoginLoading(false); 
          return; 
      }
    }

    try {
      const hashedPin = await hashPin(loginPin);
      
      let query = supabase.from('players').select('*');
      if (pubkeyFromInput) {
          query = query.eq('pubkey', pubkeyFromInput); 
      } else {
          query = query.eq('name', nameFromInput);
      }
      
      const { data: existingUser } = await query.single();

      if (existingUser) {
        if (nameFromInput && existingUser.pubkey) { 
            setLoginError("Dieser Name gehört zu einem Nostr-Account. Bitte Key nutzen."); 
            setIsLoginLoading(false); 
            return; 
        }
        
        if (existingUser.pin === hashedPin) { 
            const nostrPic = pubkeyFromInput ? await fetchNostrImage(pubkeyFromInput) : null;
            finishLogin(existingUser.name, existingUser.pubkey, existingUser.is_admin, nostrPic); 
        } else { 
            setLoginError(txt('login_error_wrong_pin')); 
        }

      } else {
        if (pubkeyFromInput) { 
            localStorage.setItem('temp_nostr_pin', hashedPin); 
            
            const nostrPic = await fetchNostrImage(pubkeyFromInput);
            if(nostrPic) localStorage.setItem('temp_nostr_avatar', nostrPic);
            
            setNostrSetupPubkey(pubkeyFromInput); 
            setIsLoginLoading(false); 
            setView('nostr_setup'); 
        } else {
             const { data: nameTaken } = await supabase.from('players').select('*').eq('name', nameFromInput).single();
             if(nameTaken) { 
                 setLoginError(txt('login_error_taken')); 
                 setIsLoginLoading(false); 
                 return; 
             }
             await supabase.from('players').insert([{ name: nameFromInput, pin: hashedPin }]);
             finishLogin(nameFromInput, null, false);
        }
      }
    } catch (err) { 
        console.error(err); 
        setLoginError("Datenbankfehler."); 
    } finally { 
        if (!nostrSetupPubkey) setIsLoginLoading(false); 
    }
  };

   const finishLogin = (name, pubkey, isAdmin = false, avatar = null) => {
    const finalAvatar = avatar || getRobotAvatar(name);
    
    const userObj = { name, pubkey, isAdmin, avatar: finalAvatar };
    setUser(userObj); 
    localStorage.setItem('satoshi_user', JSON.stringify(userObj)); 
    localStorage.setItem('saved_pin', loginPin); 
    checkPendingJoinAfterAuth(userObj);
  };

  const handleExtensionLogin = async () => { 
    if (!window.nostr) return alert("Keine Nostr Extension!"); 
    try { 
      const pubkey = await window.nostr.getPublicKey(); 
      setLoginInput(nip19.npubEncode(pubkey)); 
      
      const { data: existingUser } = await supabase.from('players').select('*').eq('pubkey', pubkey).single(); 
      
      const nostrPic = await fetchNostrImage(pubkey);

      if (existingUser) {
        finishLogin(existingUser.name, pubkey, existingUser.is_admin, nostrPic);
      } else { 
        setNostrSetupPubkey(pubkey); 
        if(nostrPic) localStorage.setItem('temp_nostr_avatar', nostrPic);
        setView('nostr_setup'); 
      } 
    } catch (e) { console.error(e); } 
  };

  const handleAmberLogin = () => {
    setLoginError("");
    setLoginInput(""); 

    const intentUrl = "intent:#Intent;scheme=nostrsigner;package=com.greenart7c3.nostrsigner;S.type=get_public_key;end";
    window.location.href = intentUrl;
    
    setTimeout(() => {
       setLoginError("Dein Key ist in der Zwischenablage! Füge ihn jetzt oben bei 'Nutzername' ein.");
    }, 1500);
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
    finishLogin(cleanName, nostrSetupPubkey, false);
  };

  const handleUpdatePin = async () => {
    if (newPin.length < 4) { setSettingsMsg(txt('login_error_pin')); return; }
    try {
      const hashed = await hashPin(newPin);
      await supabase.from('players').update({ pin: hashed }).eq('name', user.name);
      setSettingsMsg(txt('settings_saved')); localStorage.setItem('saved_pin', newPin);
      setTimeout(() => { setNewPin(''); setSettingsMsg(''); }, 1500);
    } catch (e) { setSettingsMsg("Error saving."); }
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification("SatoshiDuell", { body: "Benachrichtigungen aktiviert!", icon: '/logo.png' });
      } else {
        alert("Benachrichtigungen wurden blockiert. Bitte im Browser erlauben.");
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const shareDuel = async (duel) => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? window.location.origin : MAIN_DOMAIN;
    const shareUrl = `${baseUrl}/?join=${duel.id}`;
    
    const shareText = txt('share_content')
      .replace('{amount}', duel.amount)
      .replace('{url}', shareUrl);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SatoshiDuell',
          text: shareText
        });
      } catch (err) {
        navigator.clipboard.writeText(shareText);
        alert(txt('share_success')); 
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert(txt('share_success')); 
    }
  };

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

  const fetchAdminData = async () => {
    if (!user.isAdmin) return;
    const { data } = await supabase.from('duels').select('*').order('created_at', { ascending: false });
    if (data) setAdminDuels(data);
  };

  // --- DATEN LADEN & SPIEL ---
  
  const fetchAllLobbyData = async () => {
    if (!user) return;
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
    const { data: allOpen } = await supabase.from('duels').select('*').eq('status', 'open').order('created_at', { ascending: false });
    if (allOpen) {
      const publicData = allOpen.filter(d => !d.target_player || d.target_player.trim() === '');
      setPublicDuels(publicData);
      const targetData = allOpen.filter(d => d.target_player === user.name);
      setTargetedDuels(targetData);
    }
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

  const checkPaymentStatus = async () => { 
    if (!invoice.hash) return; 
    try { 
      const url = `${LNBITS_URL}/api/v1/payments/${invoice.hash}?ts=${Date.now()}`; 
      const res = await fetch(url, { headers: { 'X-Api-Key': INVOICE_KEY } }); 
      const data = await res.json(); 
      if (data.paid === true || data.status === 'success') { 
        setCheckingPayment(true); 
        setView('pre_game'); 
      } 
    } catch(e) {} 
  };

  const checkWithdrawStatus = async () => { 
    if (!withdrawId) return; 
    
    try { 
      const res = await fetch(`${LNBITS_URL}/withdraw/api/v1/links/${withdrawId}`, { headers: { 'X-Api-Key': INVOICE_KEY } }); 
      const data = await res.json(); 
      
      if (data.used >= 1 || data.spent === true) { 
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); 
        
        if (activeDuel && !activeDuel.claimed) {
            await supabase.from('duels').update({ claimed: true }).eq('id', activeDuel.id);
            setActiveDuel(prev => ({ ...prev, claimed: true }));
        }

        setTimeout(() => { 
           setWithdrawLink(''); 
           setWithdrawId(''); 
           setView('dashboard'); 
           resetGameState(); 
        }, 3000); 
      } 
    } catch(e) { console.error(e); } 
  };

  const handleManualCheck = async () => { setManualCheckLoading(true); await checkPaymentStatus(); setTimeout(() => setManualCheckLoading(false), 1000); };
  
  const resetGameState = () => { 
    setWithdrawLink(''); setWithdrawId(''); setScore(0); setTotalTime(0); setCurrentQ(0); 
    setInvoice({ req: '', hash: '', amount: 0 }); 
    setSelectedAnswer(null); 
    setInvoiceCopied(false); 
    setWithdrawCopied(false); 
    setIsProcessingGame(false);
    setIsClaiming(false);
    setDashboardView('home'); 
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
    const val = Number(wager);
    if (!wager || val <= 0) { alert("Bitte einen Einsatz wählen!"); return; }
    if (val > 9999) { alert("Maximal 9999 Sats erlaubt!"); return; } 
    const gameConfig = generateGameData(allQuestions); 
    setGameData(gameConfig); setRole('creator'); await fetchInvoice(val); 
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
        
        await supabase.from('duels').update({ 
             status: 'refunded',
             withdraw_link: data.lnurl
        }).eq('id', duel.id);
        
        setActiveDuel({...duel, status: 'refunded', withdraw_link: data.lnurl});
        
        setView('result_final');
      } else { 
          alert("Fehler beim Erstellen des Refunds."); 
      }
    } catch (e) { 
        console.error(e); 
        alert("Verbindungsfehler"); 
    }
  };

  const fetchInvoice = async (amountSat) => {
    try { const res = await fetch(`${LNBITS_URL}/api/v1/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Api-Key': INVOICE_KEY }, body: JSON.stringify({ out: false, amount: amountSat, memo: `SatoshiDuell`, expiry: 600 }) }); const data = await res.json(); setInvoice({ req: data.payment_request || data.bolt11, hash: data.payment_hash, amount: amountSat }); setCheckingPayment(false); setView('payment'); } catch (e) { alert("LNbits Error"); setView('dashboard'); }
  };

  const startGame = () => { setCurrentQ(0); setScore(0); setTotalTime(0); setTimeLeft(15.0); setSelectedAnswer(null); setIsProcessingGame(false); setView('game'); };

  const handleAnswer = (displayIndex) => {
    if (selectedAnswer !== null) return; 
    
    const roundConfig = gameData[currentQ];
    if (!allQuestions[roundConfig.id]) {
        console.error("Frage fehlt in DB!");
        return;
    }

    const originalIndex = roundConfig.order[displayIndex];
    const correctIndex = allQuestions[roundConfig.id].correct;
    const isCorrectCheck = (originalIndex === correctIndex);

    if (isCorrectCheck) {
       playSound('correct', isMuted); 
    } else {
       playSound('wrong', isMuted);  
    }

    setSelectedAnswer(displayIndex);
    setTotalTime(prev => prev + (15.0 - timeLeft)); 
    
    if (isCorrectCheck) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQ < 4) { setCurrentQ(p => p + 1); setTimeLeft(15.0); setSelectedAnswer(null); } 
      else { 
          if ((isCorrectCheck ? score + 1 : score) >= 3) playSound('correct', isMuted);
          finishGameLogic(isCorrectCheck ? score + 1 : score); 
      }
    }, 2000);
  };

  const finishGameLogic = async (finalScore = score) => {
    if (isProcessingGame) return; 
    setIsProcessingGame(true);

    const cleanTime = parseFloat((totalTime || 0).toFixed(1));

    try {
      if (role === 'creator') {
        const { error } = await supabase.from('duels').insert([{ 
          creator: user.name, 
          creator_score: finalScore, 
          creator_time: cleanTime, 
          questions: gameData, 
          status: 'open', 
          amount: invoice.amount, 
          target_player: challengePlayer 
        }]);
        if (error) throw error;
        setView('dashboard');
      } else {
        const { data, error } = await supabase.from('duels').update({ 
            challenger: user.name, 
            challenger_score: finalScore, 
            challenger_time: cleanTime, 
            status: 'finished' 
        }).eq('id', activeDuel.id).select();
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            setActiveDuel(data[0]); 
            setView('result_final'); 
        } else {
            throw new Error("Fehler beim Laden des Spielstatus");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Speicherfehler: " + (e.message || JSON.stringify(e)));
      setIsProcessingGame(false);
    }
  };

  const openPastDuel = (duel) => { setActiveDuel(duel); const myRole = duel.creator === user.name ? 'creator' : 'challenger'; setRole(myRole); const myS = myRole === 'creator' ? duel.creator_score : duel.challenger_score; const myT = myRole === 'creator' ? duel.creator_time : duel.challenger_time; determineWinner(duel, myRole, myS, myT); };
  
  const determineWinner = async (duel, myRole, myScore, myTime) => { 
    if (duel.status === 'refunded') { setView('result_final'); return; }
    setView('result_final'); 
  };
  
  const handleClaimReward = async () => {
    if (isClaiming) return;
    setIsClaiming(true);
    try {
        const res = await fetch('/api/claim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: activeDuel.amount, duelId: activeDuel.id })
        });
        const data = await res.json();
        
        if (res.status !== 200) {
            alert("Auszahlungsfehler: " + (data.details || data.error || "Unbekannter Fehler"));
        } else if (data.lnurl) {
            setWithdrawLink(data.lnurl);
            setWithdrawId(data.id);
            setActiveDuel(prev => ({...prev, claimed: true}));
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    } catch (e) {
        console.error("Claim Error:", e);
        alert("Verbindungsfehler: " + e.message);
    } finally {
        setIsClaiming(false);
    }
  };

  const handleLogout = () => { localStorage.clear(); setUser(null); setView('language_select'); };

  // --- AVATAR UPLOAD FUNKTION ---
  const handleAvatarUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        alert("Das Bild ist zu groß! Bitte maximal 2MB.");
        return;
      }

      setIsLoginLoading(true); 

      const cleanName = user.name.replace(/[^a-zA-Z0-9]/g, '');
      const fileExt = file.name.split('.').pop();
      const fileName = `${cleanName}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('players')
        .update({ avatar: publicUrl })
        .eq('name', user.name);

      if (dbError) throw dbError;

      const updatedUser = { ...user, avatar: publicUrl };
      setUser(updatedUser);
      localStorage.setItem('satoshi_user', JSON.stringify(updatedUser));
      
      alert("Profilbild erfolgreich aktualisiert! 📸");

    } catch (error) {
      console.error(error);
      alert("Fehler beim Hochladen: " + error.message);
    } finally {
      setIsLoginLoading(false);
    }
  };

  if (view === 'loading_data') {
    return (<Background><div className="flex flex-col items-center justify-center h-screen"><Loader2 size={48} className="text-orange-500 animate-spin"/><p className="text-white mt-4 font-bold uppercase tracking-widest">Lade Quiz Daten...</p></div></Background>);
  }

  if (view === 'language_select') {
    return (
      <Background>
        <div className="w-full max-w-sm flex flex-col items-center justify-center min-h-[90vh] px-4 gap-6">
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
        <div className="w-full max-w-sm flex flex-col gap-6 text-center px-4">
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
          
          <div className="relative py-2 text-center"><span className="relative bg-[#1a1a1a] px-3 text-[10px] uppercase font-bold text-neutral-600 rounded">Optionen</span></div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={handleExtensionLogin} className="text-[10px] py-3 flex items-center justify-center gap-2">
              <Fingerprint size={16}/> Extension
            </Button>
            
            <Button variant="secondary" onClick={handleAmberLogin} className="text-[10px] py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 flex items-center justify-center gap-2">
              <Smartphone size={16}/> Amber App
            </Button>
          </div>
          
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
        <div className="w-full max-w-sm flex flex-col gap-6 text-center px-4">
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
    setTimeout(() => { setView('dashboard'); setDashboardView('settings'); }, 0);
    return null;
  }

  if (view === 'nostr_setup') {
    return (
      <Background>
         <div className="w-full max-w-sm flex flex-col gap-6 text-center px-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-purple-400 border border-purple-500/50"><Globe size={32}/></div>
            <h2 className="text-2xl font-black text-white uppercase">{txt('nostr_setup_title')}</h2><p className="text-neutral-400 text-sm">{txt('nostr_setup_text')}</p>
            <form onSubmit={completeNostrRegistration} className="flex flex-col gap-4"><input type="text" placeholder="GAMERTAG" value={nostrSetupName} onChange={(e) => setNostrSetupName(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a0a] border border-white/10 text-white outline-none focus:border-orange-500 font-bold uppercase text-center shadow-lg"/><Button variant="primary" onClick={completeNostrRegistration}>OK</Button><button onClick={() => setView('login')} className="text-xs text-neutral-600 uppercase font-bold">Zurück</button></form>
         </div>
      </Background>
    );
  }

// --- DASHBOARD ROUTER ---
  if (view === 'dashboard') {
    // Top Level
    if (dashboardView === 'home') {
       const unclaimedWin = myDuels.find(d => d.status === 'finished' && !d.claimed && ((d.creator === user.name && d.creator_score > d.challenger_score) || (d.challenger === user.name && d.challenger_score > d.creator_score)));
       const publicCount = publicDuels.filter(d => d.creator !== user.name).length;
       const challengeCount = targetedDuels.length;
       const myOpenDuels = myDuels.filter(d => d.creator === user.name && d.status === 'open');

       return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] px-4">
             <header className="flex justify-between items-center py-4 mb-2">
               <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden shadow-lg shadow-orange-500/20"><img src={user.avatar || getRobotAvatar(user.name)} alt="Avatar" className="w-full h-full object-cover"/></div><div className="flex flex-col"><span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">{txt('dashboard_welcome')}</span><span className="text-xl font-black text-white leading-none">{formatName(user.name)}</span></div></div>
               <div className="flex items-center gap-3"><div className="bg-orange-500/10 border border-orange-500/50 px-3 py-1 rounded-full flex items-center gap-2"><Zap size={14} className="text-orange-500 fill-orange-500 animate-pulse"/><span className="text-orange-500 font-mono font-bold text-sm">{stats.total_sats.toLocaleString()}</span></div><button onClick={() => setView('language_select')} className="text-2xl hover:scale-110 transition-transform">{lang === 'de' ? '🇩🇪' : lang === 'en' ? '🇺🇸' : '🇪🇸'}</button></div>
             </header>
             <div className="grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pb-20">
               {unclaimedWin && (<button onClick={() => { setActiveDuel(unclaimedWin); setView('result_final'); }} className="col-span-2 bg-green-500 text-black font-black p-4 rounded-2xl animate-pulse shadow-lg shadow-green-500/20 flex items-center justify-between"><div className="flex items-center gap-2"><Trophy className="animate-bounce"/><span className="uppercase tracking-widest">Gewinn abholen!</span></div><span>{unclaimedWin.amount * 2} Sats</span></button>)}
               <button onClick={() => { alert("Coming Soon!"); }} className="col-span-2 bg-gradient-to-r from-red-900/80 to-purple-900/80 border border-yellow-500/50 p-4 rounded-2xl flex items-center justify-between relative overflow-hidden group shadow-[0_0_20px_rgba(234,179,8,0.2)]"><div className="absolute -right-10 -top-10 bg-yellow-500 blur-[60px] w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity"></div><div className="flex flex-col items-start z-10"><div className="flex items-center gap-2 mb-1"><Trophy size={18} className="text-yellow-400 animate-pulse"/><span className="text-sm font-black text-yellow-500 uppercase tracking-widest">SATOSHI ARENA</span></div><span className="text-[10px] text-neutral-300 font-bold uppercase">Weekly Battle Royale</span></div><div className="flex flex-col items-end z-10"><span className="text-2xl font-black text-white font-mono drop-shadow-md">??? <span className="text-sm text-yellow-500">SATS</span></span><span className="text-[9px] text-red-300 uppercase font-bold bg-red-900/50 px-2 py-0.5 rounded border border-red-500/30">Jackpot</span></div></button>
               <DashboardTile title={txt('tile_lobby')} icon={<Globe size={24}/>} color="blue" count={publicCount} onClick={() => setDashboardView('lobby')} />
               <DashboardTile title={txt('tile_new_game')} icon={<Plus size={24}/>} color="orange" onClick={() => setView('create_duel')} />
               {challengeCount > 0 && (<DashboardTile title={txt('tile_challenges')} icon={<Swords size={24}/>} color="red" count={challengeCount} onClick={() => setDashboardView('challenges')} />)}
               <DashboardTile title={txt('tile_active')} icon={<Zap size={24}/>} color="green" count={myOpenDuels.length} onClick={() => setDashboardView('active_games')} />
               <DashboardTile title={txt('tile_history')} icon={<History size={24}/>} color="neutral" onClick={() => setDashboardView('history')} />
               <DashboardTile title={txt('tile_leaderboard')} icon={<Trophy size={24}/>} color="yellow" onClick={() => setDashboardView('leaderboard')} />
               <DashboardTile title={txt('tile_settings')} icon={<Settings size={24}/>} color="purple" onClick={() => setDashboardView('settings')} />
             </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'active_games') {
      const myOpenDuels = myDuels.filter(d => d.creator === user.name && d.status === 'open');
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-green-500 uppercase tracking-widest">{txt('tile_active')}</h2></div>
            
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {myOpenDuels.length === 0 && <div className="text-center py-20 text-neutral-600 italic">Keine offenen Spiele.</div>}
              {myOpenDuels.map(d => {
                  const created = new Date(d.created_at).getTime();
                  const canRefund = (Date.now() - created > REFUND_TIMEOUT_MS);
                  return (
                     <div key={d.id} className="bg-neutral-900/80 border border-green-500/30 p-4 rounded-xl flex flex-col gap-3 shadow-lg">
                        <div className="flex justify-between items-center">
                           <div className="flex flex-col">
                              <span className="text-green-500 font-black font-mono text-lg">{d.amount} Sats</span>
                              <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">{d.target_player ? `${txt('challenge_sent')} ${formatName(d.target_player)}` : txt('lobby_wait')}</span>
                           </div>
                           {canRefund ? (
                              <button onClick={() => handleRefund(d)} className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"><RefreshCcw size={10}/> {txt('btn_refund')}</button>
                           ) : (
                              <span className="animate-pulse text-green-500/50 uppercase font-black text-[10px]">AKTIV</span>
                           )}
                        </div>
                        
                        {!canRefund && (
                           <button onClick={(e) => {e.stopPropagation(); shareDuel(d);}} className="w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/50 text-green-500 py-3 rounded-lg transition-all flex items-center justify-center gap-2 group">
                              <LinkIcon size={16} className="group-hover:animate-pulse"/> <span className="text-xs font-black uppercase tracking-widest">{txt('btn_share')}</span>
                           </button>
                        )}
                     </div>
                  );
              })}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'lobby') {
      const list = publicDuels.filter(d => d.creator !== user.name);
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-white uppercase tracking-widest">{txt('tile_lobby')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {list.length === 0 && <div className="text-center py-20 text-neutral-600 italic">Keine offenen Duelle.<br/>Starte selbst eins!</div>}
              {list.map(d => (
                <div key={d.id} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5 hover:border-orange-500/30 transition-all">
                  <div><p className="font-bold text-white text-sm uppercase">{formatName(d.creator)}</p><p className="text-xs text-orange-400 font-mono">{d.amount} sats</p></div>
                  <button onClick={() => initJoinDuel(d)} className="bg-orange-500 text-black px-4 py-2 rounded-lg text-xs font-black uppercase hover:scale-105 transition-transform">{txt('lobby_fight')}</button>
                </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'history') {
      const historyList = myDuels.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4">
               <button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button>
               <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest">{txt('tile_history')}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {historyList.length === 0 && (
                 <div className="text-center py-20 text-neutral-600 italic">Noch keine Spiele gespielt.</div>
              )}
              {historyList.map(d => {
                 const isCreator = d.creator === user.name;
                 const myScore = isCreator ? d.creator_score : d.challenger_score;
                 const opScore = isCreator ? d.challenger_score : d.creator_score;
                 const opponent = isCreator ? (d.challenger || '?') : d.creator;
                 
                 let resultStatus = 'RUNNING'; 
                 let resultColor = 'bg-neutral-600 text-white';
                 let borderColor = 'border-white/5';
                 
                 if (d.status === 'finished') {
                    const iWon = myScore > opScore || (myScore === opScore && (isCreator ? d.creator_time < d.challenger_time : d.challenger_time < d.creator_time));
                    resultStatus = iWon ? 'WON' : 'LOST';
                    resultColor = iWon ? 'bg-green-500 text-black' : 'bg-red-600 text-white';
                    borderColor = iWon ? 'border-green-500/30' : 'border-red-500/30';
                 } else if (d.status === 'refunded') {
                    resultStatus = 'REFUND';
                    resultColor = 'bg-yellow-500 text-black';
                    borderColor = 'border-yellow-500/30';
                 }

                 return (
                   <button key={d.id} onClick={() => openPastDuel(d)} className={`w-full bg-neutral-900/80 border ${borderColor} p-3 rounded-xl flex items-center justify-between gap-3 hover:bg-neutral-800 transition-all group`}>
                      <div className="flex items-center gap-3">
                         <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-black">
                               <img src={getRobotAvatar(opponent)} alt={opponent} className="w-full h-full object-cover group-hover:scale-110 transition-transform"/>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm ${resultColor}`}>{resultStatus}</div>
                         </div>
                         <div className="flex flex-col items-start">
                            <span className="text-white font-bold text-sm uppercase">vs {formatName(opponent)}</span>
                            <span className="text-neutral-500 text-[10px]">{new Date(d.created_at).toLocaleDateString()}</span>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="font-mono font-bold text-white text-sm">{d.amount} sats</span>
                         <span className="text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded-lg mt-1">{myScore ?? '-'} : {opScore ?? '-'}</span>
                      </div>
                   </button>
                 );
              })}
            </div>
          </div>
        </Background>
      );
    }

    if (dashboardView === 'challenges') {
      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-white uppercase tracking-widest text-purple-400">{txt('tile_challenges')}</h2></div>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {targetedDuels.length === 0 && <div className="text-center py-20 text-neutral-600 italic">{txt('no_challenges')}</div>}
              {targetedDuels.map(d => (
                <div key={d.id} className="bg-purple-500/10 p-4 rounded-2xl flex justify-between items-center border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <div><p className="font-bold text-white text-sm uppercase">{formatName(d.creator)} ⚔️</p><p className="text-xs text-purple-300 font-mono">{d.amount} sats</p></div>
                  <button onClick={() => initJoinDuel(d)} className="bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase hover:scale-105 transition-transform">ACCEPT</button>
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
            <div className="flex items-center gap-4 py-4">
                <button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button>
                <h2 className="text-xl font-black text-white uppercase tracking-widest text-yellow-500">{txt('tile_leaderboard')}</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {leaderboard.map((p, i) => (
                <div key={p.name} className={`flex justify-between items-center p-3 rounded-xl border transition-all ${p.name === user.name ? 'bg-orange-500/20 border-orange-500/50' : 'bg-neutral-900/60 border-white/5 hover:bg-neutral-800'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-black font-mono w-6 text-center ${i===0?'text-yellow-400 text-lg drop-shadow-lg':i===1?'text-neutral-300':i===2?'text-amber-700':'text-neutral-600'}`}>{i + 1}</span>
                    <div className={`w-10 h-10 rounded-full overflow-hidden border bg-black ${i===0 ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]' : 'border-white/10'}`}>
                        <img src={p.avatar || getRobotAvatar(p.name)} alt={p.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold uppercase text-sm flex items-center gap-1 ${p.name === user.name ? 'text-orange-400' : 'text-white'}`}>{formatName(p.name)} {p.isAdmin && <Shield size={10} className="text-red-500"/>}</span>
                        <span className="text-neutral-500 text-[10px]">{p.wins || 0} Wins • {p.games_played || 0} Games</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <span className="text-orange-400 font-mono font-bold text-xs">{(p.total_sats || p.satsWon || 0).toLocaleString()} <span className="text-[9px]">sats</span></span>
                      {p.name !== user.name && (
                        <button onClick={() => startChallenge(p.name)} className="text-neutral-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all" title="Herausfordern"><Swords size={18}/></button>
                      )}
                  </div>
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
            <div className="flex items-center gap-4 py-4">
                <button onClick={() => setDashboardView('home')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button>
                <h2 className="text-xl font-black text-white uppercase tracking-widest text-neutral-400">{txt('tile_settings')}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                              <img src={user.avatar || getRobotAvatar(user.name)} alt="Avatar" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                              <span className="text-sm font-bold text-white uppercase">Profilbild</span>
                              <span className="text-[10px] text-neutral-500">Max. 2MB (JPG/PNG)</span>
                          </div>
                      </div>
                      <label className="bg-neutral-800 hover:bg-orange-500/20 text-white hover:text-orange-500 p-3 rounded-xl cursor-pointer transition-all border border-white/10 hover:border-orange-500 flex items-center justify-center">
                          {isLoginLoading ? <Loader2 size={18} className="animate-spin text-orange-500"/> : <Upload size={18} />}
                          <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={isLoginLoading} className="hidden" />
                      </label>
                  </div>
               </div>

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
                      <button onClick={handleUpdatePin} className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600 transition-colors"><Save size={18}/></button>
                  </div>
                  {settingsMsg && <p className={`text-xs font-bold mt-2 ${settingsMsg.includes('!') ? 'text-green-500' : 'text-red-500'}`}>{settingsMsg}</p>}
               </div>

               <button onClick={() => setView('submit_question')} className="w-full bg-purple-900/50 border border-purple-500/50 p-4 rounded-2xl flex items-center justify-center gap-2 text-purple-300 font-bold uppercase text-xs hover:bg-purple-900 hover:text-white transition-all">
                 <Plus size={16}/> Eigene Frage einreichen
               </button>

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
      const totalGames = adminDuels.length;
      const openGames = adminDuels.filter(d => d.status === 'open').length;
      const totalVolume = adminDuels.reduce((acc, d) => acc + (d.status !== 'refunded' ? d.amount : 0), 0);
      const filteredDuels = adminDuels.filter(d => {
         const matchesSearch = d.creator.toLowerCase().includes(adminSearch.toLowerCase()) || (d.challenger && d.challenger.toLowerCase().includes(adminSearch.toLowerCase())) || d.id.toString().includes(adminSearch);
         if (!matchesSearch) return false;
         if (adminFilter === 'open') return d.status === 'open';
         if (adminFilter === 'finished') return d.status === 'finished' || d.status === 'refunded';
         return true;
      });

      return (
        <Background>
          <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
            <div className="flex items-center gap-4 py-4"><button onClick={() => setDashboardView('settings')} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors"><ArrowLeft className="text-white"/></button><h2 className="text-xl font-black text-red-500 uppercase tracking-widest">{txt('admin_title')}</h2></div>
            <div className="grid grid-cols-3 gap-2 mb-2">
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_total')}</div><div className="text-white font-mono font-bold text-lg">{totalGames}</div></div>
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_open')}</div><div className="text-orange-500 font-mono font-bold text-lg">{openGames}</div></div>
               <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><div className="text-neutral-500 text-[8px] uppercase font-bold mb-1">{txt('admin_stats_volume')}</div><div className="text-green-500 font-mono font-bold text-xs mt-1">{totalVolume.toLocaleString()}</div></div>
            </div>
            <div className="mb-2"><button onClick={() => setView('admin_questions')} className="w-full bg-orange-500/10 border border-orange-500/50 p-3 rounded-xl flex items-center justify-center gap-2 text-orange-500 font-bold uppercase text-xs hover:bg-orange-500 hover:text-black transition-all"><Edit2 size={16}/> Fragen bearbeiten / hinzufügen</button></div>
            <div className="flex gap-2 mb-2">
               <div className="relative flex-1"><Search size={14} className="absolute left-3 top-3 text-neutral-500"/><input type="text" placeholder={txt('admin_search_placeholder')} value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-red-500"/></div>
               <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                  <button onClick={() => setAdminFilter('all')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'all' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_all')}</button>
                  <button onClick={() => setAdminFilter('open')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'open' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_open')}</button>
                  <button onClick={() => setAdminFilter('finished')} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${adminFilter === 'finished' ? 'bg-white/20 text-white' : 'text-neutral-500'}`}>{txt('admin_filter_finished')}</button>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {filteredDuels.length === 0 && <p className="text-center text-neutral-600 text-xs italic py-10">Keine Ergebnisse</p>}
              {filteredDuels.map(d => (
                   <div key={d.id} className="bg-neutral-900/80 border border-white/5 p-3 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                         <span className="font-mono text-[10px] text-neutral-500">ID: {d.id}</span>
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${d.status === 'open' ? 'bg-orange-500/20 text-orange-500' : d.status === 'finished' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{d.status.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="flex flex-col"><div className="text-xs font-bold text-white flex items-center gap-2">{d.creator} <span className="text-neutral-600 text-[10px] font-normal">vs</span> {d.challenger || '?'}</div><div className="text-[10px] text-neutral-400 mt-1">Score: <span className="font-mono text-white">{d.creator_score ?? '-'}</span> : <span className="font-mono text-white">{d.challenger_score ?? '-'}</span></div></div>
                         <div className="flex flex-col items-end"><span className="font-mono text-xs text-white font-bold">{d.amount} sats</span>{d.status === 'finished' && (d.claimed ? <span className="text-[8px] text-yellow-500 font-bold mt-1">PAID OUT</span> : <span className="text-[8px] text-neutral-500 mt-1">UNCLAIMED</span>)}</div>
                      </div>
                   </div>
              ))}
            </div>
          </div>
        </Background>
      );
    }
  }

  // --- SUB-VIEWS (Admin & Submit) ---
  if (view === 'admin_questions') return (<Background><div className="w-full max-w-2xl flex flex-col h-[95vh] gap-4 px-4 mx-auto"><AdminQuestionManager onBack={() => { setView('dashboard'); setDashboardView('admin'); }} /></div></Background>);
  if (view === 'submit_question') return (<Background><div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-4 mx-auto py-6"><SubmitQuestion user={user} onBack={() => setView('dashboard')} /></div></Background>);

  if (view === 'pre_game') { 
      if (!checkingPayment) { confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } }); } 
      return (
        <Background>
          <div className="w-full max-w-sm flex flex-col gap-6 text-center px-4 items-center justify-center min-h-[60vh]">
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
          <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">{challengePlayer ? `${txt('setup_target')} ${challengePlayer.toUpperCase()}` : txt('setup_title')}</h2>
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
          <div className="my-4 flex justify-center"><button onClick={() => { navigator.clipboard.writeText(invoice.req); setInvoiceCopied(true); setTimeout(() => setInvoiceCopied(false), 2000); }} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/5">{invoiceCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {txt('btn_copy_invoice')}</button></div>
          <div className="grid gap-3"><Button variant="primary" onClick={handleManualCheck}>{txt('btn_check')}</Button><Button variant="secondary" onClick={() => window.location.href = `lightning:${invoice.req}`}>{txt('btn_wallet')}</Button><button onClick={() => setView('dashboard')} className="text-xs text-neutral-500 mt-4 font-bold uppercase">{txt('btn_cancel')}</button></div>
        </div>
      </Background>
    ); 
  }
  
  if (view === 'game') {
    if (!allQuestions || allQuestions.length === 0) return (<Background><div className="text-white">Fehler: Keine Fragen geladen.</div></Background>);
    const roundConfig = gameData[currentQ]; 
    if (!allQuestions[roundConfig.id]) return (<Background><div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4 text-center"><AlertTriangle size={64} className="text-red-500 mx-auto mb-4"/><h3 className="text-xl font-bold text-white mb-2">Fehler beim Laden der Frage</h3><p className="text-neutral-400 text-xs mb-8">Diese Frage existiert nicht mehr in der Datenbank.</p><Button onClick={() => finishGameLogic(score)}>Spiel beenden</Button></div></Background>);
    
    const questionID = roundConfig.id; 
    const shuffledOrder = roundConfig.order; 
    const questionData = allQuestions[questionID]?.[lang]; 
    if (!questionData) return null;
    
    const originalOptions = questionData.options; 
    const correctIndex = allQuestions[questionID].correct;
    
    return (
      <Background>
        <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[60vh] px-4">
          <div className="flex justify-between items-end mb-4 px-1"><span className="text-xs font-bold text-neutral-500 uppercase">{txt('game_q')} {currentQ + 1}/5</span><span className={`text-4xl font-black font-mono ${timeLeft < 5 ? 'text-red-500 drop-shadow-[0_0_10px_red]' : 'text-white'}`}>{timeLeft.toFixed(1)}</span></div>
          <div className="w-full h-2 bg-neutral-900 rounded-full mb-10 overflow-hidden"><div className="h-full bg-orange-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div></div>
          <h3 className="text-2xl font-bold text-white text-center mb-10 min-h-[100px]">"{questionData.q}"</h3>
          <div className="grid gap-3">{[0,1,2,3].map((displayIndex) => { const originalOptionIndex = shuffledOrder[displayIndex]; const optionText = originalOptions[originalOptionIndex]; let btnClass = "bg-neutral-900/50 hover:bg-orange-500 border-white/10"; const isCorrect = originalOptionIndex === correctIndex; const isSelected = selectedAnswer === displayIndex; if (selectedAnswer !== null) { if (isCorrect) btnClass = "bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]"; else if (isSelected) btnClass = "bg-red-500 text-white border-red-500"; else btnClass = "opacity-30 border-transparent"; } return (<button key={`${currentQ}-${displayIndex}`} onClick={() => handleAnswer(displayIndex)} disabled={selectedAnswer !== null} className={`border p-5 rounded-2xl text-left transition-all active:scale-[0.95] flex items-center gap-4 ${btnClass}`}><span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selectedAnswer !== null && isCorrect ? 'bg-black text-green-500' : 'bg-neutral-800 text-neutral-400'}`}>{String.fromCharCode(65 + displayIndex)}</span><span className="font-bold text-lg text-neutral-200">{optionText}</span></button>); })}</div>
          {isProcessingGame && (<div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-in fade-in"><Loader2 size={64} className="text-orange-500 animate-spin mb-4"/><p className="text-white font-black text-xl animate-pulse">FINISHING...</p></div>)}
        </div>
      </Background>
    );
  }

  if (view === 'result_final') { 
    // --- FALL 1: REFUND (RÜCKERSTATTUNG) ---
    if (activeDuel && activeDuel.status === 'refunded') {
       const finalLink = withdrawLink || activeDuel.withdraw_link;
       return (
         <Background>
           <div className="w-full max-w-sm text-center mt-10 px-4">
             <div className="mx-auto w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 ring-2 ring-yellow-500 animate-pulse">
                <RefreshCcw size={40} className="text-yellow-500"/>
             </div>
             <h2 className="text-3xl font-black text-white mb-4 uppercase">RÜCKERSTATTUNG</h2>
             <p className="text-neutral-400 text-xs mb-8 bg-neutral-900/50 p-4 rounded-xl border border-white/5">{txt('refund_info')}</p>

             {activeDuel.claimed ? (
                <div className="p-8 bg-green-500/10 border border-green-500/50 rounded-2xl animate-in zoom-in mb-6">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-black text-white uppercase">Ausgezahlt!</h3>
                    <p className="text-green-400 text-xs mt-2">Die Sats sind in deiner Wallet.</p>
                </div>
             ) : finalLink ? (
                <div className="animate-in slide-in-from-bottom-5">
                  <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl shadow-yellow-500/20">
                     <QRCodeCanvas value={`lightning:${finalLink.toUpperCase()}`} size={200} includeMargin={true}/>
                  </div>
                  <div className="my-4 flex justify-center">
                      <button onClick={() => { navigator.clipboard.writeText(finalLink); setWithdrawCopied(true); setTimeout(() => setWithdrawCopied(false), 2000); }} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 py-3 rounded-xl text-xs font-bold transition-all border border-white/5">
                        {withdrawCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>} {txt('btn_copy_withdraw')}
                      </button>
                  </div>
                  <Button variant="primary" onClick={() => window.location.href = `lightning:${finalLink}`} className="mb-2">GELD IN WALLET ÖFFNEN</Button>
                </div>
             ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                    <p className="text-red-400 text-xs font-bold">Fehler: Kein Refund-Link gefunden.</p>
                    <p className="text-[10px] text-red-300 mt-1">Bitte kontaktiere den Admin mit Spiel-ID: {activeDuel.id}</p>
                </div>
             )}
             <button onClick={() => setView('dashboard')} className="text-neutral-500 font-black uppercase text-xs tracking-widest mt-8 hover:text-white transition-colors">{txt('btn_lobby')}</button>
           </div>
         </Background>
       );
    }

    // --- FALL 2: NORMALES SPIELERGEBNIS (WIN/LOSS) ---
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
            
            {duel.claimed ? (
                <div className="p-8 bg-green-500/10 border border-green-500/50 rounded-2xl animate-in zoom-in mb-6">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-black text-white uppercase">Ausgezahlt!</h3>
                    <p className="text-green-400 text-xs mt-2">Die Sats sind in deiner Wallet.</p>
                </div>
            ) : withdrawLink ? (
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
            ) : isFinished && won ? (
             <div className="flex flex-col gap-2">
                <div className="bg-orange-500/10 border border-orange-500/50 p-2 rounded-xl mb-2 text-orange-400 text-[10px] font-black uppercase tracking-widest">JACKPOT: {duel.amount * 2} SATS</div>
                <Button onClick={handleClaimReward} disabled={isClaiming} className="bg-green-500 text-black animate-pulse">
                  {isClaiming ? <Loader2 className="animate-spin mx-auto"/> : `${txt('btn_withdraw')} (${duel.amount * 2} Sats)`}
                </Button>
             </div>
            ) : null}

            {!withdrawLink && (
               <button onClick={() => setView('dashboard')} className="text-neutral-500 font-black uppercase text-xs tracking-widest mt-6">{txt('btn_lobby')}</button>
            )}
         </div>
      </Background>
    ); 
  }
  
  // Falls kein View matched (Fallback)
  return <Background><div>Loading...</div></Background>;
}