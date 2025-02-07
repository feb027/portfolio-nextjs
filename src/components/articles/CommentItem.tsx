'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Reply } from 'lucide-react';
import { format } from 'date-fns';
import { CommentType } from './Comments';

interface CommentItemProps {
  comment: CommentType;
  onReply: () => void;
  replies?: CommentType[];
}

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
            alt={comment.authorName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-mono text-code-white">{comment.authorName}</span>
              <span className="text-xs text-code-gray ml-2">
                {format(new Date(comment.createdAt), 'MMM d, yyyy')}
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