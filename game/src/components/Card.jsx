import React from 'react';

const Card = ({ children, className = "" }) => (
  <div className={`glass-panel rounded-2xl p-5 ${className} transition-all duration-300 hover:border-orange-500/30`}>
    {children}
  </div>
);

export default Card;