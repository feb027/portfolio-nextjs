'use client';

import { FC } from 'react';

interface SkillProgressProps {
  level: number;
  showLabel?: boolean;
}

const SkillProgress: FC<SkillProgressProps> = ({ level, showLabel = true }) => {
  return (
    <div className="group relative">
      {/* Progress Bar Container */}
      <div className="relative h-1.5 bg-terminal-light/5 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(96,165,250,0.05)_50%)] bg-[length:4px_4px]" />
        
        {/* Progress Bar */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue/40 to-neon-cyan/40 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${level}%` }}
        >
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 animate-soft-pulse opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] animate-gradient-shift" />
        </div>
      </div>

      {/* Tooltip Label */}
      {showLabel && (
        <div className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
          <div className="relative">
            <div className="px-2 py-1 bg-terminal-darker border border-terminal-border/50 rounded text-[10px] font-mono text-neon-blue shadow-lg backdrop-blur-sm">
              <span className="text-neon-purple">const</span>
              <span className="text-code-gray"> proficiency =</span>
              <span className="text-neon-cyan"> {level}</span>
              <span className="text-code-gray">;</span>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-terminal-darker border-r border-b border-terminal-border/50 transform rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillProgress;
