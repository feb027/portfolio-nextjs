import { FC, JSX } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactInfo: FC = () => {
  const commandPrompts = [
    { command: 'contact.init()', delay: 0 },
    { command: 'loading dependencies...', delay: 0.5 },
    { command: 'establishing connection...', delay: 1 },
    { command: 'connection_secure ✓', delay: 1.5 },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative"
    >
      <div className="bg-terminal-darker rounded-xl border border-terminal-border overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-terminal-dark border-b border-terminal-border p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-sm text-code-gray">~/contact_info</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Command History */}
          <div className="space-y-2 mb-6 font-mono text-sm">
            {commandPrompts.map((item, index) => (
              <motion.div
                key={item.command}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay }}
                className="flex items-center gap-2"
              >
                <span className="text-neon-purple select-none">❯</span>
                <span className="text-code-white">{item.command}</span>
                {index === commandPrompts.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-neon-blue"
                  >
                    █
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Methods */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<FiMail />}
                  label="Email"
                  value="febnawanrochman2@gmail.com"
                  href="mailto:febnawanrochman2@gmail.com"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<FiPhone />}
                  label="Phone"
                  value="+62 853 144 937"
                  href="tel:+62853144937"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<FiGithub />}
                  label="GitHub"
                  value="github.com/feb027"
                  href="https://github.com/feb027"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<FiLinkedin />}
                  label="LinkedIn"
                  value="linkedin.com/in/feb027"
                  href="https://linkedin.com/in/feb027"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <ContactCard
                  icon={<FiMapPin />}
                  label="Location"
                  value="Tasikmalaya, Indonesia"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Status Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 flex items-center gap-2"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-neon-cyan"
            />
            <span className="text-xs font-mono text-code-gray">System online and ready</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface ContactCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
  href?: string;
}

const ContactCard: FC<ContactCardProps> = ({ icon, label, value, href }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-terminal-dark p-4 rounded-lg border border-terminal-border 
                hover:border-neon-blue/30 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-2">
        <motion.div 
          className="text-neon-blue text-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <div className="min-w-0">
          <div className="text-xs text-code-gray font-mono">{label}</div>
          {href ? (
            <a
              href={href}
              className="text-sm text-neon-cyan hover:text-neon-blue transition-colors block truncate 
                       hover:text-clip hover:whitespace-normal group-hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              title={value}
            >
              {value}
            </a>
          ) : (
            <span className="text-sm text-code-white block truncate" title={value}>
              {value}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
