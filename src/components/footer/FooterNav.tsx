import { FC } from 'react';
import Link from 'next/link';

interface FooterNavProps {
  links: {
    label: string;
    href: string;
  }[];
}

const FooterNav: FC<FooterNavProps> = ({ links }) => {
  return (
    <nav className="flex flex-wrap gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-slate-400 hover:text-blue-400 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default FooterNav;
