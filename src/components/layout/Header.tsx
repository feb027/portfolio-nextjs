'use client';

import { useState } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
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
  const activeSection = useActiveSection(NAV_ITEMS.map(item => item.href));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 z-[100] transition-all duration-300
                      bg-terminal-dark/85 backdrop-blur-md border-b border-terminal-border
                      supports-[backdrop-filter]:bg-terminal-dark/60
                      shadow-terminal overflow-visible">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-darker/5 to-transparent opacity-20 animate-scanline" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neon-blue/10 via-neon-purple/5 to-transparent blur-[100px] opacity-50" />
      
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center">
          {/* Left section */}
          <div className="w-[200px]">
            <Logo text="Portfolio" />
          </div>
          
          {/* Center section */}
          <div className="flex-1 flex justify-center">
            <NavLinks 
              items={NAV_ITEMS} 
              activeSection={activeSection}
            />
          </div>
          
          {/* Right section */}
          <div className="w-[200px] flex justify-end">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-terminal-darker/30 px-3 py-1 rounded-full border border-terminal-border">
                <div className="h-2 w-2 rounded-full bg-neon-blue animate-blink 
                              shadow-[0_0_8px_#60A5FA] ring-1 ring-neon-blue/50" />
                <span className="text-sm font-mono text-code-gray tracking-wider">
                  <span className="text-neon-blue">&gt;</span> online
                </span>
              </div>
              <MenuButton 
                isOpen={isMenuOpen} 
                onClick={toggleMenu}
                className="md:hidden text-code-white hover:text-neon-blue transition-colors"
              />
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu 
        isOpen={isMenuOpen} 
        items={NAV_ITEMS} 
        activeSection={activeSection}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
