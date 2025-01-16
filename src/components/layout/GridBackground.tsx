"use client"

import { FC, useEffect, useState } from 'react';

export const GridBackground: FC = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = currentScroll / maxScroll;
      const opacity = Math.max(0.1, 1 - scrollPercentage * 0.5);
      setScrollOpacity(opacity);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax effect based on mouse position
      const x = (e.clientX / window.innerWidth - 0.5) * 5;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Animated grid pattern with parallax */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ 
            opacity: scrollOpacity * 0.2,
            backgroundImage: `
              linear-gradient(to right, #1E293B 1px, transparent 1px),
              linear-gradient(to bottom, #1E293B 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
          }}
        />

      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }

        .animate-gradient-slow {
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </>
  );
};
