import { FC } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex justify-center gap-8 mt-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-lg bg-terminal-light/10 
                     hover:bg-terminal-light/20 transition-all duration-300
                     border border-terminal-border hover:border-neon-blue/30
                     animate-border-glow"
          aria-label={link.name}
        >
          <span className="text-2xl text-code-gray group-hover:text-neon-blue 
                         transition-all duration-300 group-hover:animate-text-glow">
            {link.icon}
          </span>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                         text-sm text-code-gray opacity-0 group-hover:opacity-100 
                         transition-all duration-300 font-mono">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
