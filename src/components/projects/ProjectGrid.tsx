import { FC, useState } from 'react';
import ProjectCard from './ProjectCard';

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
  
  // Calculate current projects to display
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {currentProjects.map((project) => (
          <div 
            key={project.title} 
            onClick={() => onProjectSelect(project)}
            className="cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
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
        <div className="mt-12 flex justify-center items-center gap-4 font-mono">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-terminal-light/30 rounded-md border border-terminal-border text-neon-blue hover:bg-terminal-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt; Prev
          </button>
          
          <span className="text-code-gray">
            Page {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-terminal-light/30 rounded-md border border-terminal-border text-neon-blue hover:bg-terminal-light/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &gt;
          </button>
        </div>
      )}

      {/* Projects counter */}
      <div className="mt-4 text-center text-code-gray font-mono text-sm">
        <span>Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, projects.length)} of {projects.length} projects</span>
      </div>
    </div>
  );
};

export default ProjectGrid;
