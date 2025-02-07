'use client';

import { FC, ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft, Code2, Home, Book } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ArticleLayoutProps {
  children: ReactNode;
}

const ArticleLayout: FC<ArticleLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isArticlesHome = pathname === '/articles';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Different headers for home and article pages */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-terminal-darker/85 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-16">
            {isArticlesHome ? (
              // Articles Home Navigation
              <>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-neon-purple" />
                    <span className="font-mono text-sm text-code-gray hidden xs:inline">
                      articles.tsx
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="/"
                    className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-terminal-border rounded-lg
                             text-code-gray hover:text-neon-blue hover:border-neon-blue/30 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm hidden sm:inline">Return to Main</span>
                  </Link>
                </motion.div>
              </>
            ) : (
              // Individual Article Navigation
              <>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-code-gray hover:text-neon-purple transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-mono text-sm hidden sm:inline">Home</span>
                  </Link>
                  <span className="text-code-gray/30">/</span>
                  <Link
                    href="/articles"
                    className="flex items-center gap-2 text-code-gray hover:text-neon-blue transition-colors"
                  >
                    <Book className="w-5 h-5" />
                    <span className="font-mono text-sm hidden sm:inline">Articles</span>
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-terminal-light/5 
                             rounded-lg border border-terminal-border"
                  >
                    <Terminal className="w-4 h-4 text-neon-purple" />
                    <span className="font-mono text-sm text-code-gray">Reading Mode</span>
                  </motion.div>
                  
                  <Link 
                    href="/articles"
                    className="group flex items-center gap-2 px-3 py-1.5 border border-terminal-border rounded-lg
                             text-code-gray hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm hidden sm:inline">All Articles</span>
                  </Link>
                </div>
              </>
            )}
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