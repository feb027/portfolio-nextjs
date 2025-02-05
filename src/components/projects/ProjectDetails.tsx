import Image from 'next/image';
import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.article 
      className="bg-terminal-darker border border-terminal-border rounded-lg overflow-hidden shadow-neon relative backdrop-blur-sm max-h-[80vh] w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Terminal Header */}
      <motion.div 
        className="sticky top-0 z-50 h-10 bg-terminal-dark flex items-center px-4 border-b border-terminal-border"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 text-center font-mono text-xs text-code-gray">
          project_details.tsx
        </div>
        {onClose && (
          <motion.button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-terminal-light/20 text-neon-blue hover:bg-terminal-light/40 transition-colors text-xl ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        )}
      </motion.div>

      <motion.div 
        className="overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Project Image */}
        <div className="relative h-[280px] bg-terminal-dark">
          <Image
            src={imageUrl}
            alt={`${title} project detail view`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 pb-8 space-y-6">
          {/* Animated sections */}
          <motion.div 
            className="border-l-2 border-neon-blue pl-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-mono text-code-white">{title}</h2>
            {role && <p className="text-neon-cyan mt-1 font-mono">Role: {role}</p>}
            {duration && <p className="text-code-gray text-sm">Duration: {duration}</p>}
          </motion.div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-code-white leading-relaxed">{description}</p>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6 bg-terminal-light/5 rounded-lg p-4">
            {challenges && (
              <div>
                <h3 className="font-mono text-neon-purple mb-3 flex items-center gap-2">
                  <span className="text-sm">{'>'}</span> Challenges
                </h3>
                <ul className="space-y-2">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="text-code-white text-sm flex gap-2">
                      <span className="text-neon-cyan">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {solutions && (
              <div>
                <h3 className="font-mono text-neon-blue mb-3 flex items-center gap-2">
                  <span className="text-sm">{'>'}</span> Solutions
                </h3>
                <ul className="space-y-2">
                  {solutions.map((solution, index) => (
                    <li key={index} className="text-code-white text-sm flex gap-2">
                      <span className="text-neon-cyan">•</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-mono text-code-gray mb-3">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-terminal-light/20 rounded text-neon-cyan text-sm font-mono border border-terminal-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-terminal-border">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neon-blue/20 rounded-md text-neon-blue hover:bg-neon-blue/30 transition-colors font-mono text-sm"
              >
                Visit Project
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-terminal-light/20 rounded-md text-code-white hover:bg-terminal-light/30 transition-colors font-mono text-sm"
              >
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default ProjectDetails;
