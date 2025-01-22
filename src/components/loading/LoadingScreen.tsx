'use client';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <div 
      className={`fixed inset-0 bg-terminal-darker z-[999] flex items-center justify-center
                  transition-opacity duration-500 ease-in-out`}
      style={{ 
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none'
      }}
    >
      <div className={`text-center transition-transform duration-500 transform
                      ${isLoading ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="inline-block relative">
          <div className="h-16 w-16 rounded-full border-2 border-neon-blue/20">
            <div className="h-full w-full rounded-full border-t-2 border-r-2 border-neon-blue animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 bg-neon-blue rounded-full animate-pulse shadow-lg shadow-neon-blue/50" />
          </div>
        </div>
        <div className="mt-4 font-mono text-neon-blue">
          <span className="inline-block animate-pulse">&gt; System Ready_</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
