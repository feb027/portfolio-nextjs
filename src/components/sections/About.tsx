'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion,  AnimatePresence } from 'framer-motion';
import { Code2, GitBranch, GitCommit, Terminal, Cpu, Globe2, GamepadIcon, BrainCircuit, ChevronRight, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiGit } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

const INTERESTS = [
  { icon: <Cpu size={14} />, label: "Technology & Innovation" },
  { icon: <Globe2 size={14} />, label: "Web Development" },
  { icon: <GamepadIcon size={14} />, label: "Gaming" },
  { icon: <BrainCircuit size={14} />, label: "Artificial Intelligence" },
];

const ImageModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-terminal-darker/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-3xl w-full bg-terminal-dark border border-terminal-border rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-2 bg-terminal-darker border-b border-terminal-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-code-gray">profile-full.png</span>
          </div>
          <button 
            onClick={onClose}
            className="text-code-gray hover:text-neon-blue transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/photo.JPG"
            alt="Developer profile"
            fill
            className="object-cover"
            priority
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const EXPERTISE = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: <SiReact className="w-4 h-4" /> },
      { name: "Next.js", icon: <SiNextdotjs className="w-4 h-4" /> },
      { name: "TypeScript", icon: <SiTypescript className="w-4 h-4" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4" /> },
      { name: "Framer Motion", icon: <SiFramer className="w-4 h-4" /> }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs className="w-4 h-4" /> },
      { name: "Express", icon: <SiExpress className="w-4 h-4" /> }
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <SiGit className="w-4 h-4" /> },
      { name: "VS Code", icon: <VscVscode className="w-4 h-4" /> }
    ]
  }
];

