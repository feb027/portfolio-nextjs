'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Article } from '@/types/article';

interface ArticleNavigationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticleNavigation: FC<ArticleNavigationProps> = ({ prevArticle, nextArticle }) => {
  return (
    <nav className="border-t border-terminal-border mt-12 pt-6">
      <div className="grid grid-cols-2 gap-4">
        {prevArticle && (
          <Link href={`/articles/${prevArticle.slug}`} className="col-start-1">
            <motion.div
              className="group flex flex-col gap-2 p-4 border border-terminal-border rounded-lg
                       hover:border-neon-blue/30 transition-all"
              whileHover={{ x: -5 }}
            >
              <span className="text-xs text-code-gray font-mono flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Previous Article
              </span>
              <h3 className="text-sm text-code-white group-hover:text-neon-blue transition-colors">
                {prevArticle.title}
              </h3>
            </motion.div>
          </Link>
        )}
        
        {nextArticle && (
          <Link href={`/articles/${nextArticle.slug}`} className="col-start-2">
            <motion.div
              className="group flex flex-col gap-2 p-4 border border-terminal-border rounded-lg
                       hover:border-neon-blue/30 transition-all text-right"
              whileHover={{ x: 5 }}
            >
              <span className="text-xs text-code-gray font-mono flex items-center gap-1 justify-end">
                Next Article
                <ArrowRight className="w-4 h-4" />
              </span>
              <h3 className="text-sm text-code-white group-hover:text-neon-blue transition-colors">
                {nextArticle.title}
              </h3>
            </motion.div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default ArticleNavigation; 