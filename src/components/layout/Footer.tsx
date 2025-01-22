import { FC } from 'react';
import Link from 'next/link';
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiMail,
  FiCodepen 
} from 'react-icons/fi';
import { 
  SiNextdotjs,
  SiTypescript,
  SiReact 
} from 'react-icons/si';

const SocialLink: FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-code-syntax-variable hover:text-code-accent transition-colors"
  >
    <span className="text-xl group-hover:scale-110 transition-transform">
      {icon}
    </span>
    <span className="text-sm font-mono">{label}</span>
  </a>
);

const TechBadge: FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => (
  <div className="flex items-center gap-1 text-code-syntax-comment">
    <span className="text-lg">{icon}</span>
    <span className="text-xs font-mono">{name}</span>
  </div>
);

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-code-bg border-t border-code-surface/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="inline-block">
              <h3 className="text-xl font-mono bg-clip-text text-transparent bg-accent-gradient">
                {'<Portfolio />'}
              </h3>
            </div>
            <p className="text-code-syntax-comment font-mono text-sm">
              Building digital experiences with clean, elegant code
            </p>
            <div className="flex gap-3">
              <TechBadge icon={<SiReact />} name="React" />
              <TechBadge icon={<SiNextdotjs />} name="Next.js" />
              <TechBadge icon={<SiTypescript />} name="TypeScript" />
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h4 className="text-code-syntax-keyword font-mono text-lg">
              {'function Navigation() {'}
            </h4>
            <nav className="grid grid-cols-2 gap-3 pl-4 border-l border-code-surface/30">
              <Link href="#about" className="text-code-syntax-string hover:text-code-accent transition-colors font-mono text-sm">
                .about()
              </Link>
              <Link href="#projects" className="text-code-syntax-string hover:text-code-accent transition-colors font-mono text-sm">
                .projects()
              </Link>
              <Link href="#skills" className="text-code-syntax-string hover:text-code-accent transition-colors font-mono text-sm">
                .skills()
              </Link>
              <Link href="#contact" className="text-code-syntax-string hover:text-code-accent transition-colors font-mono text-sm">
                .contact()
              </Link>
            </nav>
            <span className="text-code-syntax-keyword font-mono text-sm">{'}'}</span>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h4 className="text-code-syntax-function font-mono text-lg">
              connect.social
            </h4>
            <div className="grid gap-3 pl-4 border-l border-code-surface/30">
              <SocialLink href="https://github.com" icon={<FiGithub />} label="github" />
              <SocialLink href="https://twitter.com" icon={<FiTwitter />} label="twitter" />
              <SocialLink href="https://linkedin.com" icon={<FiLinkedin />} label="linkedin" />
              <SocialLink href="https://codepen.io" icon={<FiCodepen />} label="codepen" />
              <SocialLink href="mailto:contact@example.com" icon={<FiMail />} label="email" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-code-surface/30 text-center">
          <p className="text-code-syntax-comment text-sm font-mono">
            <span className="text-code-syntax-keyword">const</span>{' '}
            <span className="text-code-syntax-variable">signature</span> ={' '}
            <span className="text-code-syntax-string">
              `© ${year} Febnawan FR. Crafted with 💻 and ☕`
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
