import { FC } from 'react';

interface MenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

const MenuButton: FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="relative md:hidden p-2.5 rounded-md
                 bg-terminal-darker/50 border border-terminal-border
                 text-code-gray hover:text-neon-blue
                 transition-all duration-300 ease-out
                 hover:border-neon-blue/30 hover:bg-terminal-dark/80
                 focus:outline-none focus:ring-2 focus:ring-neon-blue/20
                 active:scale-95
                 group"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      data-state={isOpen ? 'open' : 'closed'}
    >
      {/* Terminal cursor effect */}
      <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full
                     bg-neon-blue/50 opacity-0 group-hover:opacity-100
                     transition-all duration-300 animate-blink" />
      
      {/* Enhanced glow effect */}
      <span className="absolute inset-0 rounded-md opacity-0 transition-opacity
                     duration-300 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10
                     blur-xs -z-10 group-hover:opacity-100" />
      
      {/* Secondary glow ring */}
      <span className="absolute inset-0 rounded-md opacity-0
                     transition-opacity duration-300 
                     ring-1 ring-neon-blue/20 group-hover:opacity-100" />
      
      <svg
        className={`w-5 h-5 transition-all duration-300 ease-out
                   ${isOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path className="animate-[glow_1s_ease-in-out]" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <>
            <path className="animate-[glow_1s_ease-in-out] origin-center" 
                  d="M4 6h16" 
                  strokeDasharray="16"
                  strokeDashoffset="0" />
            <path className="animate-[glow_1s_ease-in-out] origin-center" 
                  d="M4 12h16" 
                  strokeDasharray="16"
                  strokeDashoffset="0" />
            <path className="animate-[glow_1s_ease-in-out] origin-center" 
                  d="M4 18h16" 
                  strokeDasharray="16"
                  strokeDashoffset="0" />
          </>
        )}
      </svg>
      
      {/* Click ripple effect */}
      <span className="absolute inset-0 rounded-md opacity-0
                     transition-opacity duration-300 
                     bg-neon-blue/5 group-active:opacity-100" />
    </button>
  );
};

export default MenuButton;
