import React from 'react';
import { ArrowLeft, Trophy, Medal, Fingerprint, Coins, Zap, User, Users, Globe, Lock, CheckCircle } from 'lucide-react';
import Background from './Background';

export default function HallOfFame({ user, myDuels, onBack }) {
  
  // 1. STATISTIK BERECHNEN
  let stats = { played: myDuels.length, wins: 0, sats: 0, perfect: 0 };

  myDuels.forEach(d => {
     // Nur fertige Spiele zählen
     if (d.status !== 'finished') return;

     const isCreator = d.creator === user.name;
     const myScore = isCreator ? d.creator_score : d.challenger_score;
     const opScore = isCreator ? d.challenger_score : d.creator_score;
     const myTime = isCreator ? d.creator_time : d.challenger_time;
     const opTime = isCreator ? d.challenger_time : d.creator_time;
     
     // Gewinn-Logik (Punkte oder Zeit)
     const iWon = myScore > opScore || (myScore === opScore && myTime < opTime);
     
     if (iWon) {
         stats.wins++;
         stats.sats += (d.amount || 0);
     }
     
     // Perfekte Runde (5/5)
     if (myScore === 5) {
         stats.perfect++;
     }
  });

  // 2. ABZEICHEN DEFINITIONEN
  const BADGES = [
    { id: 'p1', name: 'Neuling', desc: '5 Spiele gespielt', icon: User, color: 'text-blue-400', achieved: stats.played >= 5 },
    { id: 'p2', name: 'Stammgast', desc: '25 Spiele gespielt', icon: Users, color: 'text-blue-500', achieved: stats.played >= 25 },
    { id: 'p3', name: 'Inventar', desc: '100 Spiele gespielt', icon: Globe, color: 'text-blue-600', achieved: stats.played >= 100 },
    
    { id: 'w1', name: 'Gewinner', desc: '5 Siege errungen', icon: Trophy, color: 'text-yellow-400', achieved: stats.wins >= 5 },
    { id: 'w2', name: 'Champion', desc: '20 Siege errungen', icon: Medal, color: 'text-yellow-500', achieved: stats.wins >= 20 },
    { id: 'w3', name: 'Legende', desc: '50 Siege errungen', icon: Fingerprint, color: 'text-yellow-600', achieved: stats.wins >= 50 },

    { id: 's1', name: 'Sparer', desc: '100 Sats gewonnen', icon: Coins, color: 'text-green-400', achieved: stats.sats >= 100 },
    { id: 's2', name: 'Stacker', desc: '1.000 Sats gewonnen', icon: Coins, color: 'text-green-500', achieved: stats.sats >= 1000 },
    { id: 's3', name: 'Whale', desc: '10.000 Sats gewonnen', icon: Coins, color: 'text-green-600', achieved: stats.sats >= 10000 },
    
    { id: 'sk1', name: 'Scharfschütze', desc: '5x Perfekte Runde (5/5)', icon: Zap, color: 'text-purple-500', achieved: stats.perfect >= 5 },
  ];

  const unlockedCount = BADGES.filter(b => b.achieved).length;
  const progressPercent = Math.round((unlockedCount / BADGES.length) * 100);

  return (
    <Background>
      <div className="w-full max-w-md flex flex-col h-[95vh] gap-4 px-2">
        
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
           <button onClick={onBack} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors">
              <ArrowLeft className="text-white"/>
           </button>
           <div className="flex flex-col">
               <h2 className="text-xl font-black text-white uppercase tracking-widest text-yellow-500">Hall of Fame</h2>
               <p className="text-xs text-neutral-400">{unlockedCount} / {BADGES.length} Freigeschaltet ({progressPercent}%)</p>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>
        
        {/* Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map(badge => {
               const Icon = badge.icon;
               return (
                 <div key={badge.id} className={`relative p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${badge.achieved ? 'bg-neutral-900/80 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-neutral-900/40 border-white/5 opacity-50 grayscale'}`}>
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-black border ${badge.achieved ? 'border-yellow-500/50' : 'border-white/10'}`}>
                        <Icon size={24} className={badge.achieved ? badge.color : 'text-neutral-600'} />
                    </div>

                    <div>
                        <h3 className={`font-black text-sm uppercase ${badge.achieved ? 'text-white' : 'text-neutral-500'}`}>{badge.name}</h3>
                        <p className="text-[10px] text-neutral-400 font-mono mt-1">{badge.desc}</p>
                    </div>

                    {!badge.achieved && <div className="absolute top-2 right-2 text-neutral-600"><Lock size={12} /></div>}
                    {badge.achieved && <div className="absolute top-2 right-2 text-green-500 animate-pulse"><CheckCircle size={14} /></div>}
                 </div>
               );
            })}
          </div>
        </div>
      </div>
    </Background>
  );
}