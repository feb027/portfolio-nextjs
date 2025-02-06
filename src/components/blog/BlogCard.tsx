'use client';

import { Post } from '@/lib/mdx';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Code2, Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article 
        className="group relative h-[400px] overflow-hidden rounded-lg bg-terminal-darker border border-terminal-border 
                   hover:shadow-neon transition-all duration-500 hover:border-neon-blue/30"
        whileHover={{ scale: 1.02 }}
      >
        {/* Terminal Window Header */}
        <div className="absolute top-0 left-0 right-0 z-10 h-8 bg-terminal-dark/90 backdrop-blur-sm flex items-center justify-between px-4 
                    border-b border-terminal-border">
          <div className="flex gap-1.5">
            {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map((color, i) => (
              <motion.div
                key={color}
                className={`w-3 h-3 rounded-full ${color}`}
                whileHover={{ scale: 1.2 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
          <motion.div 
            className="flex items-center gap-2 font-mono text-xs"
            whileHover={{ color: 'rgb(56,182,255)' }}
          >
            <Code2 className="w-3 h-3" />
            <span className="text-code-gray">{post.slug}.mdx</span>
          </motion.div>
        </div>

        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-terminal-dark to-terminal-darker" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/95 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full pt-12 flex flex-col justify-end p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono bg-terminal-light/10 text-neon-cyan rounded-full
                         border border-terminal-border/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-mono text-code-white group-hover:text-neon-blue 
                         transition-colors line-clamp-2">
              {post.title}
            </h2>
            <p className="text-sm text-code-gray line-clamp-3">
              {post.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-terminal-border/30 flex items-center justify-between">
            <time className="text-xs text-code-gray font-mono flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </time>
            <motion.div 
              className="text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
              whileHover={{ x: 5 }}
            >
              <span className="text-xs">Read More</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
} 