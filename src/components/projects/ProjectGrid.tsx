import { FC, useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

interface Project {
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
}

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  projectsPerPage?: number;
}

const ProjectGrid: FC<ProjectGridProps> = ({ 
  projects, 
  onProjectSelect, 
  projectsPerPage = 3 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {currentProjects.map((project) => (
          <div 
            key={`${currentPage}-${project.title}`}
            onClick={() => onProjectSelect(project)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onProjectSelect(project)}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 mb-8 space-y-4">
          <motion.div 
            className="flex justify-center items-center gap-4 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-terminal-light/30 rounded-md border border-terminal-border text-neon-blue hover:bg-terminal-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              &lt; Prev
            </motion.button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-mono text-sm
                    ${currentPage === i + 1 
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' 
                      : 'bg-terminal-light/30 text-code-gray hover:bg-terminal-light/50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
            
            <motion.button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-terminal-light/30 rounded-md border border-terminal-border text-neon-blue hover:bg-terminal-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next &gt;
            </motion.button>
          </motion.div>

          {/* Projects counter */}
          <motion.div 
            className="text-center text-code-gray font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, projects.length)} of {projects.length} projects</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
