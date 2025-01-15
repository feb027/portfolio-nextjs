'use client';

import { FC } from 'react';

interface SkillProgressProps {
  level: number;
  showLabel?: boolean;
}

const SkillProgress: FC<SkillProgressProps> = ({ level, showLabel = true }) => {
  return (
    <div className="w-full">
      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-slate-400 mt-1">{level}%</span>
      )}
    </div>
  );
};

export default SkillProgress;
