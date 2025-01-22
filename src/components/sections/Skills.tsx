'use client';

import { FC, useState } from 'react';
import SkillCategoryCard from '../skills/SkillCategoryCard';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaLinux, FaAws, FaBrain } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiRedux, SiExpress, SiPostgresql, SiMongodb, SiGithubactions } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineApartment } from "react-icons/ai";

const SKILL_CATEGORIES = {
  frontend: {
    title: 'Frontend Development',
    filename: 'frontend.tsx',
    skills: [
      { name: 'React', level: 90, icon: <FaReact /> },
      { name: 'TypeScript', level: 85, icon: <SiTypescript /> },
      { name: 'Next.js', level: 85, icon: <RiNextjsFill /> },
      { name: 'TailwindCSS', level: 90, icon: <SiTailwindcss /> },
      { name: 'Redux', level: 80, icon: <SiRedux /> }
    ]
  },
  backend: {
    title: 'Backend Development',
    filename: 'backend.ts',
    skills: [
      { name: 'Node.js', level: 85, icon: <FaNodeJs /> },
      { name: 'Express', level: 80, icon: <SiExpress /> },
      { name: 'PostgreSQL', level: 75, icon: <SiPostgresql /> },
      { name: 'MongoDB', level: 80, icon: <SiMongodb /> },
      { name: 'REST API', level: 90, icon: <TbApi /> }
    ]
  },
  devtools: {
    title: 'Development Tools',
    filename: 'devtools.config.ts',
    skills: [
      { name: 'Git', level: 90, icon: <FaGitAlt /> },
      { name: 'Docker', level: 75, icon: <FaDocker /> },
      { name: 'AWS', level: 70, icon: <FaAws /> },
      { name: 'Linux', level: 80, icon: <FaLinux /> },
      { name: 'CI/CD', level: 75, icon: <SiGithubactions /> }
    ]
  },
  soft: {
    title: 'Professional Skills',
    filename: 'professional.md',
    skills: [
      { name: 'Team Collaboration', level: 95, icon: <HiUserGroup /> },
      { name: 'Problem Solving', level: 90, icon: <FaBrain /> },
      { name: 'Communication', level: 85, icon: <BiMessageRoundedDetail /> },
      { name: 'Project Management', level: 80, icon: <PiProjectorScreenChartFill /> },
      { name: 'Agile/Scrum', level: 85, icon: <AiOutlineApartment /> }
    ]
  }
};

const SkillsSection: FC = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl"> 
        {/* Section title with code-like decoration */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">{'// SKILLS'}</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Skill
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
        {/* IDE-style Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="text-neon-blue font-mono text-sm"> {/* Reduced text size */}
            <span className="text-code-gray">const</span> mySkills <span className="text-code-gray">=</span> <span className="text-neon-purple">Developer</span>.<span className="text-neon-cyan">skills</span>
          </div>
        </div>

        {/* Code Editor Container */}
        <div className="bg-terminal-darker rounded-lg border border-terminal-border overflow-hidden shadow-lg"> {/* Added shadow */}
          {/* Tab Bar */}
          <div className="flex flex-wrap bg-terminal-dark border-b border-terminal-border"> {/* Added flex-wrap */}
            {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 font-mono text-xs flex items-center gap-2 border-r border-terminal-border transition-colors
                  ${activeTab === key 
                    ? 'bg-terminal-darker text-neon-blue border-b-2 border-b-neon-blue' 
                    : 'text-code-gray hover:bg-terminal-darker/50'}`}
              >
                {category.filename}
              </button>
            ))}
          </div>

          {/* Content Area - adjusted padding */}
          <div className="p-5"> {/* Increased padding for better spacing */}
            {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
              <div key={key} className={activeTab === key ? 'block' : 'hidden'}>
                <SkillCategoryCard
                  title={category.title}
                  skills={category.skills}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
