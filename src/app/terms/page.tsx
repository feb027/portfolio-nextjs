'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Scale, Shield, FileText, Code2, AlertCircle, Scroll, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, FC, JSX } from 'react';

interface TermSection {
  icon: JSX.Element;
  title: string;
  content: string;
  code: string;
}

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const TERMS_SECTIONS: TermSection[] = [
  {
    icon: <Scale className="w-5 h-5" />,
    title: "Acceptance of Terms",
    content: `By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. 
      • You must be at least 13 years old to use this service
      • You agree to use the website in compliance with all applicable laws
      • You accept our privacy practices as described in our Privacy Policy`,
    code: `const checkAcceptance = (user: { age: number; acceptTerms: boolean; acceptPrivacy: boolean }) => {
  if (user.age < 13) {
    throw new Error('Age requirement not met');
  }
  return user.acceptTerms && user.acceptPrivacy;
};`
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Intellectual Property",
    content: `All content on this website is protected by intellectual property rights:
      • Website design and code
      • Portfolio projects and descriptions
      • Images and media content
      • Text content and documentation`,
    code: `// Copyright protection implementation
const protectedContent = {
  copyright: '© ${new Date().getFullYear()} Febnawan FR',
  rights: 'All Rights Reserved',
  type: 'Intellectual Property'
} as const;`
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "User Conduct",
    content: `Users of this website agree to:
      • Not attempt to breach website security
      • Not copy or redistribute content without permission
      • Not use the website for any illegal purposes
      • Respect intellectual property rights`,
    code: `const validateUserConduct = (action: string): boolean => {
  const forbidden = ['breach', 'copy', 'illegal'] as const;
  return !forbidden.some((term) => 
    action.toLowerCase().includes(term)
  );
};`
  },
  {
    icon: <Scroll className="w-5 h-5" />,
    title: "Limitations",
    content: `This website is provided "as is" with:
      • No guarantees of uninterrupted service
      • No warranty for content accuracy
      • Right to modify terms at any time
      • Limited liability for any damages`,
    code: `interface Disclaimer {
  warranty: null;
  service: 'as-is';
  modifications: 'subject-to-change';
  liability: 'limited';
}`
  }
];

const TermsOfService: FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
              <Terminal className="text-neon-purple" />
              <span className="text-code-gray font-mono text-sm">terms_of_service.tsx</span>
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

      {/* New Design */}
      <div className="pt-24 pb-20">
        {/* Title Section */}
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-2 bg-terminal-dark/50 rounded-lg border border-terminal-border mb-4">
              <Terminal className="w-8 h-8 text-neon-purple" />
            </div>
            <h1 className="text-4xl font-mono text-code-white mb-4">Terms of Service</h1>
            <p className="text-code-gray">Last updated: {currentDate}</p>
          </motion.div>

          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-terminal-dark/30 backdrop-blur-sm rounded-xl p-6 mb-12 border border-terminal-border"
          >
            <div className="flex items-start gap-4">
              <div className="bg-neon-purple/10 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <h2 className="text-neon-blue font-mono text-lg mb-2">Important Notice</h2>
                <p className="text-code-gray leading-relaxed">
                  By accessing this website, you agree to these terms of service. 
                  Please read them carefully before proceeding.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections - New Card Style */}
          <div className="space-y-6">
            {TERMS_SECTIONS.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
                className="group"
              >
                <div 
                  onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                  className={`
                    relative overflow-hidden rounded-xl border transition-all duration-300
                    ${activeSection === section.title 
                      ? 'bg-terminal-dark border-neon-blue/30' 
                      : 'bg-terminal-dark/30 border-terminal-border hover:border-neon-blue/20'
                    }
                  `}
                >
                  {/* Section Header */}
                  <div className="p-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`
                        p-2 rounded-lg transition-colors duration-300
                        ${activeSection === section.title 
                          ? 'bg-neon-blue/10' 
                          : 'bg-terminal-light/5 group-hover:bg-terminal-light/10'
                        }
                      `}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-mono text-neon-blue mb-1">{section.title}</h3>
                      </div>
                      <ChevronDown 
                        className={`
                          w-5 h-5 text-neon-blue transition-transform duration-300
                          ${activeSection === section.title ? 'rotate-180' : ''}
                        `}
                      />
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeSection === section.title ? 'auto' : 0,
                      opacity: activeSection === section.title ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <div className="border-t border-terminal-border/30 pt-6">
                        {/* Content */}
                        <div className="prose prose-invert max-w-none">
                          <div className="text-code-gray space-y-2 mb-6">
                            {section.content.split('\n').map((line, i) => (
                              <p key={`${section.title}-${i}`} className="leading-relaxed">{line}</p>
                            ))}
                          </div>
                        </div>
                        
                        {/* Code Example */}
                        <div className="bg-terminal-darker rounded-lg p-4 font-mono text-sm">
                          <div className="flex items-center gap-2 text-code-gray text-xs mb-2">
                            <Code2 className="w-4 h-4" />
                            <span>Example Implementation</span>
                          </div>
                          <pre className="text-code-gray">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-code-gray text-sm">
              Questions about our terms? {' '}
              <Link 
                href="mailto:febnawanrochman2@gmail.com" 
                className="text-neon-blue hover:underline inline-flex items-center gap-1"
              >
                febnawanrochman2@gmail.com
                <ChevronDown className="w-3 h-3 rotate-270" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 