import { FC, ReactNode } from 'react';
import SkillProgress from './SkillProgress';

interface SkillCardProps {
  name: string;
  level: number;
  icon?: ReactNode;
}

const SkillCard: FC<SkillCardProps> = ({ name, level, icon }) => {
  return (
    <div className="group relative font-mono hover:bg-terminal-dark/30 rounded transition-all duration-300 hover:translate-x-1">
      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-terminal-border/20" />

      {/* Main Container */}
      <div className="relative flex items-start p-3 gap-3">
        {/* Icon Column with Animation */}
        {icon && (
          <div className="flex-shrink-0 w-6 text-xl text-neon-blue opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 transform">
            {icon}
          </div>
        )}
        
        {/* Content Column */}
        <div className="flex-1 space-y-2">
          {/* Skill Name Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-code-white group-hover:text-neon-blue transition-colors duration-300">
                {name}
              </span>
              <span className="text-[10px] text-code-gray opacity-50 group-hover:opacity-70">
                {'.skill{}'} 
              </span>
            </div>
          </div>
          
          {/* Code-like description with syntax highlighting */}
          <div className="flex flex-col gap-1">
            <div className="text-[11px] leading-none">
              <span className="text-neon-purple">const</span>
              <span className="text-code-white"> level </span>
              <span className="text-code-gray">=</span>
              <span className="text-neon-cyan"> {level}</span>
              <span className="text-code-gray">;</span>
            </div>
            
            {/* Progress Bar */}
            <div className="pt-1">
              <SkillProgress level={level} />
            </div>
          </div>
        </div>
      </div>

      {/* Hover Highlight Effect */}
      <div className="absolute left-0 top-0 w-1 h-full bg-neon-blue/0 group-hover:bg-neon-blue/30 transition-all duration-300 rounded-l" />
    </div>
  );
};

export default SkillCard;
