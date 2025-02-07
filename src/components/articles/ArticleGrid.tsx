'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight, Search, Terminal } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: FC<ArticleGridProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16">
      {/* Header with animated title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 mb-16 relative"
      >
        {/* Background Effect */}
        <motion.div
          className="absolute inset-0 -top-20 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-neon-purple/20 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-30" />
        </motion.div>

        <div className="relative inline-block">
          <Terminal className="w-12 h-12 text-neon-purple mb-4" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-neon-blue rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-mono text-code-white tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neon-purple"
            >
              const
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-neon-blue"
            >
              articles
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-code-gray"
            >
              = [
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-code-gray text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Dive into a collection of in-depth articles about web development,
            <br />
            from practical tutorials to advanced concepts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-3 text-sm text-code-gray mt-6"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-purple" />
              {articles.length} Articles
            </span>
            <span className="w-1 h-1 bg-code-gray/30 rounded-full" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-blue" />
              Updated Weekly
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-24">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-code-gray" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-terminal-dark border border-terminal-border rounded-lg
                   text-code-white placeholder:text-code-gray focus:outline-none
                   focus:border-neon-blue/30 transition-all"
        />
      </div>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <div className="mt-16 mb-32">
          <Link href={`/articles/${filteredArticles[0].slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src={filteredArticles[0].image || '/default-article.jpg'}
                alt={filteredArticles[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {filteredArticles[0].tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-mono bg-neon-purple/20 text-neon-purple rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-code-white mb-2 sm:mb-4">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-code-gray text-sm sm:text-base md:text-lg mb-4 max-w-2xl line-clamp-2 sm:line-clamp-none">
                    {filteredArticles[0].description}
                  </p>
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      )}

      {/* Article List */}
      <AnimatePresence mode="wait">
        <div className="space-y-6">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <article 
                  className="group grid grid-cols-1 sm:grid-cols-[2fr,3fr] gap-4 sm:gap-6 md:gap-8 bg-terminal-dark hover:bg-terminal-light/5 
                            border border-terminal-border hover:border-neon-blue/30 rounded-xl p-6 transition-all"
                >
                  <div className="relative h-48 sm:h-40 md:h-48 rounded-lg overflow-hidden">
                    <Image
                      src={article.image || '/default-article.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {article.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono bg-neon-cyan/10 text-neon-cyan rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg sm:text-xl font-mono text-code-white group-hover:text-neon-blue transition-colors mb-2 sm:mb-3">
                        {article.title}
                      </h2>
                      <p className="text-code-gray text-sm line-clamp-2 sm:line-clamp-none">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-4 text-xs text-code-gray">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readingTime}
                        </span>
                      </div>
                      <motion.div 
                        className="flex items-center gap-1 text-neon-blue"
                        whileHover={{ x: 5 }}
                      >
                        Read Article
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Terminal className="w-12 h-12 text-code-gray mx-auto mb-4" />
          <p className="text-code-gray font-mono">No articles found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ArticleGrid; 