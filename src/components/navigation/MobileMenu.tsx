import { FC } from 'react';
import NavLinks, { NavItem } from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, items }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 border-t border-slate-800 p-4">
      <NavLinks items={items} mobile />
    </div>
  );
};

export default MobileMenu;
