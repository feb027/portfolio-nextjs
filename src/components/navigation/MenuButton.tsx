import { FC } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton: FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
};

export default MenuButton;
