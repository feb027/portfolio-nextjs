'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-terminal-darker/85 backdrop-blur-md border-b border-terminal-border">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="text-neon-purple" />
              <span className="text-code-gray font-mono text-sm">blog.tsx</span>
            </div>
            <Link 
              href="/"
              className="text-code-gray hover:text-neon-blue transition-colors inline-flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" /> Return to Main
            </Link>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 pt-24 pb-12">
        {children}
      </div>
    </div>
  );
} 