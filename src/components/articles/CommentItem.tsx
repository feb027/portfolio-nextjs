'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Reply } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { CommentType } from './Comments';

interface CommentItemProps {
  comment: CommentType;
  onReply: () => void;
  replies?: CommentType[];
}

const formatDate = (dateString: string) => {
  try {
    // Parse ISO string to Date object
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return 'Invalid date';
  }
};

const CommentItem: FC<CommentItemProps> = ({
  comment,
  onReply,
  replies = [],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="flex gap-4">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/default-avatar.png"
            alt={comment.author_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-mono text-code-white">{comment.author_name}</span>
              <span className="text-xs text-code-gray ml-2">
                {formatDate(comment.created_at)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onReply}
                className="text-code-gray hover:text-neon-blue transition-colors"
              >
                <Reply className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-code-gray text-sm">{comment.content}</p>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-8 mt-4 space-y-4 border-l-2 border-terminal-border pl-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CommentItem; 