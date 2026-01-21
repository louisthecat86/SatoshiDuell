import React from 'react';

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

export default PlayerName;