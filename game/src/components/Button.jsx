import React from 'react';

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

export default Button;