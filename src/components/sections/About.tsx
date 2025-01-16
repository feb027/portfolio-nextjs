import { FC } from 'react';
import { AboutContent } from '../about/AboutContent';
import { AboutImage } from '../about/AboutImage';

const AboutSection: FC = () => {
  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center py-16 overflow-hidden"
    >
      {/* Glowing orb effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-neon-purple/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with code-like decoration */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">// SECTION</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              About
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          <div className="lg:w-1/2 lg:sticky lg:top-20">
            <AboutImage />
          </div>
          <div className="lg:w-1/2">
            <AboutContent />
          </div>
        </div>

        {/* Decorative code comments */}
        <div className="absolute bottom-0 left-4 text-code-gray/20 font-mono text-sm hidden lg:block">
          /** @todo: Implement more features */
        </div>
        <div className="absolute top-8 right-4 text-code-gray/20 font-mono text-sm hidden lg:block">
          /* About Section */
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
