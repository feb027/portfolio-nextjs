'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types/article';

interface ArticleNavigationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticleNavigation: FC<ArticleNavigationProps> = ({
  prevArticle,
  nextArticle,
}) => {
  return (
    <div className="border-t border-terminal-border mt-16 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Previous Article */}
        {prevArticle ? (
          <Link href={`/articles/${prevArticle.slug}`}>
            <motion.div
              whileHover={{ x: -5 }}
              className="group flex flex-col space-y-2 p-6 bg-terminal-dark border border-terminal-border 
                       hover:border-neon-purple/30 rounded-xl transition-all"
            >
              <span className="flex items-center gap-2 text-sm text-code-gray group-hover:text-neon-purple">
                <ChevronLeft className="w-4 h-4" />
                Previous Article
              </span>
              <h3 className="font-mono text-code-white group-hover:text-neon-purple line-clamp-2">
                {prevArticle.title}
              </h3>
              <p className="text-sm text-code-gray line-clamp-2">
                {prevArticle.description}
              </p>
              <div className="flex gap-2 mt-2">
                {prevArticle.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono bg-neon-purple/10 text-neon-purple rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="hidden md:block" /> // Placeholder for grid alignment
        )}

        {/* Next Article */}
        {nextArticle ? (
          <Link href={`/articles/${nextArticle.slug}`}>
            <motion.div
              whileHover={{ x: 5 }}
              className="group flex flex-col space-y-2 p-6 bg-terminal-dark border border-terminal-border 
                       hover:border-neon-blue/30 rounded-xl transition-all text-right"
            >
              <span className="flex items-center justify-end gap-2 text-sm text-code-gray group-hover:text-neon-blue">
                Next Article
                <ChevronRight className="w-4 h-4" />
              </span>
              <h3 className="font-mono text-code-white group-hover:text-neon-blue line-clamp-2">
                {nextArticle.title}
              </h3>
              <p className="text-sm text-code-gray line-clamp-2">
                {nextArticle.description}
              </p>
              <div className="flex gap-2 justify-end mt-2">
                {nextArticle.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono bg-neon-blue/10 text-neon-blue rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="hidden md:block" /> // Placeholder for grid alignment
        )}
      </div>

      {/* Back to Articles */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link href="/articles">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-light/5 border border-terminal-border 
                     hover:border-neon-cyan/30 rounded-lg text-code-gray hover:text-neon-cyan transition-all"
          >
            <span className="font-mono">Back to Articles</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ArticleNavigation; 