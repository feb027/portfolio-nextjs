'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { toast } from 'sonner';
import CommentItem from './CommentItem';

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  replies: CommentType[];
}

interface CommentsProps {
  articleId: string;
}

const Comments: FC<CommentsProps> = ({ articleId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/comments`);
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast.error('Failed to load comments');
        setComments([]);
      }
    };

    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          parentId: replyTo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const comment = await response.json();
      
      if (replyTo) {
        setComments(prevComments => 
          prevComments.map(c => 
            c.id === replyTo 
              ? { ...c, replies: [...c.replies, comment] }
              : c
          )
        );
        setReplyTo(null);
      } else {
        setComments(prev => [comment, ...prev]);
      }
      
      setNewComment('');
      toast.success('Comment posted successfully');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-terminal-border mt-12 pt-8">
      <div className="flex items-center gap-4 mb-6">
        <MessageSquare className="text-neon-purple" />
        <h2 className="text-xl text-code-white font-mono">Comments</h2>
      </div>

      {/* Comment Form */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={session.user?.image || '/default-avatar.png'}
                alt={session.user?.name || 'User'}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
                className="w-full px-4 py-2 bg-terminal-dark border border-terminal-border rounded-lg
                         text-code-gray placeholder:text-code-gray/50 focus:outline-none
                         focus:border-neon-blue/30 transition-colors resize-none"
                rows={3}
                disabled={isLoading}
              />
              <div className="flex justify-end mt-2">
                {replyTo && (
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="mr-2 text-sm text-code-gray hover:text-neon-purple transition-colors"
                    disabled={isLoading}
                  >
                    Cancel Reply
                  </button>
                )}
                <motion.button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-light/5
                           border border-terminal-border rounded-md text-code-gray
                           hover:text-neon-blue hover:border-neon-blue/30 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4" />
                  <span className="text-sm">{isLoading ? 'Sending...' : 'Send'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center mb-8">
          <button
            onClick={() => signIn()}
            className="text-neon-blue hover:text-neon-purple transition-colors"
          >
            Sign in to comment
          </button>
        </div>
      )}

      {/* Comments List */}
      <AnimatePresence>
        {Array.isArray(comments) && comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={() => setReplyTo(comment.id)}
          />
        ))}
      </AnimatePresence>

      {(!comments || comments.length === 0) && (
        <div className="text-center text-code-gray py-8">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-mono">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default Comments; 