'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

const NotFound: FC = () => {
  return (
    <div className="min-h-screen bg-terminal-darker flex items-center justify-center p-4">
      <div className="max-w-2xl w-full opacity-0 animate-fade-in">
        {/* Terminal Window */}
        <div className="bg-terminal-dark rounded-lg border border-terminal-border overflow-hidden shadow-lg">
          {/* Terminal Header */}
          <div className="bg-terminal-darker border-b border-terminal-border p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
              <span className="text-code-gray text-sm font-mono">error.sh</span>
            </div>
            <Terminal className="text-neon-blue w-5 h-5" />
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-neon-purple">$</span>
              <span className="text-code-white">cd /requested/path</span>
            </div>
            
            <div className="text-red-400 font-mono">
              Error: Page not found (404)
            </div>

            <div className="border-l-2 border-terminal-border pl-4 py-2 space-y-2">
              <p className="text-code-gray font-mono text-sm">
                <span className="text-neon-cyan">message:</span> The requested path could not be found
              </p>
              <p className="text-code-gray font-mono text-sm">
                <span className="text-neon-cyan">status:</span> 404
              </p>
            </div>

            <div className="font-mono text-sm">
              <span className="text-code-gray">{'// Suggested action:'}</span>
              <div className="mt-2 text-code-white">
                Return to homepage or check the URL
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 mt-4 
                bg-terminal-light/10 hover:bg-terminal-light/20 
                border border-terminal-border hover:border-neon-blue/30
                rounded-md transition-all duration-300
                text-neon-blue hover:text-neon-active
                font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-4 text-center">
          <span className="font-mono text-xs text-code-gray">
            {'/* End of error log */'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 