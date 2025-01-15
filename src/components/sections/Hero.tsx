'use client';

import { FC } from 'react';
import HeroBackground from '../hero/HeroBackground';
import HeroTitle from '../hero/HeroTitle';
import SocialLinks from '../hero/SocialLinks';
import ScrollIndicator from '../hero/ScrollIndicator';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: '🐱' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' },
];

const Hero: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <HeroBackground />
      
      <div className="container mx-auto px-4">
        <HeroTitle
          name="Your Name"
          role="Full Stack Developer"
          tagline="Building beautiful and performant web applications with modern technologies"
        />
        
        <SocialLinks links={SOCIAL_LINKS} />
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
