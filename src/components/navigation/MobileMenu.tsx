import { FC, useEffect } from 'react';
import NavLinks from './NavLinks';

interface MobileMenuProps {
    isOpen: boolean;
    items: { label: string; href: string; }[];
    activeSection: string;
    onClose?: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, items, activeSection, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <div 
      className={`md:hidden fixed inset-x-0 top-[73px] z-40 transition-all duration-300 ease-out
                  h-[calc(100vh-73px)] overflow-y-auto
                ${isOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-4'}
                bg-terminal-darker/95 backdrop-blur-sm
                border-y border-terminal-border`}
    >
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-soft-light opacity-5">
        <div className="absolute inset-0 bg-repeat bg-[length:50px_50px]" 
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 40l-5-10 5-10 5 10z' stroke='%2360A5FA' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E\")" }}>
        </div>
      </div>

      {/* Enhanced terminal header with path tracing */}
      <div className="relative px-4 py-6 space-y-4">
        <div className="flex items-center space-x-2 px-2 py-2 border-b border-terminal-border/30
                      bg-gradient-to-r from-terminal-dark/50 to-transparent">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-neon-purple/50 animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-neon-cyan/50 animate-pulse [animation-delay:0.2s]" />
            <span className="h-2 w-2 rounded-full bg-neon-blue/50 animate-pulse [animation-delay:0.4s]" />
          </div>
          <span className="font-mono text-xs text-code-gray">
            <span className="text-neon-purple">root</span>
            <span className="text-code-gray/50">@</span>
            <span className="text-neon-cyan">portfolio</span>
            <span className="text-code-gray/50">:~/</span>
            <span className="text-neon-blue">navigation</span>
            <span className="text-neon-blue/50 animate-blink">_</span>
          </span>
        </div>

        {/* Content wrapper with enhanced borders */}
        <div className="relative p-4 border border-terminal-border/20 rounded-lg
                      bg-terminal-darker/30 backdrop-blur-sm">
          <div className="absolute top-0 left-4 px-2 -translate-y-1/2 bg-terminal-darker">
            <span className="font-mono text-xs text-neon-blue/50">menu.tsx</span>
          </div>
          
          <NavLinks 
            items={items} 
            mobile={true}
            activeSection={activeSection}
            onClose={onClose}
          />
        </div>

        {/* Enhanced terminal footer */}
        <div className="flex items-center justify-between px-2 pt-4 border-t border-terminal-border/30">
          <div className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-blue/50 animate-ping" />
            <span className="font-mono text-xs text-code-gray/50">system.active</span>
          </div>
          <span className="font-mono text-xs text-code-gray/50">
            Press <kbd className="px-1.5 py-0.5 bg-terminal-dark/50 rounded border border-terminal-border/30 text-neon-blue">ESC</kbd> to close
          </span>
        </div>
      </div>

      {/* Enhanced corner decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-neon-blue/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-neon-blue/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-neon-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-8 bg-gradient-to-r from-neon-blue/20 to-transparent" />
      </div>
    </div>
  );
};

export default MobileMenu;
