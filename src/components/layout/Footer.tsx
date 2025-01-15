import { FC } from 'react';
import FooterNav from '../footer/FooterNav';
import FooterSocial from '../footer/FooterSocial';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

const Footer: FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Your Name</h3>
            <p className="text-slate-400 mt-2">Full Stack Developer</p>
          </div>

          <div className="flex justify-center">
            <FooterNav links={FOOTER_LINKS} />
          </div>

          <div className="flex justify-center md:justify-end">
            <FooterSocial />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-400">
          <p>
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Next.js
            </a>
            {' '}and{' '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
