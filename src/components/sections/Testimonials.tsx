'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, StarHalf } from 'lucide-react';

interface Testimonial {
  name: string;
  company: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "John Doe",
    company: "TechCorp",
    content: "Working with this developer was an incredible experience. Their attention to detail and problem-solving skills are outstanding.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    company: "InnovateTech",
    content: "Exceptional developer who consistently delivers high-quality code. Their communication skills and technical expertise are top-notch.",
    rating: 4.5,
  },
  {
    name: "Alex Johnson",
    company: "WebSolutions",
    content: "Great developer with strong problem-solving abilities. Always delivers on time and communicates effectively.",
    rating: 5,
  },
  // Add more testimonials to make the scroll smoother
];

const TestimonialCard: FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <motion.div 
    className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] 
               max-w-[280px] sm:max-w-[320px] md:max-w-[350px] 
               bg-terminal-darker border border-terminal-border rounded-lg mx-2 sm:mx-4
               hover:border-neon-blue/30 transition-all duration-500 group"
    whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(56, 182, 255, 0.1)' }}
  >
    {/* Terminal-like header */}
    <div className="h-8 sm:h-10 bg-terminal-dark rounded-t-lg border-b border-terminal-border
                  flex items-center justify-between px-3 sm:px-4">
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/70" />
      </div>
      <div className="font-mono text-[10px] sm:text-xs text-code-gray">
        testimonial.tsx
      </div>
    </div>

    {/* Content */}
    <div className="p-4 sm:p-5 md:p-6">
      <Quote className="text-neon-blue/30 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-3 sm:mb-4" />
      
      <div className="font-mono text-xs sm:text-sm space-y-3 sm:space-y-4">
        <div className="text-code-gray">
          <span className="text-neon-purple">const</span>{' '}
          <span className="text-neon-cyan">feedback</span>{' '}
          <span className="text-code-gray">=</span>{' '}
          <span className="text-neon-active">&quot;{testimonial.content}&quot;</span>
        </div>

        <div className="space-y-2">
          <div className="flex gap-0.5 sm:gap-1">
            {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-neon-blue text-neon-blue" />
            ))}
            {testimonial.rating % 1 !== 0 && (
              <StarHalf className="w-3 h-3 sm:w-4 sm:h-4 fill-neon-blue text-neon-blue" />
            )}
          </div>
          <div>
            <div className="text-code-white group-hover:text-neon-blue transition-colors">
              {testimonial.name}
            </div>
            <div className="text-code-gray text-[10px] sm:text-xs">
              @ {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials: FC = () => {
  // Calculate total width for smooth scrolling based on screen size
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 350;
    if (window.innerWidth < 640) return 280; // mobile
    if (window.innerWidth < 768) return 320; // tablet
    return 350; // desktop
  };

  const getCardMargin = () => {
    if (typeof window === 'undefined') return 32;
    return window.innerWidth < 640 ? 16 : 32; // 2 * mx-2 for mobile, 2 * mx-4 for larger
  };

  const [dimensions, setDimensions] = useState({
    cardWidth: getCardWidth(),
    cardMargin: getCardMargin()
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        cardWidth: getCardWidth(),
        cardMargin: getCardMargin()
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalWidth = (dimensions.cardWidth + dimensions.cardMargin) * TESTIMONIALS.length;

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Section Title */}
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          />
          <div className="py-4">
            <span className="text-code-gray font-mono text-sm mb-2 block">{'// SECTION'}</span>
            <h2 className="text-4xl font-mono text-code-white relative inline-block">
              <span className="text-neon-blue">&lt;</span>
              Testimonials
              <span className="text-neon-blue">/&gt;</span>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -right-8 top-1/2 w-6 h-px bg-neon-blue/30"
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -left-8 top-1/2 w-6 h-px bg-neon-blue/30"
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </h2>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          />
        </div>
      </motion.div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 
                      bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 
                      bg-gradient-to-l from-black to-transparent z-10" />
        
        {/* Scrolling Content */}
        <div className="flex">
          <motion.div 
            className="flex"
            animate={{ 
              x: [-totalWidth, 0]
            }}
            transition={{ 
              duration: TESTIMONIALS.length * 8,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 