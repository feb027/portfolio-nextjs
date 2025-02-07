'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles: FC<RelatedArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <div className="border-t border-terminal-border mt-12 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-neon-purple font-mono">#</span>
        <h2 className="text-xl text-code-white font-mono">Related Articles</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(articles) && articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/articles/${article.slug}`}>
              <article className="group bg-terminal-dark border border-terminal-border rounded-lg overflow-hidden
                               hover:border-neon-blue/30 transition-all duration-300">
                {article.image && (
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-sm font-mono text-code-white group-hover:text-neon-blue 
                               transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-code-gray">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                    <motion.div 
                      className="flex items-center gap-1 text-neon-blue opacity-0 group-hover:opacity-100"
                      whileHover={{ x: 5 }}
                    >
                      Read
                      <ChevronRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles; 