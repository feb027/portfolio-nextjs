export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number;
}

export interface Experience {
  title: string;
  company: string;
  period: {
    start: string;
    end?: string;
  };
  description: string;
  technologies: string[];
}
