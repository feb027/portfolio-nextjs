import Link from 'next/link';
import { FC } from 'react';

interface LogoProps {
  text: string;
}

const Logo: FC<LogoProps> = ({ text }) => {
  return (
    <Link 
      href="/" 
      className="text-xl font-bold hover:text-blue-400 transition-colors"
    >
      {text}
    </Link>
  );
};

export default Logo;
