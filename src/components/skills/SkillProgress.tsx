'use client';

import { FC } from 'react';

interface SkillProgressProps {
  level: number;
  showLabel?: boolean;
}

const SkillProgress: FC<SkillProgressProps> = ({ level, showLabel = true }) => {
  return (
    <div className="group">
      <div className="relative h-1 bg-terminal-light/10 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
        >
          <div className="absolute inset-0 animate-pulse opacity-50" />
        </div>
      </div>
      {showLabel && (
        <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-terminal-darker px-1.5 py-0.5 rounded text-[10px] text-neon-blue font-mono shadow-lg">
            {level}%
          </span>
        </div>
      )}
    </div>
  );
};

export default SkillProgress;
