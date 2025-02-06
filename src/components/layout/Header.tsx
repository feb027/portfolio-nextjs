'use client';

import { useState, FC, useEffect, useMemo } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import Logo from '../navigation/Logo';
import MenuButton from '../navigation/MenuButton';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import NoiseTexture from '../ui/NoiseTexture';

// Dynamically import MobileMenu
const MobileMenu = dynamic(() => import('../navigation/MobileMenu'), {
  loading: () => (
    <div className="md:hidden fixed inset-x-0 top-[73px] z-40 h-[calc(100vh-73px)] 
                    bg-terminal-darker/95 backdrop-blur-sm border-y border-terminal-border">
      <div className="flex items-center justify-center h-full">
        <div className="h-2 w-2 rounded-full bg-neon-blue animate-ping" />
      </div>
    </div>
  ),
  ssr: false // Since this is a client-side only component
});

// Main navigation items
const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Memoize NAV_ITEMS
  const NAV_ITEMS = useMemo(() => [
    { label: 'About', href: '#about' },
    { label: 'Why Me', href: '#why-hire-me' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ], []);

  // Create transform values
  const headerBackgroundOpacity = useTransform(scrollY, [0, 50], [0.6, 0.95]);
  const headerHeight = useTransform(scrollY, [0, 50], ['4.5rem', '3.5rem']);
  const scale = useTransform(scrollY, [0, 50], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 50], [0, 8]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  
  const activeSection = useActiveSection(
    ['#hero', '#about', '#why-hire-me', '#projects', '#skills', '#experience', '#testimonials', '#contact'],
    {
      defaultSection: '#hero',
      threshold: 0.6,
      rootMargin: '-10% 0px'
    }
  );

  // Update spring config to be smoother
  const springConfig = {
    type: "spring",
    stiffness: 300, // Reduced from 400
    damping: 25,    // Reduced from 30
    mass: 0.5       // Added mass for smoother motion
  };

  return (
    <motion.header 
      style={{ height: headerHeight }}
      className="fixed w-full top-0 z-[100] transition-all duration-300"
      initial={false}
    >
      {/* Enhanced Glassmorphism Background */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-[12px]"
        style={{ opacity: headerBackgroundOpacity }}
      >
        {/* Base layer */}
        <div className="absolute inset-0 bg-terminal-dark/80" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-darker/40 to-transparent" />
        
        {/* Border with enhanced contrast */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r 
                      from-transparent via-terminal-border/80 to-transparent" />
      </motion.div>

      {/* Noise Texture */}
      <NoiseTexture />

      {/* Enhanced Ambient Glow */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ opacity: headerBackgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 via-transparent to-neon-blue/5" />
      </motion.div>

      {/* Enhanced Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] 
                      bg-[length:100%_4px] animate-scanline opacity-20" />
      </div>

      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-full relative">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div style={{ scale: scale }} className="origin-left w-[120px]">
            <Logo className="w-full" />
          </motion.div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.div 
              style={{ scale: scale }}
              className="flex items-center gap-1 bg-terminal-darker/30 backdrop-blur-sm 
                        border border-terminal-border rounded-full p-1 mx-auto"
              layout
              layoutRoot // Add this to prevent child layout animations
              initial={false} // Prevent initial animation
            >
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-mono transition-colors
                            ${activeSection === item.href 
                              ? 'text-neon-blue' 
                              : 'text-code-gray hover:text-neon-blue'}`}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 } 
                  }}
                >
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-terminal-light/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 0.2
                      }}
                      initial={false}
                    />
                  )}
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Status Indicator & Mobile Menu Button */}
          <motion.div 
            style={{ scale: scale }} 
            className="flex items-center gap-4 origin-right"
            initial={false}
          >
            <motion.div 
              className={`hidden md:flex items-center gap-2 bg-terminal-darker/30 px-3 py-1 
                        rounded-full border border-terminal-border`}
              animate={{
                scale: isScrolled ? 0.9 : 1
              }}
              initial={false}
              transition={{
                duration: 0.2,
                ease: "easeInOut"
              }}
            >
              <div className="h-2 w-2 rounded-full bg-neon-blue animate-blink 
                            shadow-[0_0_8px_#60A5FA] ring-1 ring-neon-blue/50" />
              <span className="text-sm font-mono text-code-gray tracking-wider">
                <span className="text-neon-blue">&gt;</span> online
              </span>
            </motion.div>
            <MenuButton 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-code-white hover:text-neon-blue transition-colors"
            />
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        items={NAV_ITEMS}
        activeSection={activeSection}
        onClose={() => setIsMenuOpen(false)}
      />
    </motion.header>
  );
};

export default Header;