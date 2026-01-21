import React from 'react';

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

export default Background;