import { FC } from 'react';
import Link from 'next/link';

export interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
  mobile?: boolean;
}

const NavLinks: FC<NavLinksProps> = ({ items, mobile = false }) => {
  const baseStyles = mobile 
    ? 'flex flex-col space-y-4' 
    : 'hidden md:flex space-x-8';

  return (
    <div className={baseStyles}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-blue-400 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
