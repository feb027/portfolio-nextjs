'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Code2, HelpCircle, MessageCircle, Search, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, FC } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'contact';
  code?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web development technologies including React, Next.js, TypeScript, and Tailwind CSS. I also have experience with backend technologies like Node.js and database systems.",
    category: "technical",
    code: `const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  backend: ['Node.js', 'Express'],
  database: ['MongoDB', 'PostgreSQL'],
  tools: ['Git', 'VS Code', 'Docker']
};`
  },
  {
    question: "Are you available for freelance work?",
    answer: "Yes, I'm open to freelance opportunities and collaborations. I can help with web development projects, consulting, and technical solutions.",
    category: "general"
  },
  {
    question: "How can I get in touch with you?",
    answer: "You can reach me through email at febnawanrochman2@gmail.com or connect with me on LinkedIn. I typically respond within 24 hours.",
    category: "contact"
  },
  {
    question: "Do you provide source code for your projects?",
    answer: "Most of my projects are available on GitHub with detailed documentation. Some client projects may be private due to confidentiality agreements.",
    category: "technical",
    code: `// Example repository structure
const projectRepo = {
  source: '/src',
  docs: '/docs',
  tests: '/tests',
  license: 'MIT',
  readme: 'Documentation and setup guide'
};`
  },
  {
    question: "What is your development process?",
    answer: "I follow an agile development approach with emphasis on clean code, testing, and documentation. Regular communication and iterative development are key parts of my process.",
    category: "technical",
    code: `const devProcess = {
  planning: ['Requirements', 'Architecture', 'Timeline'],
  development: ['Code', 'Test', 'Review'],
  deployment: ['Build', 'Test', 'Deploy'],
  maintenance: ['Monitor', 'Update', 'Optimize']
};`
  }
];

const FAQ: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'technical' | 'contact'>('all');

  const filteredFAQs = FAQ_ITEMS.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-terminal-darker">
      {/* Floating Terminal Header */}
      <motion.div 
        style={{ opacity, y }}
        className="fixed top-0 left-0 right-0 z-50 bg-terminal-darker/85 backdrop-blur-md border-b border-terminal-border"
      >
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-neon-purple" />
              <span className="text-code-gray font-mono text-sm">faq.tsx</span>
            </div>
            <Link 
              href="/"
              className="text-code-gray hover:text-neon-blue transition-colors inline-flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" /> Return to Main
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="pt-24 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-2 bg-terminal-dark/50 rounded-lg border border-terminal-border mb-4">
              <Terminal className="w-8 h-8 text-neon-purple" />
            </div>
            <h1 className="text-4xl font-mono text-code-white mb-4">FAQ</h1>
            <p className="text-code-gray">Frequently Asked Questions</p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-code-gray" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-terminal-dark/30 border border-terminal-border rounded-lg
                         text-code-white placeholder-code-gray focus:outline-none focus:border-neon-blue/30
                         font-mono text-sm transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'general', 'technical', 'contact'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all
                    ${selectedCategory === category
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'bg-terminal-dark/30 text-code-gray border border-terminal-border hover:border-neon-blue/20'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 3) }}
              >
                <div
                  onClick={() => setActiveItem(activeItem === item.question ? null : item.question)}
                  className={`
                    border rounded-lg transition-all duration-300 cursor-pointer
                    ${activeItem === item.question
                      ? 'bg-terminal-dark border-neon-blue/30'
                      : 'bg-terminal-dark/30 border-terminal-border hover:border-neon-blue/20'
                    }
                  `}
                >
                  {/* Question */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className={`w-5 h-5 ${
                        activeItem === item.question ? 'text-neon-blue' : 'text-code-gray'
                      }`} />
                      <h3 className="font-mono text-code-white">{item.question}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-code-gray transition-transform duration-300
                      ${activeItem === item.question ? 'rotate-180 text-neon-blue' : ''}`}
                    />
                  </div>

                  {/* Answer */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeItem === item.question ? 'auto' : 0,
                      opacity: activeItem === item.question ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="border-t border-terminal-border/30 pt-4">
                        <p className="text-code-gray mb-4">{item.answer}</p>
                        
                        {/* Code Example */}
                        {item.code && (
                          <div className="bg-terminal-darker rounded-lg p-4 font-mono text-sm">
                            <pre className="text-code-gray">
                              <code>{item.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-code-gray text-sm">
              Still have questions? {' '}
              <Link 
                href="mailto:febnawanrochman2@gmail.com"
                className="text-neon-blue hover:underline inline-flex items-center gap-1"
              >
                Contact me
                <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 