import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  projectUrl?: string;
  githubUrl?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  techStack,
  projectUrl,
  githubUrl,
}) => {
  const truncateDescription = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <motion.article 
      className="group relative overflow-hidden rounded-lg bg-terminal-darker border border-terminal-border hover:shadow-neon transition-all duration-500 hover:border-neon-blue/30"
      whileHover={{ scale: 1.02 }}
    >
      {/* Terminal Window Header with animated dots */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-terminal-dark flex items-center justify-between px-4 border-b border-terminal-border">
        <div className="flex gap-1.5">
          {['bg-red-500/70', 'bg-yellow-500/70', 'bg-green-500/70'].map((color, i) => (
            <motion.div
              key={color}
              className={`w-3 h-3 rounded-full ${color}`}
              whileHover={{ scale: 1.2 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
        <motion.div 
          className="flex items-center gap-2 font-mono text-xs"
          whileHover={{ color: 'rgb(56,182,255)' }}
        >
          <span className="text-code-gray">~/projects/</span>
          <span className="text-neon-blue">{title.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="text-code-gray">.tsx</span>
        </motion.div>
      </div>

      {/* Project Image with Effects */}
      <div className="relative mt-8 aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
        <Image
          src={imageUrl}
          alt={`${title} project thumbnail`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/60 to-transparent" />
        
        {/* Code-like image overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-terminal-dark/90 font-mono text-xs text-code-gray">
          <span className="text-neon-purple">import</span>{' '}
          <span className="text-neon-blue">thumbnail</span>{' '}
          <span className="text-code-gray">from</span>{' '}
          <span className="text-code-white">&apos;./assets/images&apos;</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 bg-terminal-darker/90 backdrop-blur-sm relative">
        {/* Line numbers */}
        <div className="absolute left-2 top-6 bottom-6 w-6 font-mono text-xs text-code-gray opacity-40 select-none flex flex-col items-end">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        <div className="ml-8 border-l border-terminal-border pl-4">
          {/* Code-style Title */}
          <div className="font-mono space-y-1">
            <div className="text-code-gray text-sm">
              <span className="text-neon-purple">class</span>{' '}
              <span className="text-neon-blue">{title}</span>{' '}
              <span className="text-code-gray">extends</span>{' '}
              <span className="text-neon-cyan">Project</span>{' '}
              <span className="text-code-gray">{'{'}</span>
            </div>
          </div>

          {/* Description with code styling */}
          <div className="mt-3 pl-4">
            <p className="text-code-gray font-mono text-sm leading-6">
              <span className="text-neon-purple">description</span>
              <span className="text-code-gray">{' = '}</span>
              <span className="text-code-white">{`"${truncateDescription(description)}"`}</span>
            </p>
          </div>
          
          {/* Tech Stack */}
          <div className="mt-4 font-mono">
            <span className="text-neon-purple">stack</span>
            <span className="text-code-gray">{' = ['}</span>
            <div className="mt-2 pl-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-terminal-light/10 rounded text-neon-cyan text-xs border border-terminal-border group-hover:border-neon-blue/30 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-code-gray">{']'}</span>
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-terminal-border">
            <span className="text-xs text-code-gray font-mono select-none">{'// Actions:'}</span>
            <div className="flex gap-2">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-neon-blue/10 rounded text-neon-blue text-xs font-mono border border-neon-blue/20 hover:bg-neon-blue/20 transition-colors duration-300"
                >
                  demo()
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-terminal-light/10 rounded text-code-white text-xs font-mono border border-terminal-border hover:bg-terminal-light/20 transition-colors duration-300"
                >
                  code()
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced hover indicator */}
        <div 
          className="absolute bottom-3 right-3 text-xs font-mono text-code-gray opacity-60"
        >
          <span className="group-hover:text-neon-blue transition-colors">Click to expand...</span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
