'use client';

import { FC, JSX } from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub, FiInstagram, FiLinkedin, FiMail, FiPhone,
  FiMapPin, FiAward, FiCode, FiHeart, FiPlay
} from 'react-icons/fi';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
  icon?: JSX.Element;
}

const currentYear = new Date().getFullYear();

const FOOTER_SECTIONS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Why Me', href: '#whyme' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ] as FooterLink[]
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/feb027', icon: <FiGithub /> },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/febnawan-fr', icon: <FiLinkedin /> },
      { label: 'Instagram', href: 'https://instagram.com/feb07_', icon: <FiInstagram /> },
      { label: 'Email', href: 'mailto:febnawanrochman2@gmail.com', icon: <FiMail /> },
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap.xml' },
      { label: 'FAQ', href: '/faq' },
    ]
  }
];

const CONTACT_INFO = [
  { 
    icon: <FiMail />, 
    value: 'febnawanrochman2@gmail.com', 
    href: 'mailto:febnawanrochman2@gmail.com',
    label: 'Email'
  },
  { 
    icon: <FiPhone />, 
    value: '+62 853 144 937', 
    href: 'tel:+62853144937',
    label: 'Phone'
  },
  { 
    icon: <FiMapPin />, 
    value: 'Tasikmalaya, Indonesia', 
    href: 'https://maps.google.com/?q=Tasikmalaya,Indonesia',
    label: 'Location'
  },
];

const HIGHLIGHTS = [
  { icon: <FiCode />, label: 'Full Stack Developer' },
  { icon: <FiAward />, label: 'Problem Solver' },
  { icon: <FiPlay />, label: 'Gamer' },
];

const Footer: FC = () => {
  return (
    <footer className="bg-terminal-darker border-t border-terminal-border relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full opacity-[0.03]"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-neon-purple via-neon-blue to-transparent rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <motion.div 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-neon-blue font-mono text-lg relative inline-block">
                  <span className="text-neon-purple">&lt;</span>
                  Febnawan FR
                  <span className="text-neon-purple">/&gt;</span>
                </h3>
              </motion.div>
              <p className="text-code-gray text-sm leading-relaxed">
                Passionate about creating elegant solutions through code. 
                Specializing in modern web development with a focus on user experience 
                and performance.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              {CONTACT_INFO.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  className="flex items-center gap-3 text-sm text-code-gray hover:text-neon-blue 
                           transition-colors group"
                  whileHover={{ x: 5 }}
                  aria-label={contact.label}
                >
                  <span className="text-neon-purple group-hover:text-neon-blue transition-colors">
                    {contact.icon}
                  </span>
                  <span className="truncate">{contact.value}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section, index) => (
            <div key={index} className="lg:col-span-2 space-y-4">
              <h3 className="text-neon-blue font-mono relative">
                <span className="text-neon-purple">const</span> {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex} 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    {link.icon && (
                      <span className="text-neon-purple">{link.icon}</span>
                    )}
                    <Link
                      href={link.href}
                      target="_blank"
                      className="text-sm text-code-gray hover:text-neon-blue transition-colors"
                    >
                      {link.label}

                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlights & Certificates Section */}
        <div className="border-t border-terminal-border pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-neon-blue font-mono text-sm mb-4">
                <span className="text-neon-purple">const</span> highlights
              </h3>
              <div className="flex flex-wrap gap-4">
                {HIGHLIGHTS.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-terminal-light/5 px-4 py-2 rounded-md
                             border border-terminal-border text-code-gray"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(56, 182, 255, 0.3)'
                    }}
                  >
                    <span className="text-neon-purple">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certificates Button */}
            <div className="space-y-4">
              <h3 className="text-neon-blue font-mono text-sm mb-4">
                <span className="text-neon-purple">const</span> certificates
              </h3>
              <motion.a
                href="/certificates"
                target="_blank"
                className="inline-flex items-center gap-3 bg-terminal-light/5 px-6 py-3 rounded-md
                         border border-terminal-border text-code-gray hover:text-neon-blue
                         transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(56, 182, 255, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiAward className="text-neon-purple" />
                <span className="text-sm">View All Certificates</span>
                <motion.span
                  className="text-neon-purple"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-terminal-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            {/* Copyright */}
            <div className="font-mono text-code-gray order-2 sm:order-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-neon-purple">const</span>{' '}
                <span className="text-neon-blue">madeWith</span>{' '}
                <span className="text-code-gray">=</span>{' '}
                <span className="text-code-white">
                  [<FiCode className="inline" />, <FiPlay className="inline" />, <FiHeart className="inline text-neon-purple" />]
                </span>
              </motion.div>
              <div className="mt-2">
                © {currentYear} Febnawan FR. All rights reserved.
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="order-1 sm:order-2 px-4 py-2 border border-terminal-border rounded-md
                       text-code-gray hover:text-neon-blue hover:border-neon-blue/30
                       transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
