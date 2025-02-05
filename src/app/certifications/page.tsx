'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Award, ExternalLink, Calendar, CheckCircle2, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useState, FC } from 'react';
import Image from 'next/image';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  description: string;
  skills: string[];
  imageUrl: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Meta',
    issueDate: '2024-01',
    credentialId: 'FB-FED-24',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/ABCD1234',
    description: 'Professional certification in front-end development covering React, responsive design, and modern web development practices.',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'Web Accessibility'],
    imageUrl: '/certifications/meta-frontend.jpg'
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: '2023-12',
    expiryDate: '2026-12',
    credentialId: 'AWS-CP-123456',
    credentialUrl: 'https://www.credly.com/badges/12345678',
    description: 'Foundational certification demonstrating understanding of AWS Cloud concepts, services, and deployment models.',
    skills: ['AWS', 'Cloud Computing', 'Security', 'Architecture', 'Cost Management'],
    imageUrl: '/certifications/aws-cloud.jpg'
  },
  {
    id: 'red-hat',
    title: 'Red Hat Certified System Administrator',
    issuer: 'Amazon Web Services',
    issueDate: '2023-12',
    expiryDate: '2026-12',
    credentialId: 'AWS-CP-123456',
    credentialUrl: 'https://www.credly.com/badges/12345678',
    description: 'Foundational certification demonstrating understanding of AWS Cloud concepts, services, and deployment models.',
    skills: ['AWS', 'Cloud Computing', 'Security', 'Architecture', 'Cost Management'],
    imageUrl: '/certifications/aws-cloud.jpg'
  },
  {
    id: 'eth-hack',
    title: 'Ethical Hacker',
    issuer: 'Amazon Web Services',
    issueDate: '2023-12',
    expiryDate: '2026-12',
    credentialId: 'AWS-CP-123456',
    credentialUrl: 'https://www.credly.com/badges/12345678',
    description: 'Foundational certification demonstrating understanding of AWS Cloud concepts, services, and deployment models.',
    skills: ['AWS', 'Cloud Computing', 'Security', 'Architecture', 'Cost Management'],
    imageUrl: '/certifications/aws-cloud.jpg'
  },
  {
    id: 'univ-of-indonesia',
    title: 'University of Indonesia',
    issuer: 'Amazon Web Services',
    issueDate: '2023-12',
    expiryDate: '2026-12',
    credentialId: 'AWS-CP-123456',

    credentialUrl: 'https://www.credly.com/badges/12345678',
    description: 'Foundational certification demonstrating understanding of AWS Cloud concepts, services, and deployment models.',
    skills: ['AWS', 'Cloud Computing', 'Security', 'Architecture', 'Cost Management'],
    imageUrl: '/certifications/aws-cloud.jpg'
  },
  // Add more certifications as needed
];

const CertificationCard: FC<{ cert: Certification; isActive: boolean; onClick: () => void }> = ({ 
  cert, 
  isActive, 
  onClick 
}) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`
        relative overflow-hidden group
        ${isActive ? 'col-span-2 row-span-2' : 'col-span-1'}
      `}
    >
      {/* Background Gradient Animation */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-terminal-dark/80 to-terminal-darker/80 
                   backdrop-blur-sm border border-terminal-border rounded-xl transition-all duration-500
                   group-hover:border-neon-blue/30"
      />
      
      {/* Content */}
      <div className="relative p-6 h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-neon-purple/10">
                  <Award className="w-5 h-5 text-neon-purple" />
                </div>
                <h3 className="font-mono text-lg text-neon-blue">{cert.title}</h3>
              </div>
              <p className="text-code-gray text-sm">{cert.issuer}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-code-gray bg-terminal-dark/50 px-2 py-1 rounded-full">
                {cert.issueDate}
              </span>
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-terminal-dark/50 text-neon-blue hover:text-neon-active 
                         transition-colors hover:bg-terminal-dark"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-terminal-border">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker/80 to-transparent" />
                    </div>
                    <div className="p-4 bg-terminal-dark/30 rounded-lg border border-terminal-border">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-neon-cyan" />
                        <h4 className="text-neon-cyan font-mono text-sm">Description</h4>
                      </div>
                      <p className="text-code-gray text-sm">{cert.description}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Skills Section */}
                    <div className="p-4 bg-terminal-dark/30 rounded-lg border border-terminal-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-neon-purple" />
                        <h4 className="text-neon-purple font-mono text-sm">Skills & Technologies</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-terminal-dark rounded-full text-xs font-mono 
                                     text-code-gray border border-terminal-border group-hover:border-neon-blue/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Credential Info */}
                    <div className="p-4 bg-terminal-dark/30 rounded-lg border border-terminal-border">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                        <h4 className="text-neon-blue font-mono text-sm">Credential Details</h4>
                      </div>
                      <div className="space-y-2 text-xs text-code-gray">
                        <p>ID: {cert.credentialId}</p>
                        {cert.expiryDate && (
                          <p>Valid until: {cert.expiryDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Content (when not active) */}
          {!isActive && (
            <div className="mt-auto flex items-center justify-between text-xs text-code-gray">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {cert.issueDate}
              </span>
              <span className="flex items-center gap-1">
                View Details
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Floating Terminal Header */}
      <motion.div 
        style={{ opacity, y }}
        className="fixed top-0 left-0 right-0 z-50 bg-terminal-darker/85 backdrop-blur-md border-b border-terminal-border"
      >
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="text-neon-purple" />
              <span className="text-code-gray font-mono text-sm">certifications.tsx</span>
            </div>
            <Link 
              href="/"
              className="text-code-gray hover:text-neon-blue transition-colors inline-flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" /> Return to Main
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="pt-24 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-2 bg-terminal-dark/50 rounded-lg border border-terminal-border mb-4">
              <Terminal className="w-8 h-8 text-neon-purple" />
            </div>
            <h1 className="text-4xl font-mono text-code-white mb-4">
              <span className="text-neon-purple">const</span>{' '}
              <span className="text-neon-blue">achievements</span>{' '}
              <span className="text-neon-purple">=</span>{' '}
              <span className="text-code-gray">{'{'}</span>
            </h1>
            <p className="text-code-gray font-mono">
              certifications: <span className="text-neon-cyan">Professional Development & Skills</span>
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <CertificationCard
                  cert={cert}
                  isActive={activeCert === cert.id}
                  onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center border-t border-terminal-border/30 pt-8"
          >
            <p className="text-code-gray text-sm">
              <span className="text-neon-purple">{'// '}</span>
              All certifications are verified and up-to-date.{' '}
              <span className="text-neon-blue">Click cards to expand</span>{' '}
              for more details.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Certifications; 