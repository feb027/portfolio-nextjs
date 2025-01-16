'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, GitBranch, GitCommit, Menu } from 'lucide-react';

const EXPERIENCES = [
  {
    title: 'Universitas Siliwangi',
    company: 'University',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Led development of multiple web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  {
    title: 'SMAN 1 Tasikmalaya',
    company: 'High School',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Led development of multiple web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  {
    title: 'SMPN 1 Tasikmalaya',
    company: 'Middle School',
    companyUrl: 'https://example.com',
    period: {
      start: 'Jan 2022',
      end: 'Present',
    },
    description: 'Led development of multiple web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
  },
  // Add more experiences as needed
];

const Experience: FC = () => {
  const [activeExp, setActiveExp] = useState(0);
  const [isLineNumbersVisible, setLineNumbersVisible] = useState(true);
  const [isMiniMapVisible, setMiniMapVisible] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Hide minimap on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMiniMapVisible(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <section id="experience" className="py-10 md:py-20">
      <div className="container mx-auto px-2 md:px-4">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-xs md:text-sm mb-2 block">// EXPERIENCE</span>
            <h2 className="text-3xl md:text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Experience
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>

        {/* Code editor container */}
        <div className="max-w-6xl mx-auto bg-terminal-darker rounded-lg overflow-hidden border border-terminal-border">
          {/* Editor toolbar */}
          <div className="bg-terminal-dark border-b border-terminal-border p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile menu button */}
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-1.5 rounded hover:bg-terminal-light/10 text-code-gray md:hidden"
              >
                <Menu size={18} />
              </button>
              
              {/* Rest of toolbar items - hidden on mobile */}
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => setLineNumbersVisible(!isLineNumbersVisible)}
                  className="p-1.5 rounded hover:bg-terminal-light/10 text-code-gray"
                >
                  <Code2 size={18} />
                </button>
                <div className="flex items-center text-xs text-code-gray space-x-3">
                  <div className="flex items-center">
                    <GitBranch size={14} className="mr-1" />
                    <span>main</span>
                  </div>
                  <div className="flex items-center">
                    <GitCommit size={14} className="mr-1" />
                    <span>{new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View controls - hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setMiniMapVisible(!isMiniMapVisible)}
                className="text-xs text-code-gray hover:text-code-white px-2 py-1 rounded 
                         hover:bg-terminal-light/10 transition-colors"
              >
                {isMiniMapVisible ? 'Hide Minimap' : 'Show Minimap'}
              </button>
            </div>
          </div>

          {/* Editor main content */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] md:min-h-[600px]" ref={editorRef}>
            {/* Sidebar - fullscreen modal on mobile */}
            <div className={`${
              isSidebarOpen 
                ? 'fixed inset-0 z-[100] bg-terminal-darker mt-[64px]' // Adjust mt value to match your navbar height
                : 'hidden'
              } md:mt-0 md:relative md:block md:col-span-3 bg-terminal-dark/50 border-r border-terminal-border`}
            >
              {/* Mobile header with sticky positioning */}
              <div className="sticky top-0 bg-terminal-dark z-10">
                <div className="p-2 border-b border-terminal-border flex justify-between items-center">
                  <div className="text-xs text-neon-purple flex items-center">
                    <ArrowRight size={14} className="mr-1" />
                    <span>experience/</span>
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
                {EXPERIENCES.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveExp(index);
                      setSidebarOpen(false);
                    }}
                    className={`w-full group flex items-center px-3 py-2.5 md:py-2 rounded-sm text-sm
                              transition-colors duration-200 ${
                                activeExp === index
                                  ? 'bg-terminal-light/20 text-code-white'
                                  : 'text-code-gray hover:bg-terminal-light/10'
                              }`}
                  >
                    <span className="w-2 h-2 rounded-full mr-2 bg-neon-blue/40 
                                 group-hover:bg-neon-blue transition-colors" />
                    <span className="font-mono truncate">{exp.title}.tsx</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="col-span-1 md:col-span-9 grid" 
                 style={{ gridTemplateColumns: `1fr ${isMiniMapVisible && window.innerWidth >= 768 ? '100px' : '0px'}` }}>
              {/* Code content */}
              <div className="p-3 md:p-6 font-mono relative overflow-auto">
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
                      import {'{'} Experience {'}'} from &apos;{EXPERIENCES[activeExp].company}&apos;;
                    </div>

                    {/* Experience class definition */}
                    <div>
                      <span className="text-neon-purple">class</span>
                      <span className="text-neon-cyan ml-2">{EXPERIENCES[activeExp].title}</span>
                      <span className="text-code-white ml-2">implements Experience {' {'}</span>
                    </div>

                    {/* Properties */}
                    <div className="ml-4 space-y-2">
                      <div>
                        <span className="text-neon-purple">private</span>
                        <span className="text-code-white ml-2">company =</span>
                        <span className="text-neon-active ml-2">&quot;{EXPERIENCES[activeExp].company}&quot;</span>;
                      </div>
                      <div>
                        <span className="text-neon-purple">private</span>
                        <span className="text-code-white ml-2">period =</span>
                        <span className="text-code-gray ml-2">{'{'}</span>
                        <div className="ml-4">
                          start: <span className="text-neon-active">&quot;{EXPERIENCES[activeExp].period.start}&quot;</span>,
                          <br />
                          end: <span className="text-neon-active">&quot;{EXPERIENCES[activeExp].period.end || 'Present'}&quot;</span>
                        </div>
                        <span className="text-code-gray">{'}'}</span>;
                      </div>
                    </div>

                    {/* Methods */}
                    <div className="ml-4">
                      <div className="text-neon-purple">public</div>
                      <div className="text-neon-cyan">getDescription() {'{'}
                        <div className="text-code-gray ml-4">
                          {formatDescription(EXPERIENCES[activeExp].description)}
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
                        {EXPERIENCES[activeExp].technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-sm bg-terminal-light/10 text-neon-active 
                                     rounded border border-terminal-border hover:border-neon-blue/30
                                     transition-colors cursor-pointer"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimap - only shown on desktop */}
              {isMiniMapVisible && window.innerWidth >= 768 && (
                <div className="border-l border-terminal-border bg-terminal-dark/30">
                  <div className="sticky top-0 p-2 max-h-[600px] overflow-hidden">
                    <div className="opacity-80 transform scale-[1]">
                      {generateMinimapContent(EXPERIENCES[activeExp])}
                    </div>
                    {/* Viewport indicator */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[20%] 
                               bg-terminal-light/10 border border-neon-blue/20
                               transition-all duration-200"
                      style={{
                        transform: `translateY(${(editorRef.current?.scrollTop || 0) / 
                          (editorRef.current?.scrollHeight || 1) * 100}%)`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
