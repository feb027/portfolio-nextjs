'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, ArrowLeft } from 'lucide-react';

interface ArticleLayoutProps {
  children: ReactNode;
}

const ArticleLayout: FC<ArticleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Header */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-terminal-darker/85 backdrop-blur-md border-b border-terminal-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="text-neon-purple" />
              <span className="text-code-gray font-mono text-sm">articles.tsx</span>
            </div>
            <Link 
              href="/"
              className="text-code-gray hover:text-neon-blue transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Main
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-12">
        {children}
      </div>
    </div>
  );
};

export default ArticleLayout; 