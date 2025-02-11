'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, AlertCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import CommentItem from './CommentItem';

export interface CommentType {
  id: string;
  content: string;
  article_id: string;
  author_name: string;
  created_at: string;
  parent_id: string | null;
  user_id: string | null;
  replies: CommentType[];
}

interface CommentError {
  error: string;
}

interface CommentsProps {
  articleId: string;
}

interface WarningBannerProps {
  title: string;
  description: string;
  onClose: () => void;
}

const WarningBanner: FC<WarningBannerProps> = ({ title, description, onClose }) => {
  const getWarningStyles = () => {
    if (title.includes('🚦')) return 'border-yellow-500/30 bg-yellow-500/5';
    if (title.includes('🔒')) return 'border-red-700/30 bg-red-700/5';
    if (title.includes('🤖')) return 'border-purple-500/30 bg-purple-500/5';
    if (title.includes('⚠️')) return 'border-orange-500/30 bg-orange-500/5';
    return 'border-red-500/30 bg-terminal-darker';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 w-96 p-4 border rounded-lg shadow-lg 
                backdrop-blur-sm ${getWarningStyles()}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-red-500 font-mono text-sm">{title}</h3>
            <p className="text-code-gray text-sm mt-1">{description}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-code-gray hover:text-red-500 transition-colors flex-shrink-0"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const Comments: FC<CommentsProps> = ({ articleId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState<{ title: string; description: string } | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.error('Expected an array of comments but got:', data);
        setComments([]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching comments:', error.message);
      }
      toast.error('Failed to load comments');
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [articleId, fetchComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) {
      setWarning({
        title: '⚠️ Missing Fields',
        description: 'Both name and comment are required.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          authorName: authorName,
          parentId: replyTo,
        }),
      });

      const data = await response.json() as CommentError | CommentType;

      if (!response.ok) {
        let errorTitle = 'Error';
        let errorDescription = '';

        switch (response.status) {
          case 429:
            errorTitle = '🚦 Rate Limited';
            errorDescription = 'Please wait a moment before posting again.';
            break;
          case 400:
            if ('error' in data && data.error.includes('disallowed content')) {
              errorTitle = '🚫 Content Not Allowed';
              errorDescription = 'Your comment contains prohibited content (links, HTML, or suspicious patterns).';
            } else if ('error' in data && data.error.includes('too long')) {
              errorTitle = '📝 Content Too Long';
              errorDescription = 'Please keep your comment under 1000 characters.';
            }
            break;
          case 403:
            errorTitle = '🔒 Access Denied';
            errorDescription = 'You are temporarily blocked from commenting.';
            break;
          case 503:
            errorTitle = '🔧 Service Unavailable';
            errorDescription = 'The comment system is temporarily unavailable. Please try again later.';
            break;
          default:
            errorTitle = '❌ Error';
            errorDescription = 'error' in data ? data.error : 'Failed to post comment';
        }

        setWarning({ title: errorTitle, description: errorDescription });
        return;
      }

      const comment = data as CommentType;
      
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
      toast.success('💬 Comment posted successfully', {
        description: 'Your comment has been added to the discussion.'
      });
      setWarning(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error posting comment:', error.message);
      }
      setWarning({
        title: '❌ Error',
        description: 'Failed to post comment. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-terminal-border mt-12 pt-8">
      {/* Floating Warning */}
      <AnimatePresence>
        {warning && (
          <WarningBanner
            title={warning.title}
            description={warning.description}
            onClose={() => setWarning(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 mb-6">
        <MessageSquare className="text-neon-purple" />
        <h2 className="text-xl text-code-white font-mono">Comments</h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-terminal-dark border border-terminal-border rounded-lg
                     text-code-gray placeholder:text-code-gray/50 focus:outline-none
                     focus:border-neon-blue/30 transition-colors"
            maxLength={50}
          />
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
      </form>

      {/* Comments List */}
      <AnimatePresence>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={() => setReplyTo(comment.id)}
            replies={comment.replies}
          />
        ))}
      </AnimatePresence>

      {comments.length === 0 && (
        <div className="text-center text-code-gray py-8">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-mono">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default Comments; 