'use client';

import { Project } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p>{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="text-sm">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ProjectCard components will be mapped here */}
      </div>
    </section>
  );
}
