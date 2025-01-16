import Image from 'next/image';
import { FC } from 'react';

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
  githubUrl
}) => {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-terminal-dark border border-terminal-border transition-all duration-300 hover:border-neon-blue/30 animate-border-glow">
      {/* Terminal-like header */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-terminal flex items-center px-4 border-b border-terminal-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
        </div>
      </div>

      {/* Project Image with Overlay */}
      <div className="aspect-video relative mt-6">
        <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />
        <Image
          src={imageUrl}
          alt={`${title} project thumbnail`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 bg-terminal-darker/30 backdrop-blur-sm">
        {/* Title with code decoration */}
        <h3 className="font-mono text-xl text-code-white group-hover:text-neon-blue transition-colors duration-300">
          <span className="text-neon-purple opacity-70">const</span>{' '}
          {title}{' '}
          <span className="text-neon-cyan opacity-70">=</span>
        </h3>

        {/* Description */}
        <p className="mt-3 text-code-gray font-sans leading-relaxed">
          {description}
        </p>
        
        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-terminal-light/30 px-3 py-1 text-sm font-mono text-neon-blue border border-terminal-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex gap-4 font-mono text-sm">
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-active transition-colors duration-300"
            >
              <span className="text-neon-purple">&gt;</span> Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-active transition-colors duration-300"
            >
              <span className="text-neon-purple">&gt;</span> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
