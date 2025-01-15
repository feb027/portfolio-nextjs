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
    <article className="group relative overflow-hidden rounded-lg bg-slate-800/50 transition-all">
      <div className="aspect-video relative">
        <Image
          src={imageUrl}
          alt={`${title} project thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 text-slate-300">{description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-700 px-3 py-1 text-sm text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
