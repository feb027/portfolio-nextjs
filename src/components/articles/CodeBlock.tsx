'use client';

import { FC } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className }) => {
  return (
    <div className="relative group">
      <pre 
        className={`bg-terminal-dark/50 p-4 rounded-lg overflow-x-auto mb-6 border border-terminal-border
                    shadow-lg backdrop-blur-sm ${className || ''}`}
      >
        {children}
      </pre>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => navigator.clipboard.writeText((children as any)?.props?.children || '')}
          className="px-2 py-1 text-xs font-mono text-code-gray hover:text-neon-blue
                   bg-terminal-light/10 rounded border border-terminal-border"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default CodeBlock; 