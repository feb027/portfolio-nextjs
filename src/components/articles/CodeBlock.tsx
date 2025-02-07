'use client';

import { FC } from 'react';

interface PreProps {
  children: {
    props: {
      children: string;
    };
  };
}

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className }) => {
  const getCodeContent = (children: React.ReactNode): string => {
    if (
      children &&
      typeof children === 'object' &&
      'props' in (children as PreProps['children']) &&
      'children' in (children as PreProps['children']).props
    ) {
      return (children as PreProps['children']).props.children;
    }
    return '';
  };

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
          onClick={() => navigator.clipboard.writeText(getCodeContent(children))}
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