import { FC } from 'react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

const FooterSocial: FC = () => {
  const socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: 'https://github.com/yourusername', icon: '🐱' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: '💼' },
    { platform: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' }
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-blue-400 transition-colors"
          aria-label={link.platform}
        >
          <span className="text-2xl">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;
