import { FC } from 'react';
import SkillCard from './SkillCard';

interface SkillCategoryCardProps {
  title: string;
  skills: {
    name: string;
    level: number;
    icon?: string;
  }[];
}

const SkillCategoryCard: FC<SkillCategoryCardProps> = ({ title, skills }) => {
  return (
    <div className="skill-category">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCategoryCard;
