'use client';

import { FC } from 'react';

interface HeroTitleProps {
  name: string;
  role: string;
  tagline?: string;
}

const HeroTitle: FC<HeroTitleProps> = ({ name, role, tagline }) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold">
        <span className="block">{name}</span>
        <span className="block text-blue-400 mt-2">{role}</span>
      </h1>
      {tagline && (
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          {tagline}
        </p>
      )}
    </div>
  );
};

export default HeroTitle;
