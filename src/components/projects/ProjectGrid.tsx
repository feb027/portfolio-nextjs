import { FC } from 'react';
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
}

const ProjectGrid: FC<ProjectGridProps> = ({ projects, onProjectSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div 
          key={project.title} 
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
  );
};

export default ProjectGrid;
