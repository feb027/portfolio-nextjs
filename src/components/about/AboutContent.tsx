import { FC } from 'react';

export const AboutContent: FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">
        About Me
      </h2>
      <div className="prose prose-invert">
        <p className="text-gray-300 leading-relaxed">
          I am a passionate Full Stack Developer with experience in building web applications
          using modern technologies. My journey in software development started with a
          curiosity about how things work on the internet, which led me to dive deep
          into web technologies.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I specialize in JavaScript/TypeScript and work with frameworks like React,
          Next.js, and Node.js. I'm passionate about creating efficient, scalable, and
          maintainable code while delivering exceptional user experiences.
        </p>
        <p className="text-gray-300 leading-relaxed">
          When I'm not coding, I enjoy staying up-to-date with the latest technology
          trends, contributing to open-source projects, and sharing knowledge with
          the developer community.
        </p>
      </div>
    </div>
  );
};
