import Image from 'next/image';
import { FC } from 'react';

interface ProjectDetailsProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  projectUrl?: string;
  githubUrl?: string;
  challenges?: string[];
  solutions?: string[];
  duration?: string;
  role?: string;
  onClose?: () => void;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  title,
  description,
  imageUrl,
  techStack,
  projectUrl,
  githubUrl,
  challenges,
  solutions,
  duration,
  role,
  onClose
}) => {
  return (
    <article className="max-w-4xl mx-auto bg-slate-800/50 rounded-lg overflow-hidden">
      <div className="relative h-[400px]">
        <Image
          src={imageUrl}
          alt={`${title} project detail view`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      <div className="p-6 space-y-6">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
          {role && <p className="text-blue-400">Role: {role}</p>}
          {duration && <p className="text-slate-400">Duration: {duration}</p>}
        </header>

        <div className="prose prose-invert">
          <p>{description}</p>
        </div>

        {(challenges || solutions) && (
          <div className="grid md:grid-cols-2 gap-6">
            {challenges && (
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Challenges</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}
            {solutions && (
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Solutions</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-700 px-4 py-1 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Live Project
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              View Source Code
            </a>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 text-white hover:bg-slate-700/50 transition-colors"
            aria-label="Close details"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
};

export default ProjectDetails;
