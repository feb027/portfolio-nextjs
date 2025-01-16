import { FC, ReactNode } from 'react';
import SkillCard from './SkillCard';

interface SkillCategoryCardProps {
  title: string;
  skills: {
    name: string;
    level: number;
    icon?: ReactNode;
  }[];
}

const SkillCategoryCard: FC<SkillCategoryCardProps> = ({ title, skills }) => {
  return (
    <div className="relative group bg-terminal-dark/20 backdrop-blur-sm rounded-lg border border-terminal-border hover:border-terminal-light/20 transition-colors duration-300">
      {/* Window Controls */}
      <div className="absolute top-3 left-4 flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-light/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-light/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-terminal-light/20" />
      </div>

      {/* File Path Header */}
      <div className="flex items-center justify-center px-4 py-2 font-mono text-xs text-code-gray border-b border-terminal-border bg-terminal-darker/50">
        <span className="text-neon-purple">~/skills/</span>
        <span className="text-code-white">{title.toLowerCase().replace(' ', '-')}</span>
        <span className="text-neon-cyan">.tsx</span>
      </div>

      {/* Code Area */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="hidden sm:block py-4 px-3 text-right font-mono text-xs text-terminal-light/30 select-none border-r border-terminal-border bg-terminal-darker/30">
          {skills.map((_, i) => (
            <div key={i} className="h-[42px] leading-[42px]">{String(i + 1).padStart(2, '0')}</div>
          ))}
        </div>

        {/* Skills Content */}
        <div className="flex-1 p-4">
          {/* Export Statement */}
          <div className="font-mono text-xs mb-3 group-hover:text-shadow-sm transition-all duration-300">
            <span className="text-neon-purple">export</span>
            <span className="text-code-white"> const </span>
            <span className="text-neon-cyan font-medium">{title.replace(' ', '')}</span>
            <span className="text-code-white"> = </span>
            <span className="text-code-gray">{'{'}</span>
          </div>

          {/* Skills List */}
          <div className="space-y-1.5 pl-4 mb-2">
            {skills.map((skill, index) => (
              <div key={skill.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <SkillCard
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                />
              </div>
            ))}
          </div>

          <span className="text-code-gray ml-0.5">{'}'}</span>
        </div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03] animate-scanline" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg animate-glow" />
      </div>
    </div>
  );
};

export default SkillCategoryCard;
