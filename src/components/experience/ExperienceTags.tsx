import { FC } from 'react';

interface ExperienceTagsProps {
  tags: string[];
}

const ExperienceTags: FC<ExperienceTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 text-sm bg-slate-700/50 text-slate-300 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ExperienceTags;
