import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {
  text?: string;
}

const Logo: FC<LogoProps> = () => {
  return (
    <Link 
      href="#hero" 
      className="group relative font-mono text-2xl font-bold tracking-tighter"
      aria-label="FFR Logo - Return to Home"
    >
      <span className="relative inline-block">
        {/* Animated brackets */}
        <span className="absolute -left-4 text-neon-blue/50 transition-all duration-300 
                      group-hover:-translate-x-1 group-hover:text-neon-active">
          [
        </span>
        
        {/* Main text with gradient */}
        <span className="relative z-10 bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple 
                      bg-clip-text text-transparent">
          FFR
        </span>
        
        {/* Closing bracket */}
        <span className="absolute -right-4 text-neon-blue/50 transition-all duration-300 
                      group-hover:translate-x-1 group-hover:text-neon-active">
          ]
        </span>
        
        {/* Glow effects */}
        <span className="absolute -inset-1 -z-10 blur-[8px] bg-neon-glow opacity-0 
                      scale-150 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Border glow on hover */}
        <span className="absolute -inset-2 -z-20 rounded-lg border border-terminal-border 
                      opacity-0 transition-all duration-300 group-hover:opacity-100 
                      group-hover:animate-border-glow" />
      </span>
    </Link>
  );
};

export default Logo;
