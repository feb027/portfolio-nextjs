import { FC } from 'react';
import Image from 'next/image';

export const AboutImage: FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-blue-500/10 rounded-lg backdrop-blur-sm -rotate-6" />
      <div className="absolute inset-0 bg-terminal-dark/80 rounded-lg rotate-3" />
      <div className="relative rounded-lg overflow-hidden border-2 border-terminal-border">
        <Image
          src="/photo.JPG" 
          alt="Developer profile"
          width={500}
          height={500}
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
