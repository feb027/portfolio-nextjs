'use client';

import { Post } from '@/lib/mdx';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, Code2 } from 'lucide-react';
import BlogPost from './BlogPost';

interface BlogGridProps {
  posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="relative px-4">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Enhanced Matrix Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1E293B,transparent)] opacity-50" />
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-darker via-transparent to-terminal-darker opacity-60" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24 relative pt-12 pb-16"
      >
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terminal-dark/50 border border-terminal-border
                     shadow-[0_0_15px_rgba(96,165,250,0.1)]"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="w-4 h-4 text-neon-purple" />
            <span className="text-code-gray font-mono text-sm">~/thoughts</span>
            <span className="w-2 h-4 bg-neon-blue/50 animate-cursor-blink" />
          </motion.div>

          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="text-5xl font-mono font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan 
                           bg-clip-text text-transparent relative z-10">
                Digital Garden
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-cyan/20 
                           blur-2xl -z-10 rounded-full opacity-50" />
              <Sparkles className="absolute -top-6 -right-6 w-6 h-6 text-neon-purple animate-float-slow" />
            </div>

            <p className="text-code-gray font-mono text-base max-w-xl mx-auto">
              A collection of thoughts, learnings, and experiments in web development
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-terminal-dark/30 rounded-lg border border-terminal-border/50
                       hover:border-neon-blue/30 transition-colors">
            <Code2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-code-gray font-mono text-sm">
              {posts.length} Posts Published
            </span>
          </div>
        </div>
      </motion.header>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <BlogPost post={post} index={index} />
            {index !== posts.length - 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-terminal-border to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 