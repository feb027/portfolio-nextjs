import { FC, ReactNode } from 'react';
import SkillProgress from './SkillProgress';

interface SkillCardProps {
  name: string;
  level: number;
  icon?: ReactNode;  // Changed from string to ReactNode
}

const SkillCard: FC<SkillCardProps> = ({ name, level, icon }) => {
  return (
    <div className="group relative font-mono hover:bg-terminal-dark/30 rounded transition-colors duration-200">
      {/* Main Container */}
      <div className="flex items-start p-3 gap-3">
        {/* Icon Column */}
        {icon && (
          <div className="text-xl text-neon-blue opacity-80 group-hover:opacity-100 transition-opacity pt-0.5">
            {icon}
          </div>
        )}
        
        {/* Content Column */}
        <div className="flex-1">
          {/* Skill Name Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-code-white font-semibold">
                {name}
              </span>
              <span className="text-xs text-code-gray opacity-50">
                .skill
              </span>
            </div>
            {/* Compact Progress on the right */}
            <div className="w-16">
              <SkillProgress level={level} showLabel={false} />
            </div>
          </div>
          
          {/* Code-like description */}
          <div className="text-[11px] text-code-gray">
            <span className="text-neon-purple">this</span>
            <span className="text-code-gray">.</span>
            <span className="text-neon-cyan">proficiency</span>
            <span> = </span>
            <span className="text-code-white">{level}</span>
            <span className="text-code-gray">;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
