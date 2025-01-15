'use client';

import { FC } from 'react';
import SkillCategoryCard from '../skills/SkillCategoryCard';

interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number;
    icon?: string;
  }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      // Add more skills as needed
    ],
  },
  // ...Add more categories as needed
];

const SkillsSection: FC = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
