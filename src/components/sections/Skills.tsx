'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
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
        {/* Enhanced Section Title - Matching Projects section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
            />
            <div className="py-4">
              <span className="text-code-gray font-mono text-sm mb-2 block">{'// SECTION'}</span>
              <h2 className="text-4xl font-mono text-code-white relative inline-block">
                <span className="text-neon-blue">&lt;</span>
                Skills
                <span className="text-neon-blue">/&gt;</span>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -right-8 top-1/2 w-6 h-px bg-neon-blue/30"
                  animate={{ width: [0, 24, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -left-8 top-1/2 w-6 h-px bg-neon-blue/30"
                  animate={{ width: [0, 24, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </h2>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
            />
          </div>
        </motion.div>

        {/* Enhanced IDE-style Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-neon-blue font-mono text-sm">
            <span className="text-code-gray">const</span> mySkills <span className="text-code-gray">=</span> <span className="text-neon-purple">Developer</span>.<span className="text-neon-cyan">skills</span>
          </div>
        </motion.div>

        {/* Enhanced Code Editor Container */}
        <motion.div 
          className="bg-terminal-darker rounded-lg border border-terminal-border overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Enhanced Tab Bar */}
          <div className="flex flex-wrap bg-terminal-dark border-b border-terminal-border">
            {Object.entries(SKILL_CATEGORIES).map(([key, category], index) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 font-mono text-xs flex items-center gap-2 border-r border-terminal-border transition-all duration-300
                  ${activeTab === key 
                    ? 'bg-terminal-darker text-neon-blue border-b-2 border-b-neon-blue' 
                    : 'text-code-gray hover:bg-terminal-darker/50'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(56, 182, 255, 0.03)' }}
              >
                {category.filename}
              </motion.button>
            ))}
          </div>

          {/* Enhanced Content Area */}
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
              <motion.div 
                key={key} 
                className={activeTab === key ? 'block' : 'hidden'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCategoryCard
                  title={category.title}
                  skills={category.skills}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
