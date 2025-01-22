'use client';

import { FC, useEffect, useState } from 'react';

interface HeroTitleProps {
  name: string;
  role: string;
  tagline?: string;
}

const HeroTitle: FC<HeroTitleProps> = ({ name, role, tagline }) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= name.length; i++) {
        setTyped(name.slice(0, i));
        await new Promise(r => setTimeout(r, 100));
      }
    };
    typeText();
  }, [name]);

  return (
    <div className="text-center space-y-12">
      <h1 className="space-y-6">
        {/* Name with terminal prompt style */}
        <span className="block font-mono text-4xl md:text-6xl font-bold">
          <span className="text-neon-blue">$ </span>
          <span className="text-code-white ">{typed}</span>
          <span className="inline-block w-3 h-8 md:h-12 bg-neon-blue animate-cursor-blink" />
        </span>

        {/* Role with enhanced tech window style */}
        <div className="inline-block group">
          <div className="font-mono text-xl md:text-3xl font-medium 
            relative overflow-hidden rounded-lg
            border border-terminal-border bg-terminal-dark/85 backdrop-blur-sm
            transition-all duration-300 ease-in-out
            group-hover:border-neon-blue/30 group-hover:shadow-lg group-hover:shadow-neon-glow">
            {/* Window controls with hover effect */}
            <div className="absolute top-0 left-0 w-full px-4 py-2 
              bg-terminal-darker border-b border-terminal-border
              flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-75 hover:opacity-100 transition-opacity" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-75 hover:opacity-100 transition-opacity" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-75 hover:opacity-100 transition-opacity" />
              <span className="absolute left-1/2 -translate-x-1/2 text-sm text-code-gray opacity-50">bash</span>
            </div>
            {/* Role content with enhanced syntax */}
            <div className="px-6 pt-12 pb-4">
              <span className="text-neon-cyan">const</span>{' '}
              <span className="text-neon-purple">role</span>{' '}
              <span className="text-code-white">=</span>{' '}
              <span className="text-neon-blue relative group-hover:animate-pulse">&apos;{role}&apos;</span>
              <span className="text-code-gray">;</span>
            </div>
          </div>
        </div>
      </h1>

      {/* Enhanced README style */}
      {tagline && (
        <div className="max-w-2xl mx-auto">
          <div className="relative font-mono text-sm md:text-lg
            px-6 py-4 rounded-lg
            border border-terminal-border bg-terminal-dark/85
            backdrop-blur-sm group 
            hover:border-neon-blue/30 hover:shadow-lg hover:shadow-neon-glow
            transition-all duration-300">
            <div className="absolute -top-3 left-4 px-2 
              bg-terminal-dark text-neon-blue font-mono text-sm
              border-x border-t border-terminal-border
              group-hover:border-neon-blue/30 transition-colors">
              <span className="text-code-gray">📄 </span>README.md
            </div>
            <p>
              <span className="text-neon-blue"># </span>
              <span className="text-code-gray group-hover:text-code-white transition-colors">{tagline}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroTitle;
