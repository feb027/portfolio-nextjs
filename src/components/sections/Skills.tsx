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
    <section id="skills" className="py-20 min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Section title with code-like decoration */}
      <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">// SKILLS</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Skills
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
        
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
