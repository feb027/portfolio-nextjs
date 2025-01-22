import { FC, JSX } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactInfo: FC = () => {
  const commandPrompts = [
    { command: 'contact.init()', delay: 0 },
    { command: 'connection_secure ✓', delay: 1 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="bg-terminal-darker p-6 rounded-xl border border-terminal-border">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="font-mono text-sm text-code-gray">~/contact_info</span>
          </div>
        </div>

        {/* Command History */}
        <div className="space-y-2 mb-6 font-mono text-sm">
          {commandPrompts.map((item) => (
            <motion.div
              key={item.command}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay * 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-neon-purple">❯</span>
              <span className="text-code-white">{item.command}</span>
            </motion.div>
          ))}
        </div>

        {/* Contact Methods */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <ContactCard
              icon={<FiMail />}
              label="Email"
              value="febnawanrochman2@gmail.com"
              href="mailto:febnawanrochman2@gmail.com"
            />
            <ContactCard
              icon={<FiPhone />}
              label="Phone"
              value="+62 853 144 937"
              href="tel:+62853144937"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ContactCard
              icon={<FiGithub />}
              label="GitHub"
              value="github"
              href="https://github.com/feb027"
            />
            <ContactCard
              icon={<FiLinkedin />}
              label="LinkedIn"
              value="linkedin"
              href="https://linkedin.com"
            />
            <ContactCard
              icon={<FiMapPin />}
              label="Location"
              value="Tasikmalaya, Indonesia"
            />
          </div>
        </motion.div>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center gap-2">
          <div className="animate-pulse w-2 h-2 rounded-full bg-neon-cyan"></div>
          <span className="text-xs font-mono text-code-gray">System online</span>
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
      whileHover={{ scale: 1.02 }}
      className="bg-terminal-dark p-4 rounded-lg border border-terminal-border hover:border-neon-blue/30 transition-colors group"
    >
      <div className="flex flex-col gap-2">
        <div className="text-neon-blue text-xl">
          {icon}
        </div>
        <div className="min-w-0"> {/* Add min-w-0 to enable truncation */}
          <div className="text-xs text-code-gray">{label}</div>
          {href ? (
            <a
              href={href}
              className="text-sm text-neon-cyan hover:text-neon-blue transition-colors block truncate hover:text-clip hover:whitespace-normal"
              target="_blank"
              rel="noopener noreferrer"
              title={value} /* Add tooltip on hover */
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
