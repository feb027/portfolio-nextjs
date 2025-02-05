'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Shield, Lock, Eye, FileText, ChevronRight, Code2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const PrivacyPolicy = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Information Collection",
      content: `We collect minimal personal information through our contact form, including:
        • Name
        • Email address
        • Message content
        This information is used solely for communication purposes.`,
      code: `const collectInfo = async (userData) => {
  const { name, email, message } = userData;
  // Only essential data collected
  return await storeSecurely({ name, email, message });
};`
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data Security",
      content: `Your data is protected using industry-standard security measures. We:
        • Encrypt all data transmissions
        • Regularly update our security protocols
        • Never share your information with third parties`,
      code: `// AES-256 encryption implementation
const encryptData = (data) => {
  return crypto.subtle.encrypt(
    { name: &quot;AES-GCM&quot;, iv: window.crypto.getRandomValues() },
    key,
    data
  );
};`
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Cookies & Tracking",
      content: `We use essential cookies to:
        • Enhance site functionality
        • Analyze site traffic
        • Improve user experience
        You can disable cookies in your browser settings.`,
      code: `// Essential cookies only
const setCookie = (name, value) => {
  document.cookie = \`\${name}=\${value};secure;samesite=strict\`;
};`
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Your Rights",
      content: `You have the right to:
        • Access your personal data
        • Request data deletion
        • Opt-out of communications
        Contact us to exercise these rights.`,
      code: `const handleDataRequest = async (type, userId) => {
  switch(type) {
    case 'ACCESS': return await getUserData(userId);
    case 'DELETE': return await deleteUserData(userId);
    case 'OPT_OUT': return await optOutUser(userId);
  }
};`
    }
  ];

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
              <span className="text-code-gray font-mono text-sm">privacy_policy.tsx</span>
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

      {/* Main Content */}
      <div className="pt-20">
        {/* Header */}
        <div className="border-b border-terminal-border bg-terminal-dark/50">
          <div className="container max-w-6xl mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-mono text-code-white mb-4">
                <span className="text-neon-purple">const</span>{' '}
                <span className="text-neon-blue">PrivacyPolicy</span>{' '}
                <span className="text-neon-purple">=</span>{' '}
                <span className="text-code-gray">{'{'}</span>
              </h1>
              <p className="text-code-gray font-mono ml-4">
                <span className="text-neon-cyan">lastUpdated</span>:{' '}
                <span className="text-code-syntax-string">
                &quot;{currentDate}&quot;
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-12">
            {/* Introduction */}
            <motion.div 
              className="bg-terminal-dark/50 border border-terminal-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-neon-purple" />
                <h2 className="text-xl font-mono text-neon-blue">Important Notice</h2>
              </div>
              <p className="text-code-white">
                This Privacy Policy describes how we collect, use, and protect your personal information
                when you use our website. By using this site, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </motion.div>

            {/* Policy Sections */}
            <div className="grid grid-cols-1 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  className="bg-terminal-dark/50 border border-terminal-border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ borderColor: 'rgba(56, 182, 255, 0.3)' }}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-neon-purple">{section.icon}</span>
                        <h2 className="text-xl font-mono text-neon-blue">{section.title}</h2>
                      </div>
                      <ChevronRight 
                        className={`text-neon-blue transition-transform duration-300 ${
                          activeSection === section.title ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    <div className="text-code-gray mt-4 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                  
                  {/* Code Preview */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: activeSection === section.title ? 'auto' : 0 }}
                    className="overflow-hidden border-t border-terminal-border"
                  >
                    <pre className="bg-terminal-darker/50 p-6 font-mono text-sm">
                      <code className="text-code-gray">{section.code}</code>
                    </pre>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div 
              className="bg-terminal-dark/50 border border-terminal-border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ borderColor: 'rgba(56, 182, 255, 0.3)' }}
            >
              <h2 className="text-xl font-mono text-neon-blue mb-4 flex items-center gap-2">
                <Code2 className="text-neon-purple" />
                Contact Information
              </h2>
              <div className="font-mono">
                <p className="text-code-gray">
                  <span className="text-neon-purple">const</span>{' '}
                  <span className="text-neon-cyan">contactInfo</span>{' '}
                  <span className="text-code-gray">= {'{}'}</span>
                </p>
                <div className="ml-4 mt-2 space-y-1">
                  <p className="text-code-gray">
                    email: <span className="text-code-syntax-string">&quot;febnawanrochman2@gmail.com&quot;</span>,
                  </p>
                  <p className="text-code-gray">
                    location: <span className="text-code-syntax-string">&quot;Tasikmalaya, Indonesia&quot;</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Footer Note */}
            <motion.div 
              className="text-code-gray text-sm border-t border-terminal-border pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p>
                <span className="text-neon-purple">{'// '}</span>
                This privacy policy is subject to change without notice and was last updated on{' '}
                {currentDate}. If you have any questions feel free to{' '}
                <Link href="/#contact" className="text-neon-blue hover:underline">
                  contact us
                </Link>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 