import { FC } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
  mobile?: boolean;
  activeSection?: string;
  onClose?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({ items, mobile = false, activeSection, onClose }) => {
  const baseStyles = mobile 
    ? 'flex flex-col space-y-4' 
    : 'hidden md:flex items-center justify-center space-x-6 h-full';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (mobile && onClose) {
        onClose();
      }
    }
  };

  return (
    <div className={`${baseStyles} w-full`}>
      {items.map((item) => {
        const isActive = activeSection === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`group relative inline-flex items-center justify-center px-3 py-1.5 font-mono text-sm tracking-wide transition-all duration-300
                      hover:text-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue/30 rounded
                      ${isActive ? 'text-neon-blue' : 'text-code-gray'}`}
          >
            {/* Glowing background effect */}
            <span className={`absolute inset-0 rounded opacity-0 transition-all duration-300 ease-out
                           bg-gradient-to-r from-neon-blue/10 to-neon-purple/10
                           group-hover:opacity-100 blur-[2px] -z-10
                           ${isActive ? 'opacity-100' : ''}`} />
            
            {/* Main content */}
            <span className="relative inline-flex items-center justify-center">
              {/* Brackets appear on hover */}
              <span className="mr-0.5 opacity-0 transform -translate-x-2 transition-all duration-300 text-neon-blue/50
                             group-hover:opacity-100 group-hover:translate-x-0">{`{`}</span>
              
              <span className="relative inline-block">{item.label}</span>
              
              <span className="ml-0.5 opacity-0 transform translate-x-2 transition-all duration-300 text-neon-blue/50
                             group-hover:opacity-100 group-hover:translate-x-0">{`}`}</span>
              
              {/* New decorative underline */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 
                             bg-gradient-to-r from-transparent via-neon-blue to-transparent
                             transition-all duration-300 ease-out group-hover:w-full" />
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 
                             h-[3px] w-1 rounded-full bg-neon-blue/50 
                             transition-all duration-300 ease-out shadow-glow
                             ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default NavLinks;
