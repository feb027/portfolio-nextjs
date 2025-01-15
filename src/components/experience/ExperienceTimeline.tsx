import { FC } from 'react';
import ExperienceCard from './ExperienceCard';

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: {
    start: string;
    end?: string;
  };
  description: string;
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline: FC<ExperienceTimelineProps> = ({ experiences }) => {
  return (
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <div key={`${experience.company}-${index}`} className="relative">
          {index !== experiences.length - 1 && (
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700 ml-3" />
          )}
          <ExperienceCard {...experience} />
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
