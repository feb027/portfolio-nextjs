'use client';

import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { useState } from 'react';

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

// Sample data - you can move this to a separate data file later
const projects: Project[] = [
  {
    title: "Sample Project",
    description: "A brief description of the project goes here",
    imageUrl: "/path/to/image.jpg",
    techStack: ["React", "TypeScript", "Tailwind"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com/example"
  },
  // Add more projects as needed
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20">
      {/* Section title with code-like decoration */}
      <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">// PROJECTS</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Project
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
      <ProjectGrid 
        projects={projects}
        onProjectSelect={setSelectedProject}
      />

      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-4xl">
            <ProjectDetails
              {...selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
