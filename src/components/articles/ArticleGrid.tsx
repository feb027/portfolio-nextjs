'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-mono text-code-white mb-4">
          <span className="text-neon-purple">const</span>{' '}
          <span className="text-neon-blue">articles</span>{' '}
          <span className="text-code-gray">= [</span>
        </h1>
        <p className="text-code-gray font-mono">
          Thoughts, tutorials, and insights about web development
        </p>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
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
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-mono bg-terminal-light/10 text-neon-cyan rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-mono text-code-white group-hover:text-neon-blue 
                               transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-code-gray text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-code-gray">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(parseISO(article.date), 'MMM d, yyyy', { locale: enUS })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readingTime}
                      </span>
                    </div>
                    <motion.div 
                      className="flex items-center gap-1 text-neon-blue opacity-0 group-hover:opacity-100"
                      whileHover={{ x: 5 }}
                    >
                      Read More
                      <ChevronRight className="w-4 h-4" />
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

export default ArticleGrid; 