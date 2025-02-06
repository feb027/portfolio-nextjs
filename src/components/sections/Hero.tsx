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
  
  // Adjusted parallax effects for smoother transitions
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
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
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        {/* Improved gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/80" />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
        
        {/* Increased number of particles for better effect */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
            animate={{
              x: ['0%', `${Math.random() * 100}%`],
              y: ['0%', `${Math.random() * 100}%`],
              scale: [1, Math.random() * 0.5 + 1, 1],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center space-y-12 sm:space-y-16" // Reduced spacing
          style={{ scale }}
        >
          {/* Main Content Container */}
          <motion.div 
            className="space-y-8 sm:space-y-12" // Adjusted spacing
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Name Section */}
            <div className="relative inline-block">
              <motion.span 
                className="block font-mono text-4xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent
                         bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple
                         drop-shadow-[0_0_10px_rgba(56,182,255,0.3)]" // Added glow effect
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <span className="text-neon-blue drop-shadow-[0_0_5px_rgba(56,182,255,0.5)]">$ </span>
                <span>{typed}</span>
                <span className="inline-block w-2 sm:w-3 h-8 sm:h-10 md:h-14 bg-neon-blue animate-cursor-blink" />
              </motion.span>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 blur-2xl bg-neon-blue/10 -z-10" />
            </div>

            {/* Enhanced Role Display */}
            <motion.div 
              className="inline-block group perspective-1000"
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <div className="relative transform-gpu transition-all duration-500 group-hover:scale-105">
                <div className="font-mono text-xl sm:text-2xl md:text-4xl font-medium p-4 sm:p-6
                             border border-terminal-border rounded-lg
                             bg-terminal-dark/85 backdrop-blur-md
                             group-hover:border-neon-blue/30 group-hover:shadow-lg group-hover:shadow-neon-glow
                             transition-all duration-300">
                  <span className="text-neon-cyan">const</span>{' '}
                  <span className="text-neon-purple">role</span>{' '}
                  <span className="text-code-white">=</span>{' '}
                  <span className="text-neon-blue">&apos;Full Stack Developer&apos;</span>
                  <span className="text-code-gray">;</span>
                </div>
                
                {/* Enhanced decorative lines */}
                <div className="absolute -left-2 sm:-left-4 top-1/2 w-4 sm:w-8 h-px bg-gradient-to-r from-neon-blue to-transparent" />
                <div className="absolute -right-2 sm:-right-4 top-1/2 w-4 sm:w-8 h-px bg-gradient-to-l from-neon-blue to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.div 
            className="max-w-xl sm:max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative group">
              <div className="px-4 sm:px-8 py-3 sm:py-5 rounded-lg border border-terminal-border 
                           bg-terminal-dark/85 backdrop-blur-md
                           group-hover:border-neon-blue/30 group-hover:shadow-lg
                           transition-all duration-300">
                <p className="font-mono text-sm sm:text-base md:text-xl">
                  <span className="text-neon-blue"># </span>
                  <span className="text-code-gray group-hover:text-code-white transition-colors">
                    Building beautiful and performant web applications with modern technologies
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div 
            className="flex justify-center gap-4 sm:gap-8"
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
                className="group relative p-3 sm:p-4 rounded-md 
                         bg-terminal-dark/80 backdrop-blur-sm
                         hover:bg-terminal hover:scale-110
                         transition-all duration-300
                         border border-terminal-border hover:border-neon-blue
                         hover:shadow-lg hover:shadow-neon-glow/20"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <span className="text-xl sm:text-2xl text-code-gray group-hover:text-neon-blue 
                               transition-all duration-300">
                  {link.icon}
                </span>
                <span className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 
                               px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-mono
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

      {/* Enhanced Scroll Indicator */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.button
            onClick={scrollToContent}
            className="relative group flex flex-col items-center"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Label */}
            <span className="font-mono text-[10px] sm:text-xs text-code-gray group-hover:text-neon-blue
                         transition-colors duration-300 mb-2">
              scroll down
            </span>

            {/* Animated Arrow Container */}
            <div className="relative">
              {/* Button Background */}
              <div className="p-2 sm:p-3 rounded-xl bg-terminal-dark/85 backdrop-blur-md 
                           border border-terminal-border group-hover:border-neon-blue/30
                           transition-all duration-300
                           group-hover:shadow-lg group-hover:shadow-neon-glow/20">
                {/* Arrow Icon */}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-neon-blue group-hover:text-neon-active
                           transition-colors duration-300"
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

              {/* Animated Rings */}
              <motion.div
                className="absolute -inset-1 rounded-xl border border-neon-blue/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -inset-2 rounded-xl border border-neon-blue/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </div>

            {/* Mouse Wheel Animation */}
            <motion.div 
              className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <div className="w-4 sm:w-5 h-7 sm:h-8 rounded-full border-2 border-neon-blue/30 
                           flex items-start justify-center p-1">
                <motion.div
                  className="w-1 h-1.5 rounded-full bg-neon-blue/50"
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
