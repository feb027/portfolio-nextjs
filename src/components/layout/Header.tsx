'use client';

import { useState } from 'react';
import Logo from '../navigation/Logo';
import NavLinks from '../navigation/NavLinks';
import MenuButton from '../navigation/MenuButton';
import MobileMenu from '../navigation/MobileMenu';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo text="Portfolio" />
          <NavLinks items={NAV_ITEMS} />
          <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} items={NAV_ITEMS} />
    </header>
  );
}
