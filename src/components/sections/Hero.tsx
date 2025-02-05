'use client';

import { FC, useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/feb027', icon: <FaGithub /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/febnawan-fr/', icon: <FaLinkedin /> },
  { name: 'Instagram', url: 'https://instagram.com/feb07_', icon: <FaInstagram /> },
];

const Hero: FC = () => {
  const [typed, setTyped] = useState('');
  const { scrollY } = useScroll();
  
  // Parallax and fade effects
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Typing effect
  useEffect(() => {
    const name = "Febnawan Fatur Rochman";
    const typeText = async () => {
      for (let i = 0; i <= name.length; i++) {
        setTyped(name.slice(0, i));
        await new Promise(r => setTimeout(r, 100));
      }
    };
    typeText();
  }, []);

  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      style={{ y, opacity }}
      id="hero" 
      className="min-h-[100vh] relative overflow-hidden flex items-center"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
        
        {/* Grid pattern with glow effect */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Floating particles effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
            animate={{
              x: ['0%', `${Math.random() * 100}%`],
              y: ['0%', `${Math.random() * 100}%`],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center space-y-24"
          style={{ scale }}
        >
          {/* Main Title */}
          <motion.div 
            className="space-y-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Name Section */}
            <div className="relative inline-block">
              <motion.span 
                className="block font-mono text-5xl md:text-7xl font-bold bg-clip-text text-transparent
                         bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <span className="text-neon-blue">$ </span>
                <span>{typed}</span>
                <span className="inline-block w-3 h-10 md:h-14 bg-neon-blue animate-cursor-blink" />
              </motion.span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 blur-xl bg-neon-blue/20 -z-10" />
            </div>

            {/* Role Display */}
            <motion.div 
              className="inline-block group perspective-1000"
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <div className="relative transform-gpu transition-all duration-500 group-hover:scale-105">
                <div className="font-mono text-2xl md:text-4xl font-medium p-6
                             border border-terminal-border rounded-lg
                             bg-terminal-dark/85 backdrop-blur-md
                             group-hover:border-neon-blue/30 group-hover:shadow-lg group-hover:shadow-neon-glow">
                  <span className="text-neon-cyan">const</span>{' '}
                  <span className="text-neon-purple">role</span>{' '}
                  <span className="text-code-white">=</span>{' '}
                  <span className="text-neon-blue">&apos;Full Stack Developer&apos;</span>
                  <span className="text-code-gray">;</span>
                </div>
                
                {/* Decorative code lines */}
                <div className="absolute -left-4 top-1/2 w-8 h-px bg-gradient-to-r from-neon-blue to-transparent" />
                <div className="absolute -right-4 top-1/2 w-8 h-px bg-gradient-to-l from-neon-blue to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Tagline - with adjusted spacing */}
          <motion.div 
            className="max-w-2xl mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative group">
              <div className="px-8 py-5 rounded-lg border border-terminal-border 
                           bg-terminal-dark/85 backdrop-blur-md
                           group-hover:border-neon-blue/30 group-hover:shadow-lg">
                <p className="font-mono text-base md:text-xl">
                  <span className="text-neon-blue"># </span>
                  <span className="text-code-gray group-hover:text-code-white transition-colors">
                    Building beautiful and performant web applications with modern technologies
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links - with adjusted spacing */}
          <motion.div 
            className="flex justify-center gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-md 
                         bg-terminal-dark/80 backdrop-blur-sm
                         hover:bg-terminal hover:scale-110
                         transition-all duration-300
                         border border-terminal-border hover:border-neon-blue"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <span className="text-2xl text-code-gray group-hover:text-neon-blue 
                               transition-all duration-300">
                  {link.icon}
                </span>
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 
                               px-3 py-1.5 rounded-md text-xs font-mono
                               text-neon-blue bg-terminal-darker/95
                               opacity-0 group-hover:opacity-100 transform
                               transition-all duration-300 whitespace-nowrap">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-code-gray group-hover:text-neon-blue">
            scroll down
          </span>
          <div className="p-2 rounded-lg bg-terminal-dark/85 backdrop-blur-sm 
                       border border-terminal-border group-hover:border-neon-blue/30">
            <svg
              className="w-5 h-5 text-neon-blue group-hover:text-neon-active"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </motion.button>
    </motion.section>
  );
};

export default Hero;
