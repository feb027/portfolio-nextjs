'use client';

import { Post } from '@/lib/mdx';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface BlogPostProps {
  post: Post;
  index: number;
}

export default function BlogPost({ post, index }: BlogPostProps) {
  const isEven = index % 2 === 0;

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article 
        className={`group relative flex flex-col md:flex-row items-center gap-12 mb-24 p-6
                    ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        whileHover="hover"
      >
        {/* Base Background */}
        <div className="absolute inset-1 bg-terminal-dark/50 rounded-2xl backdrop-blur-sm border border-terminal-border/30 
                       group-hover:border-neon-blue/30 transition-colors duration-300" />

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl">
          {post.image ? (
            <motion.div
              className="relative w-full h-full"
              variants={{
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker to-transparent opacity-50" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-terminal-dark">
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker to-transparent opacity-50" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className={`relative w-full md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono bg-terminal-light/5 text-neon-cyan rounded-full
                         border border-terminal-border/30 hover:border-neon-blue/50 transition-all duration-300
                         hover:bg-terminal-light/10 hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title and Description */}
          <div className="space-y-4">
            <motion.h2 
              className="text-2xl md:text-3xl font-mono text-code-white relative inline-flex items-center gap-2"
              variants={{
                hover: { x: 10 }
              }}
              transition={{ duration: 0.3 }}
            >
              {post.title}
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.h2>
            <p className="text-code-gray leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Date */}
          <div className="mt-6 flex items-center gap-2 text-sm text-code-gray font-mono">
            <Calendar className="w-4 h-4" />
            <time>{format(new Date(post.date), 'MMM dd, yyyy')}</time>
          </div>
        </div>
      </motion.article>
    </Link>
  );
} 