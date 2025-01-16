'use client';

import { FC } from 'react';
import ExperienceTimeline from '../experience/ExperienceTimeline';

const EXPERIENCES = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Led development of multiple web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  // Add more experiences as needed
];

const Experience: FC = () => {
  return (
    <section id="experience" className="py-20 min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Section title with code-like decoration */}
      <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">// EXPERIENCE</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Experience
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <ExperienceTimeline experiences={EXPERIENCES} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
