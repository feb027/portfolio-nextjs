import { FC } from 'react';

export const AboutContent: FC = () => {
  return (
    <div className="relative bg-terminal-dark p-6 rounded-lg border border-terminal-border shadow-terminal animate-border-glow overflow-hidden">
      {/* Terminal scanline effect */}
      <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none animate-scanline" />
      
      {/* Status bar */}
      <div className="flex items-center gap-2 mb-6 text-xs">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-code-gray">online</span>
        <span className="text-terminal-light ml-auto">~/developer/profile</span>
      </div>

      {/* Code comment */}
      <div className="text-terminal-light font-mono text-sm mb-4">
        // Developer profile configuration
      </div>

      <div className="flex items-center mb-4 text-neon-blue group">
        <span className="text-sm font-mono group-hover:text-neon-active transition-colors">const</span>
        <h2 className="text-2xl font-mono ml-2 group-hover:text-neon-active transition-colors">
          Developer = {`{`}
        </h2>
      </div>

      <div className="pl-4 space-y-4 font-mono">
        <div 
          className="group hover:bg-terminal-light/5 p-2 rounded transition-all duration-300 hover:translate-x-2"
        >
          <span className="text-neon-purple">name:</span>
          <span className="text-code-white ml-2 group-hover:text-neon-blue transition-colors">
            "Febnawan Fatur Rochman"
          </span>
          <span className="text-terminal-light">,</span>
        </div>

        <div 
          className="group hover:bg-terminal-light/5 p-2 rounded transition-all duration-300 hover:translate-x-2"
        >
          <span className="text-neon-purple">role:</span>
          <span className="text-code-white ml-2 group-hover:text-neon-blue transition-colors">
            "Full Stack Developer"
          </span>
          <span className="text-terminal-light">,</span>
        </div>

        <div className="group">
          <span className="text-neon-purple">description:</span>
          <div className="pl-4 text-code-gray">
            <p className="my-2 hover:text-code-white transition-colors duration-300">
              "Transforming complex problems into elegant solutions through clean, 
              efficient code. Specialized in building modern web applications 
              with TypeScript and React ecosystem."
            </p>
          </div>
        </div>

        <div className="group">
          <span className="text-neon-purple">skills:</span>
          <div className="pl-4 flex flex-wrap gap-2 mt-2">
            {["TypeScript", "React", "Next.js", "Node.js", "AWS"].map((skill) => (
              <span 
                key={skill}
                className="px-2 py-1 rounded-md bg-terminal-light/10 text-neon-cyan 
                          hover:bg-neon-blue/20 hover:text-neon-active cursor-pointer 
                          transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 font-mono text-terminal-light group">
        {`}`}
        <span className="animate-cursor-blink ml-1">|</span>
        <span className="hidden group-hover:inline-block text-xs text-code-gray ml-2 transition-opacity duration-300">
          // End of profile
        </span>
      </div>
    </div>
  );
};
