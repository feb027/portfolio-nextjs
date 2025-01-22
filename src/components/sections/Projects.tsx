'use client';

import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { useState, useEffect } from 'react';

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
    title: "DevFlow",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
  {
    title: "DEV",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
  {
    title: "SOMETHING",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
  {
    title: "YES",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
  {
    title: "AB",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
  {
    title: "CD",
    description: "A modern task management platform built for developers, featuring real-time updates, GitHub integration, and AI-powered task prioritization. The application helps development teams streamline their workflow and increase productivity.",
    imageUrl: "/project1.jpg",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    projectUrl: "https://devflow.demo",
    githubUrl: "https://github.com/username/devflow",
    challenges: [
      "Implementing real-time collaboration features",
      "Handling complex state management across multiple users",
      "Optimizing performance with large datasets"
    ],
    solutions: [
      "Utilized Socket.io for efficient real-time communication",
      "Implemented Redux with normalized state structure",
      "Added pagination and virtual scrolling for large lists"
    ],
    duration: "3 months",
    role: "Full Stack Developer"
  },  
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Add scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 min-h-screen flex flex-col">
      {/* Section title with code-like decoration */}
      <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">{'// PROJECT'}</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Project
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>

      {/* Projects Grid with pagination */}
      <div className="flex-grow">
        <ProjectGrid 
          projects={projects}
          onProjectSelect={setSelectedProject}
          projectsPerPage={3}
        />
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center py-15 px-8 z-50">
          <div className="w-full max-w-3xl">
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
