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
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Experience</h2>
        <div className="max-w-4xl mx-auto">
          <ExperienceTimeline experiences={EXPERIENCES} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
