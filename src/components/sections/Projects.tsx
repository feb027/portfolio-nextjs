'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import ProjectDetails from '@/components/projects/ProjectDetails';
import ProjectGrid from '@/components/projects/ProjectGrid';

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

const Projects: FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Keep the scroll lock effect
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
      {/* Enhanced Section Title */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          />
          <div className="py-4">
            <span className="text-code-gray font-mono text-sm mb-2 block">{'// SECTION'}</span>
            <h2 className="text-4xl font-mono text-code-white relative inline-block">
              <span className="text-neon-blue">&lt;</span>
              Projects
              <span className="text-neon-blue">/&gt;</span>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -right-8 top-1/2 w-6 h-px bg-neon-blue/30"
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -left-8 top-1/2 w-6 h-px bg-neon-blue/30"
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </h2>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          />
        </div>
      </motion.div>

      {/* Projects Grid with pagination */}
      <div className="flex-grow">
        <ProjectGrid 
          projects={projects}
          onProjectSelect={setSelectedProject}
          projectsPerPage={3}
        />
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center py-15 px-8 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="w-full max-w-3xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <ProjectDetails
                {...selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
