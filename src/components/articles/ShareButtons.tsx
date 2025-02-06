'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Link as LinkIcon } from 'lucide-react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Article } from '@/types/article';

interface ShareButtonsProps {
  article: Article;
}

const ShareButtons: FC<ShareButtonsProps> = ({ article }) => {
  const [shareUrl, setShareUrl] = useState('');
  
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <FaXTwitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You might want to add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="border-t border-terminal-border mt-8 pt-6">
      <div className="flex items-center gap-4">
        <Share2 className="text-neon-purple" />
        <span className="text-code-gray font-mono">Share this article</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {shareLinks.map(link => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-light/5 
                     border border-terminal-border rounded-md text-code-gray 
                     hover:text-neon-blue hover:border-neon-blue/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.icon}
            <span className="text-sm">{link.name}</span>
          </motion.a>
        ))}
        <motion.button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-light/5 
                   border border-terminal-border rounded-md text-code-gray 
                   hover:text-neon-purple hover:border-neon-purple/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LinkIcon className="w-4 h-4" />
          <span className="text-sm">Copy Link</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ShareButtons; 