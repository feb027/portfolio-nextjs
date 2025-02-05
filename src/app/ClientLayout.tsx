'use client';

import { useEffect, useRef, useState } from 'react';
import { GridBackground } from '@/components/layout/GridBackground';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Add interface for particle type
interface Particle {
  id: number;
  left: string;
  opacity: number;
  duration: number;
  delay: number;
  x: number;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth scroll progress for various effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for parallax and other effects
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [0.5, 0.2]);
  const gridScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Type the state array
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Wrap all window access in useEffect
    const handleScrollRestoration = () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    };

    handleScrollRestoration();

    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      x: Math.random() * 100,
    })));
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated background elements */}
      <motion.div 
        style={{ 
          y: backgroundY,
          scale: gridScale,
        }}
        className="fixed inset-0 -z-10"
      >
        <motion.div style={{ opacity: backgroundOpacity }}>
          <GridBackground />
        </motion.div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-neon-blue origin-left z-[101]"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-neon-blue/20 rounded-full"
            animate={{
              x: ['0vw', `${particle.x}vw`],
              y: ['-10vh', '110vh'],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: particle.delay,
            }}
            style={{
              left: particle.left,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Main content with scroll-triggered animations */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1], [1, 1]),
        }}
      >
        {children}
      </motion.div>

      {/* Scroll-to-top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-terminal-darker/80 
                 border border-terminal-border backdrop-blur-sm z-50
                 text-neon-blue hover:text-neon-active transition-colors
                 shadow-lg shadow-terminal-darker/20"
        initial={{ opacity: 0, y: 20 }}
        style={{ 
          opacity: useTransform(scrollY, [100, 200], [0, 1]),
          y: useTransform(scrollY, [100, 200], [20, 0])
        }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}
