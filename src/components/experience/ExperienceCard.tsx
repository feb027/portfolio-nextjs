import { FC } from 'react';
import ExperienceTags from './ExperienceTags';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: {
    start: string;
    end?: string;
  };
  description: string;
  technologies: string[];
  companyUrl?: string;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  technologies,
  companyUrl
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
          {companyUrl ? (
            <a 
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {company}
            </a>
          ) : (
            <span className="text-slate-300">{company}</span>
          )}
        </div>
        <span className="text-sm text-slate-400">
          {period.start} - {period.end || 'Present'}
        </span>
      </div>
      
      <p className="text-slate-300">{description}</p>
      
      <ExperienceTags tags={technologies} />
    </div>
  );
};

export default ExperienceCard;
