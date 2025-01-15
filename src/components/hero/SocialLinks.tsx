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
    <div className="flex justify-center gap-6 mt-8">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-blue-400 transition-colors"
          aria-label={link.name}
        >
          <span className="text-2xl">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
