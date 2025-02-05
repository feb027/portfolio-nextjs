'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, GitBranch, GitCommit, Menu, GraduationCap, Briefcase } from 'lucide-react';

// Separate the data into two categories
const EXPERIENCES = [
  {
    title: 'Senior Developer',
    company: 'Tech Corp',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Led development of multiple web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  // ... other work experiences
];

const EDUCATION = [
  {
    title: 'Universitas Siliwangi',
    company: 'University',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Computer Science Major with focus on Software Engineering. Achieved academic excellence with 3.9 GPA.',
    technologies: ['Data Structures', 'Algorithms', 'Software Engineering', 'Web Development'],
  },
  {
    title: 'SMAN 1 Tasikmalaya',
    company: 'High School',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Science Major with focus on Computer Science and Mathematics.',
    technologies: ['Mathematics', 'Physics', 'Computer Science', 'Biology'],
  },
  // ... other education entries
];

const Experience: FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [activeExp, setActiveExp] = useState(0);
  const [isLineNumbersVisible, setLineNumbersVisible] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const currentData = activeTab === 'experience' ? EXPERIENCES : EDUCATION;

  // Handle window resize and initial width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(percentage);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [activeExp]);

  // Syntax highlighting simulation
  const formatDescription = (text: string) => {
    return text.split('\n').map((line, i) => (
      <div key={i} className="leading-6">
        {isLineNumbersVisible && (
          <span className="inline-block w-12 text-right mr-4 text-terminal-light select-none">
            {i + 1}
          </span>
        )}
        <span>{line}</span>
      </div>
    ));
  };

  // Add new function to generate minimap content
  const generateMinimapContent = (experience: typeof EXPERIENCES[0]) => {
    return (
      <div className="text-[4px] leading-[4px] text-code-gray/30 whitespace-pre font-mono">
        {`import { Experience } from '${experience.company}';\n\n`}
        {`class ${experience.title} implements Experience {\n`}
        {`  private company = "${experience.company}";\n`}
        {`  private period = {\n`}
        {`    start: "${experience.period.start}",\n`}
        {`    end: "${experience.period.end || 'Present'}"\n`}
        {`  };\n\n`}
        {`  public getDescription() {\n`}
        {`    ${experience.description}\n`}
        {`  }\n\n`}
        {`  private technologies = [\n`}
        {`    ${experience.technologies.join(',\n    ')}\n`}
        {`  ];\n`}
        {`}`}
      </div>
    );
  };

  // Add new component for interactive tech tags
  const TechTag: FC<{ name: string }> = ({ name }) => {
    return (
      <motion.span
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-2 py-1 text-sm bg-terminal-light/10 text-neon-active 
                  rounded border border-terminal-border hover:border-neon-blue/30
                  transition-all duration-300 cursor-pointer"
      >
        {name}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1
                   bg-terminal-darker border border-terminal-border rounded text-xs
                   whitespace-nowrap z-50 pointer-events-none"
        >
          <span className="text-neon-purple">tech</span>
          <span className="text-code-gray">.</span>
          <span className="text-neon-cyan">details</span>
          <span className="text-code-gray">()</span>
        </motion.div>
      </motion.span>
    );
  };

  // Keep this calculation
  const isMiniMapVisible = windowWidth >= 768;

  return (
    <section id="experience" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Enhanced Section Title - Matching other sections */}
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
                Experience
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

        {/* Enhanced Code editor container */}
        <motion.div 
          className="max-w-6xl mx-auto bg-terminal-darker rounded-lg overflow-hidden border border-terminal-border shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Add Category Tabs */}
          <div className="flex border-b border-terminal-border">
            <motion.button
              onClick={() => {
                setActiveTab('experience');
                setActiveExp(0);
              }}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-all duration-300 border-r border-terminal-border
                ${activeTab === 'experience' 
                  ? 'bg-terminal-darker text-neon-blue border-b-2 border-b-neon-blue' 
                  : 'text-code-gray hover:bg-terminal-darker/50'}`}
              whileHover={{ backgroundColor: 'rgba(56, 182, 255, 0.03)' }}
            >
              <Briefcase size={14} />
              <span>work.tsx</span>
            </motion.button>
            
            <motion.button
              onClick={() => {
                setActiveTab('education');
                setActiveExp(0);
              }}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-all duration-300 border-r border-terminal-border
                ${activeTab === 'education' 
                  ? 'bg-terminal-darker text-neon-blue border-b-2 border-b-neon-blue' 
                  : 'text-code-gray hover:bg-terminal-darker/50'}`}
              whileHover={{ backgroundColor: 'rgba(56, 182, 255, 0.03)' }}
            >
              <GraduationCap size={14} />
              <span>education.tsx</span>
            </motion.button>
          </div>

          {/* Enhanced Editor toolbar */}
          <div className="bg-terminal-dark border-b border-terminal-border p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile menu button with animation */}
              <motion.button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-1.5 rounded hover:bg-terminal-light/10 text-code-gray md:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={18} />
              </motion.button>
              
              {/* Enhanced toolbar items */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.button 
                  onClick={() => setLineNumbersVisible(!isLineNumbersVisible)}
                  className="p-1.5 rounded hover:bg-terminal-light/10 text-code-gray"
                  whileHover={{ scale: 1.05, color: '#38B6FF' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code2 size={18} />
                </motion.button>
                <motion.div 
                  className="flex items-center text-xs text-code-gray space-x-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center">
                    <GitBranch size={14} className="mr-1" />
                    <span>main</span>
                  </div>
                  <div className="flex items-center">
                    <GitCommit size={14} className="mr-1" />
                    <span>{new Date().getFullYear()}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced view controls */}
            <motion.div className="hidden md:flex items-center space-x-2">
              {/* Remove this button since minimap visibility is based on window width */}
              {/* <motion.button
                onClick={() => setMiniMapVisible(!isMiniMapVisible)}
                ...
              /> */}
            </motion.div>
          </div>

          {/* Enhanced Editor main content */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]" ref={editorRef}>
            {/* Enhanced Sidebar */}
            <motion.div 
              className={`${
                isSidebarOpen 
                  ? 'fixed inset-0 z-[100] bg-terminal-darker mt-[64px]'
                  : 'hidden'
                } md:mt-0 md:relative md:block md:col-span-3 bg-terminal-dark/50 border-r border-terminal-border`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile header with sticky positioning */}
              <div className="sticky top-0 bg-terminal-dark z-10">
                <div className="p-2 border-b border-terminal-border flex justify-between items-center">
                  <div className="text-xs text-neon-purple flex items-center">
                    <ArrowRight size={14} className="mr-1" />
                    <span>{activeTab}/</span>
                  </div>
                  {/* Close button for mobile */}
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-code-gray hover:text-code-white md:hidden
                             hover:bg-terminal-light/10 rounded transition-colors"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              </div>

              {/* File tabs with adjusted max height */}
              <div className="space-y-0.5 p-1 max-h-[calc(100vh-8rem)] md:max-h-none overflow-auto">
                {currentData.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setActiveExp(index);
                      setSidebarOpen(false);
                    }}
                    className={`w-full group flex items-center px-3 py-2.5 md:py-2 rounded-sm text-sm
                              transition-all duration-200 relative ${
                                activeExp === index
                                  ? 'bg-terminal-light/20 text-code-white'
                                  : 'text-code-gray hover:bg-terminal-light/10'
                              }`}
                    whileHover={{ x: 4 }}
                  >
                    <motion.span 
                      className={`w-2 h-2 rounded-full mr-2 transition-colors ${
                        activeExp === index 
                          ? 'bg-neon-blue' 
                          : 'bg-neon-blue/40'
                      }`}
                      animate={{ scale: activeExp === index ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: activeExp === index ? Infinity : 0 }}
                    />
                    <span className="font-mono truncate">{item.title}.tsx</span>
                    
                    {/* Timeline connector */}
                    {index < currentData.length - 1 && (
                      <motion.div 
                        className="absolute left-4 top-[2.5rem] w-px h-[calc(100%-1rem)] bg-terminal-border"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Main content area */}
            <div className="col-span-1 md:col-span-9 grid" 
                 style={{ gridTemplateColumns: `1fr ${isMiniMapVisible && windowWidth >= 768 ? '100px' : '0px'}` }}>
              {/* Code content */}
              <div className="p-3 md:p-6 font-mono relative overflow-auto" ref={contentRef}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExp}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 md:space-y-6"
                  >
                    {/* Company import statement */}
                    <div className="text-code-gray">
                      import {'{'} Experience {'}'} from &apos;{currentData[activeExp].company}&apos;;
                    </div>

                    {/* Experience class definition */}
                    <div>
                      <span className="text-neon-purple">class</span>
                      <span className="text-neon-cyan ml-2">{currentData[activeExp].title}</span>
                      <span className="text-code-white ml-2">implements Experience {' {'}</span>
                    </div>

                    {/* Properties */}
                    <div className="ml-4 space-y-2">
                      <div>
                        <span className="text-neon-purple">private</span>
                        <span className="text-code-white ml-2">company =</span>
                        <span className="text-neon-active ml-2">&quot;{currentData[activeExp].company}&quot;</span>;
                      </div>
                      <div>
                        <span className="text-neon-purple">private</span>
                        <span className="text-code-white ml-2">period =</span>
                        <span className="text-code-gray ml-2">{'{'}</span>
                        <div className="ml-4">
                          start: <span className="text-neon-active">&quot;{currentData[activeExp].period.start}&quot;</span>,
                          <br />
                          end: <span className="text-neon-active">&quot;{currentData[activeExp].period.end || 'Present'}&quot;</span>
                        </div>
                        <span className="text-code-gray">{'}'}</span>;
                      </div>
                    </div>

                    {/* Methods */}
                    <div className="ml-4">
                      <div className="text-neon-purple">public</div>
                      <div className="text-neon-cyan">getDescription() {'{'}
                        <div className="text-code-gray ml-4">
                          {formatDescription(currentData[activeExp].description)}
                        </div>
                      {'}'}</div>
                    </div>

                    {/* Technologies */}
                    <div className="ml-4">
                      <span className="text-neon-purple">private</span>
                      <span className="text-code-white ml-2">technologies:</span>
                      <span className="text-neon-cyan ml-2">string[]</span>
                      <span className="text-code-white ml-2">=</span>
                      <div className="ml-4 flex flex-wrap gap-2 mt-2">
                        {currentData[activeExp].technologies.map((tech) => (
                          <TechTag key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <motion.div 
                  className="absolute left-0 w-full h-6 bg-neon-blue/5 rounded"
                  animate={{ 
                    y: [0, 100, 200, 0],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Minimap - only shown on desktop */}
              {isMiniMapVisible && windowWidth >= 768 && (
                <div className="border-l border-terminal-border bg-terminal-dark/30">
                  <div className="sticky top-0 p-2 max-h-[600px] overflow-hidden">
                    <motion.div 
                      className="opacity-80 transform scale-[1]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {generateMinimapContent(currentData[activeExp])}
                    </motion.div>
                    <motion.div 
                      className="absolute top-0 left-0 right-0 bg-terminal-light/10 
                               border border-neon-blue/20 transition-all duration-200"
                      style={{
                        height: '20%',
                        transform: `translateY(${scrollPercentage}%)`
                      }}
                      whileHover={{ borderColor: 'rgba(56, 182, 255, 0.4)' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
