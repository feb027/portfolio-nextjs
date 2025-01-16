"use client"

import { FC, useState } from 'react';
import Image from 'next/image';

export const AboutImage: FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square max-w-md mx-auto p-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Terminal window frame with enhanced glow */}
      <div className="absolute inset-0 bg-terminal-darker/90 rounded-xl shadow-terminal group-hover:shadow-neon transition-shadow duration-500" />
      
      {/* Animated background layers */}
      <div className="absolute inset-2 bg-terminal-dark/85 rounded-lg backdrop-blur-sm group-hover:scale-[1.02] transition-transform duration-500" />
      
      {/* Main image container with glitch effect */}
      <div className="relative h-full rounded-lg overflow-hidden border border-terminal-border group-hover:border-neon-blue/30 transition-colors duration-300">
        {/* Enhanced scanline effect */}
        <div className="absolute inset-0 bg-scanline bg-repeat-y animate-scanline opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
        
        {/* Enhanced terminal header */}
        <div className="absolute top-0 w-full bg-terminal-darker/90 px-4 py-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors duration-200" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors duration-200" />
              <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors duration-200" />
            </div>
            <span className="text-xs text-code-gray font-mono ml-2 group-hover:text-neon-blue transition-colors duration-300">
              developer.profile
            </span>
          </div>
          <div className="text-xs text-code-gray font-mono animate-soft-pulse">
            {isHovered ? '▶Active' : '⏸ Idle'}
          </div>
        </div>
        
        {/* Image with glitch effect */}
        <div className="h-full pt-8 relative">
          <Image
            src="/sparkle.JPG" 
            alt="Developer profile"
            width={500}
            height={500}
            className="object-cover h-full w-full opacity-90 group-hover:opacity-100 
                       transition-all duration-300 group-hover:scale-105
                       hover:saturate-[1.1] relative z-[1]"
            priority
          />
          
          {/* Glitch layers */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay translate-x-[1px] translate-y-[1px]" />
            <div className="absolute inset-0 bg-neon-purple/10 mix-blend-difference -translate-x-[1px] translate-y-[-1px]" />
          </div>
        </div>

        {/* Enhanced neon glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-glow to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
      </div>
    </div>
  );
};
