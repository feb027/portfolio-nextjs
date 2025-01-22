'use client';

import { FC } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import HeroBackground from '../hero/HeroBackground';
import HeroTitle from '../hero/HeroTitle';
import SocialLinks from '../hero/SocialLinks';
import ScrollIndicator from '../hero/ScrollIndicator';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: <FaGithub /> },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: <FaLinkedin /> },
  { name: 'X', url: 'https://twitter.com/yourusername', icon: <FaXTwitter /> },
];

const Hero: FC = () => {
  return (
    <section 
      id="hero" 
      className="min-h-[100vh] flex items-center relative overflow-hidden"
      style={{
        marginTop: '-64px', // Adjust this value to match your header height
        paddingTop: '64px'  // Add padding top to compensate for the margin
      }}
    >
      <HeroBackground />
      
      <div className="container mx-auto px-4">
        <HeroTitle
          name="Febnawan Fatur Rochman"
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
