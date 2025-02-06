'use client';

import { Post } from '@/lib/mdx';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

interface PostLayoutProps {
  post: Post;
  content: ReactNode;
}

export default function PostLayout({ post, content }: PostLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Enhanced Header */}
      <motion.header 
        className="relative h-[80vh] min-h-[600px] flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Hero Image */}
        <div className="absolute inset-0">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-darker/70 to-transparent" />
          <div className="absolute inset-0 bg-terminal-darker/30" />
        </div>

        {/* Floating Navigation */}
        <motion.div 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-terminal-dark/80 backdrop-blur-md border-b border-terminal-border' : ''
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="container max-w-4xl mx-auto px-4 py-4">
            <Link 
              href="/blog"
              className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-terminal-dark/50 backdrop-blur-sm 
                       border border-terminal-border hover:border-neon-blue/30 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-neon-blue group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-mono text-code-gray">Back to Blog</span>
            </Link>
          </div>
        </motion.div>

        {/* Post Info */}
        <div className="relative container max-w-4xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-terminal-dark/50 backdrop-blur-sm text-neon-cyan 
                           rounded-full border border-terminal-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-mono font-bold text-code-white leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-code-gray">
              <time className="flex items-center gap-2 text-sm font-mono">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </time>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ChevronDown className="w-6 h-6 text-code-gray animate-bounce" />
          </motion.div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="relative container max-w-4xl mx-auto px-4 py-16">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glowing Orbs */}
          <div className="absolute -left-40 top-40 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -right-40 top-80 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-float-slow delay-200" />
          <div className="absolute -left-20 bottom-40 w-60 h-60 bg-neon-cyan/5 rounded-full blur-3xl animate-float-slow delay-500" />
        </div>

        {/* Main Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative prose prose-invert max-w-none 
                   prose-headings:font-mono prose-headings:text-code-white
                   prose-p:text-code-gray prose-p:leading-relaxed
                   prose-a:text-neon-blue prose-a:no-underline hover:prose-a:underline
                   prose-pre:bg-terminal-dark prose-pre:border prose-pre:border-terminal-border 
                   prose-pre:rounded-lg prose-code:text-neon-cyan
                   prose-img:rounded-lg prose-img:border prose-img:border-terminal-border
                   prose-strong:text-neon-blue prose-strong:font-normal
                   prose-blockquote:border-l-neon-blue/30 prose-blockquote:bg-terminal-dark/30
                   prose-blockquote:rounded-r-lg prose-blockquote:py-1"
        >
          {content}
        </motion.article>
      </main>
    </div>
  );
} 