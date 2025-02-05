'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialLoadingScreenProps {
  isLoading: boolean;
}

const InitialLoadingScreen: FC<InitialLoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] bg-terminal-darker flex items-center justify-center"
        >
          <div className="text-center">
            <div className="inline-block relative">
              <div className="h-20 w-20 rounded-full border-2 border-neon-blue/20">
                <div className="h-full w-full rounded-full border-t-2 border-r-2 border-neon-blue animate-spin" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 bg-neon-blue rounded-full animate-pulse shadow-lg shadow-neon-blue/50" />
              </div>
            </div>
            <div className="mt-6 font-mono text-neon-blue">
              <span className="inline-block animate-pulse text-lg">&gt; System Initializing_</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoadingScreen; 
