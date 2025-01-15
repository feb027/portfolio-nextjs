import { FC } from 'react';
import { AboutContent } from '../about/AboutContent';
import { AboutImage } from '../about/AboutImage';

const AboutSection: FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <AboutImage />
          </div>
          <div className="lg:w-1/2">
            <AboutContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
