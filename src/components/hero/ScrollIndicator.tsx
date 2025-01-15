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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      aria-label="Scroll to content"
    >
      <svg
        className="w-6 h-6 text-slate-300"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </button>
  );
};

export default ScrollIndicator;
