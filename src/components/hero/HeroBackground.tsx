'use client';

import { FC } from 'react';

const HeroBackground: FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    </div>
  );
};

export default HeroBackground;
