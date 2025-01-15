import { FC } from 'react';
import SkillProgress from './SkillProgress';

interface SkillCardProps {
  name: string;
  level: number;
  icon?: string;
}

const SkillCard: FC<SkillCardProps> = ({ name, level, icon }) => {
  return (
    <div className="p-4 bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <span className="text-xl">{icon}</span>
        )}
        <h4 className="font-medium">{name}</h4>
      </div>
      <SkillProgress level={level} />
    </div>
  );
};

export default SkillCard;
