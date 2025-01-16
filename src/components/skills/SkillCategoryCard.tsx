import { FC, ReactNode } from 'react';
import SkillCard from './SkillCard';

interface SkillCategoryCardProps {
  title: string;
  skills: {
    name: string;
    level: number;
    icon?: ReactNode;  // Changed from string to ReactNode
  }[];
}

const SkillCategoryCard: FC<SkillCategoryCardProps> = ({ title, skills }) => {
  return (
    <div className="relative group bg-terminal-dark/20 rounded-md">
      {/* File Path Header */}
      <div className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-code-gray border-b border-terminal-border">
        <span className="text-neon-purple">~/skills/</span>
        <span className="text-code-white">{title.toLowerCase().replace(' ', '-')}</span>
      </div>

      {/* Code Area - fixed layout */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="hidden sm:block py-4 px-3 text-right font-mono text-xs text-terminal-light/50 select-none border-r border-terminal-border">
          {skills.map((_, i) => (
            <div key={i} className="h-[42px] leading-[42px]">{i + 1}</div>
          ))}
        </div>

        {/* Skills Content - fixed layout */}
        <div className="flex-1 p-4">
          {/* Export Statement */}
          <div className="font-mono text-xs mb-3">
            <span className="text-neon-purple">export</span>
            <span className="text-code-white"> const </span>
            <span className="text-neon-cyan">{title.replace(' ', '')}</span>
            <span className="text-code-white"> = </span>
            <span className="text-code-gray">{'{'}</span>
          </div>

          {/* Skills List */}
          <div className="space-y-1.5 pl-4 mb-2">
            {skills.map((skill) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                level={skill.level}
                icon={skill.icon}
              />
            ))}
          </div>

          <span className="text-code-gray ml-0.5">{'}'}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCategoryCard;
