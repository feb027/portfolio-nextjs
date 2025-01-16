import React, { FC, JSX } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-md 
                     bg-terminal-dark/80 backdrop-blur-xs
                     hover:bg-terminal hover:scale-110
                     transition-all duration-300 ease-in-out
                     border border-terminal-border hover:border-neon-blue
                     hover:shadow-terminal hover:shadow-neon-blue/20
                     hover:animate-glow
                     before:absolute before:inset-0 before:rounded-md
                     before:bg-gradient-to-b before:from-neon-blue/0 
                     before:to-neon-blue/5 before:opacity-0
                     before:transition-opacity hover:before:opacity-100
                     after:absolute after:inset-0 after:rounded-md
                     after:bg-scanline after:animate-scanline
                     after:opacity-0 hover:after:opacity-10"
          aria-label={link.name}
        >
          <span className="relative text-2xl text-code-gray 
                         group-hover:text-neon-blue group-hover:animate-soft-pulse
                         transition-all duration-300">
            {link.icon}
          </span>
          <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 
                         px-3 py-1.5 rounded-md
                         text-xs font-mono text-neon-blue
                         bg-terminal-darker/95 backdrop-blur-xs
                         border border-neon-blue/20
                         opacity-0 scale-95 -translate-y-2
                         group-hover:opacity-100 group-hover:translate-y-0 
                         group-hover:scale-100
                         transition-all duration-300 ease-out
                         whitespace-nowrap shadow-terminal">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
