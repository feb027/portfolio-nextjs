'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Code2, Cpu, Globe2, Sparkles, Terminal, ChevronRight, CheckCircle2 } from 'lucide-react';

const REASONS = [
  {
    title: "Modern Tech Stack",
    description: "I stay up-to-date with the latest technologies and best practices in web development.",
    icon: <Cpu className="w-6 h-6" />,
    codeSnippet: "useLatestTechnologies()",
    details: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion"
    ]
  },
  {
    title: "Clean & Efficient Code",
    description: "I write maintainable, well-documented code following industry standards and best practices.",
    icon: <Code2 className="w-6 h-6" />,
    codeSnippet: "writeCleanCode()",
    details: [
      "Clean Architecture",
      "DRY Principles",
      "Code Documentation",
      "Best Practices"
    ]
  },
  {
    title: "Problem Solver",
    description: "I enjoy tackling complex challenges and finding elegant solutions.",
    icon: <Sparkles className="w-6 h-6" />,
    codeSnippet: "solveChallenges()",
    details: [
      "Analytical Thinking",
      "Creative Solutions",
      "Debug Expert",
      "Performance Optimization"
    ]
  },
  {
    title: "Fast Learner",
    description: "I quickly adapt to new technologies and methodologies to stay ahead in the ever-evolving tech landscape.",
    icon: <Globe2 className="w-6 h-6" />,
    codeSnippet: "adaptAndLearn()",
    details: [
      "Quick Adaptation",
      "Continuous Learning",
      "Tech Enthusiast",
      "Growth Mindset"
    ]
  }
];

const WhyHireMe: FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create transform values outside of the map callback
  const rotateX = useTransform(mouseY, [0, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [0, 300], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Move useEffect inside the component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCard !== null) {
        setActiveCard(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard]);

  return (
    <section 
      id="why-hire-me" 
      className="py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Title - Consistent with About section */}
        <motion.div 
          className="text-center mb-16"
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
                Why Hire Me
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className={`relative z-10 h-full p-6 bg-terminal-dark/80 backdrop-blur-sm 
                         border border-terminal-border rounded-lg cursor-pointer
                         transition-all duration-300 ${activeCard === index ? 'border-neon-blue' : ''}`}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                style={{
                  rotateX,
                  rotateY,
                  perspective: 1000,
                }}
                animate={{
                  borderColor: activeCard === index ? 'rgb(56,182,255,0.5)' : 'rgb(75,85,99)',
                }}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs text-code-gray font-mono">reason_{index + 1}.tsx</span>
                  </div>
                  <Terminal size={14} className="text-code-gray" />
                </div>

                {/* Icon */}
                <motion.div 
                  className="w-12 h-12 mb-4 rounded-lg bg-terminal-light/5 
                            flex items-center justify-center text-neon-blue"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ 
                    rotate: activeCard === index ? [0, 360] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {reason.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-neon-blue font-mono text-lg mb-2 
                             group-hover:text-neon-active transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-code-gray group-hover:text-code-white 
                             transition-colors mb-4">
                  {reason.description}
                </p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-terminal-border">
                        <div className="grid grid-cols-2 gap-2">
                          {reason.details.map((detail, i) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-sm font-mono
                                       text-code-gray hover:text-code-white
                                       transition-colors"
                            >
                              <span className="text-neon-blue">→</span>
                              {detail}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Add keyboard shortcut hint */}
                {activeCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-2 right-2 text-xs text-code-gray"
                  >
                    Press <kbd className="px-1 py-0.5 bg-terminal-light/10 rounded">Esc</kbd> to close
                  </motion.div>
                )}
              </motion.div>

              {/* Enhanced gradient effect */}
              <div 
                className="absolute inset-0 bg-gradient-conic from-neon-blue/20 via-neon-purple/20 to-neon-blue/20
                          opacity-0 group-hover:opacity-100 transition-opacity rounded-lg blur-xl"
                style={{
                  transform: `rotate(${index * 90}deg)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative code comment */}
        <motion.div 
          className="absolute bottom-4 right-4 font-mono text-xs text-code-gray/20"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {'/* Hire me and let\'s build something amazing together */'}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHireMe; 