const AboutSection: FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'identity' | 'interests' | 'expertise'>('terminal');
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7, y: 5 },
    active: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
    >
      {/* Enhanced background effects */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,182,255,0.12) 0%, rgba(56,182,255,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={floatingAnimation}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
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
                About
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

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Profile */}
            <motion.div className="lg:col-span-4 space-y-6">
              {/* Profile Image with Interactive Elements */}
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                onClick={() => setIsModalOpen(true)}
              >
                {/* Terminal Header */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 bg-terminal-dark border-b border-terminal-border
                            p-2 flex items-center gap-4 rounded-t-lg z-10"
                  animate={{
                    borderColor: isImageHovered ? 'rgb(56,182,255,0.5)' : 'rgb(75,85,99)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-code-gray">
                    <Terminal size={10} />
                    <span>profile.png</span>
                  </div>
                </motion.div>

                {/* Image Container with Effects */}
                <motion.div 
                  className="relative rounded-lg overflow-hidden border border-terminal-border bg-terminal-dark"
                  animate={{
                    borderColor: isImageHovered ? 'rgb(56,182,255,0.5)' : 'rgb(75,85,99)',
                    scale: isImageHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-8">
                    <Image
                      src="/photo.JPG"
                      alt="Developer profile"
                      width={400}
                      height={400}
                      className="object-cover w-full aspect-square 
                               saturate-[0.85] group-hover:saturate-100 transition-all duration-300"
                      priority
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {isImageHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-transparent to-transparent
                                   flex items-end justify-center pb-8"
                        >
                          <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            className="flex items-center gap-2 text-neon-blue font-mono text-sm"
                          >
                            <Sparkles size={16} className="animate-pulse" />
                            <span>View Full Profile</span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Quick Info Card with Animation */}
              <motion.div 
                className="bg-terminal-dark/80 backdrop-blur-sm border border-terminal-border rounded-lg p-4"
                whileHover={{ scale: 1.02, borderColor: 'rgb(56,182,255,0.3)' }}
              >
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2 text-code-gray">
                    <GitBranch size={14} />
                    <span>Based in Tasikmalaya, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2 text-code-gray">
                    <GitCommit size={14} />
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2 text-code-gray">
                    <Code2 size={14} />
                    <span>3+ Years Experience</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Interactive Content */}
            <motion.div className="lg:col-span-8">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-4 font-mono text-sm overflow-x-auto pb-2">
                {[
                  { id: 'terminal', label: '> Terminal' },
                  { id: 'identity', label: '$ Identity' },
                  { id: 'interests', label: '# Interests' },
                  { id: 'expertise', label: '@ Expertise' },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'terminal' | 'identity' | 'interests' | 'expertise')}
                    className={`px-4 py-2 rounded-md border ${
                      activeTab === tab.id 
                        ? 'border-neon-blue/50 text-neon-blue bg-terminal-dark/80' 
                        : 'border-terminal-border text-code-gray hover:border-neon-blue/30'
                    }`}
                    variants={tabVariants}
                    animate={activeTab === tab.id ? 'active' : 'inactive'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Content Container */}
              <motion.div 
                className="bg-terminal-dark/80 backdrop-blur-sm border border-terminal-border rounded-lg p-6
                          hover:border-neon-blue/30 transition-colors duration-300"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'terminal' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-neon-blue">
                          <ChevronRight size={14} />
                          <span className="font-mono">about.exe</span>
                        </div>
                        <div className="pl-4 text-code-gray font-mono space-y-2">
                          <motion.p 
                            className="leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            &quot;A passionate Computer Science student and Full Stack Developer with a 
                            keen interest in modern web technologies. Currently pursuing my degree 
                            at Siliwangi University while actively developing web applications 
                            and exploring new technologies.&quot;
                          </motion.p>
                          {/* Add Blog Button */}
                          <motion.a
                            href="/blog"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-light/5 
                                      border border-terminal-border rounded-md text-code-gray 
                                      hover:text-neon-blue hover:border-neon-blue/30 
                                      transition-all duration-300"
                            whileHover={{ 
                              scale: 1.05,
                              x: 5
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <span className="font-mono text-sm">Read My Blog</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              →
                            </motion.span>
                          </motion.a>
                        </div>
                      </div>
                    )}

                    {activeTab === 'identity' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-neon-blue">const</span>
                          <span className="text-neon-purple">identity</span>
                          <span className="text-code-white">=</span>
                          <span className="text-code-gray">{'{'}</span>
                        </div>
                        <div className="pl-4 space-y-2 font-mono text-sm">
                          <div className="text-code-gray">
                            <span className="text-neon-purple">name:</span>
                            <span className="ml-2">&quot;Febnawan Fatur Rochman&quot;</span>,
                          </div>
                          <div className="text-code-gray">
                            <span className="text-neon-purple">age:</span>
                            <span className="ml-2">21</span>,
                          </div>
                          <div className="text-code-gray">
                            <span className="text-neon-purple">education:</span>
                            <span className="ml-2">&quot;Computer Science Student&quot;</span>,
                          </div>
                          <div className="text-code-gray">
                            <span className="text-neon-purple">university:</span>
                            <span className="ml-2">&quot;Siliwangi University&quot;</span>
                          </div>
                        </div>
                        <div className="font-mono text-code-gray">{'}'}</div>
                      </div>
                    )}

                    {activeTab === 'interests' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {INTERESTS.map((interest, index) => (
                            <motion.div
                              key={interest.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: 'rgba(56,182,255,0.1)',
                              }}
                              className="group flex items-center gap-2 text-sm font-mono bg-terminal-light/5 
                                       p-3 rounded-md cursor-pointer"
                            >
                              <motion.span 
                                className="text-neon-blue"
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              >
                                {interest.icon}
                              </motion.span>
                              <span className="text-code-gray group-hover:text-code-white transition-colors">
                                {interest.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'expertise' && (
                      <div className="space-y-6">
                        {EXPERTISE.map((category, index) => (
                          <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-neon-blue font-mono">#</span>
                              <span className="text-code-white font-mono">{category.category}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pl-4">
                              {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                  key={skill.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                                  className="group flex items-center gap-3 p-2 rounded-md
                                           bg-terminal-light/5 hover:bg-terminal-light/10
                                           transition-colors duration-300"
                                >
                                  <span className="text-neon-blue">{skill.icon}</span>
                                  <span className="text-code-gray group-hover:text-code-white 
                                                 transition-colors font-mono text-sm">
                                    {skill.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative code comments */}
        <motion.div 
          className="absolute bottom-4 left-4 text-code-gray/20 font-mono text-sm hidden lg:block"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {'/** @todo: Continue building amazing things */'}
        </motion.div>
        <motion.div 
          className="absolute top-8 right-4 text-code-gray/20 font-mono text-sm hidden lg:block"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          {'/* About Section */'}
        </motion.div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        <ImageModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
