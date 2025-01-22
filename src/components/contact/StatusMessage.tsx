import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatusMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

const StatusMessage: FC<StatusMessageProps> = ({ type, message, onClose }) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedMessage(message.slice(0, index));
      index++;
      if (index > message.length) {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-terminal-darker border border-terminal-border rounded-lg overflow-hidden shadow-lg backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-terminal-dark border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <span className={`${type === 'success' ? 'text-green-400' : 'text-red-400'} font-mono`}>{type === 'success' ? '✓' : '⚠'}</span>
          <span className="text-code-gray text-sm font-mono">
            system.{type}.log
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-code-gray hover:text-code-white transition-colors"
            aria-label="Close message"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>

      {/* Message Content */}
      <div className="p-4 font-mono text-sm">
        <div className="flex items-start gap-2">
          <span className="text-neon-purple select-none">{'>'}</span>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className={type === 'success' ? 'text-green-400' : 'text-red-400'}>
                [${type.toUpperCase()}]:
              </span>
              <span className="text-code-white">
                {typedMessage}
                {showCursor && (
                  <span className="animate-pulse text-neon-blue">|</span>
                )}
              </span>
            </div>
            
            {/* Progress Animation for Success */}
            {type === 'success' && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                className="h-0.5 bg-gradient-to-r from-green-500/50 to-green-300/50 mt-2"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusMessage;
