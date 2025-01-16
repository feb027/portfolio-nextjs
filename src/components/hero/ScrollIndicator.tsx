'use client';

import { FC } from 'react';

const ScrollIndicator: FC = () => {
  const scrollToContent = () => {
    const projectsSection = document.getElementById('about');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContent}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 group"
      aria-label="Scroll to content"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-code-gray group-hover:text-neon-blue transition-colors">
          scroll down
        </span>
        <div className="p-2 rounded-lg bg-terminal-dark/85 backdrop-blur-sm border border-terminal-border group-hover:border-neon-blue/30 transition-colors animate-soft-pulse">
          <svg
            className="w-5 h-5 text-neon-blue group-hover:text-neon-active transition-colors"
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
    </button>
  );
};

export default ScrollIndicator;
