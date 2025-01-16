import { FC } from 'react';

export const AboutContent: FC = () => {
  return (
    <div className="bg-terminal-dark p-6 rounded-lg border border-terminal-border shadow-terminal animate-border-glow">
      <div className="flex items-center mb-4 text-neon-blue">
        <span className="text-sm font-mono">const</span>
        <h2 className="text-2xl font-mono ml-2">Developer = {`{`}</h2>
      </div>

      <div className="pl-4 space-y-4 font-mono">
        <div className="group">
          <span className="text-neon-purple">name:</span>
          <span className="text-code-white ml-2">Febnawan Fatur Rochman</span>
          <span className="text-terminal-light">,</span>
        </div>

        <div className="group">
          <span className="text-neon-purple">role:</span>
          <span className="text-code-white ml-2">Full Stack Developer</span>
          <span className="text-terminal-light">,</span>
        </div>

        <div className="group">
          <span className="text-neon-purple">description:</span>
          <div className="pl-4 text-code-gray">
            <p className="my-2">
              Transforming complex problems into elegant solutions through clean, 
              efficient code. Specialized in building modern web applications 
              with TypeScript and React ecosystem.
            </p>
            <p className="my-2">
              Currently exploring the intersection of performance optimization 
              and user experience while maintaining scalable architectures.
            </p>
          </div>
        </div>

        <div className="group">
          <span className="text-neon-purple">skills:</span>
          <div className="pl-4 text-neon-cyan">
            [TypeScript, React, Next.js, Node.js, AWS]
          </div>
        </div>
      </div>

      <div className="mt-4 font-mono text-terminal-light">
        {`}`}
        <span className="animate-cursor-blink">|</span>
      </div>
    </div>
  );
};
