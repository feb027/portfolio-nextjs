import { FC } from 'react';
import { motion } from 'framer-motion';

export interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
  mobile?: boolean;
  activeSection?: string;
  onClose?: () => void;
}

const NavLinks: FC<NavLinksProps> = ({ items, mobile = false, activeSection, onClose }) => {
  const baseStyles = mobile 
    ? 'flex flex-col space-y-4' 
    : 'hidden md:flex items-center justify-center space-x-6 h-full';

  // Enhanced container variants with mobile-specific animations
  const containerVariants = {
    hidden: { 
      opacity: 0,
      ...(mobile && { height: 0 })
    },
    visible: {
      opacity: 1,
      ...(mobile && { height: 'auto' }),
      transition: {
        staggerChildren: mobile ? 0.1 : 0.05,
        delayChildren: mobile ? 0.2 : 0,
        when: "beforeChildren",
        duration: mobile ? 0.3 : 0.2
      }
    },
    exit: {
      opacity: 0,
      ...(mobile && { height: 0 }),
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  // Enhanced item variants with mobile-specific animations
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: mobile ? 20 : 0,
      x: mobile ? -20 : 0,
      scale: mobile ? 0.9 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: mobile ? 200 : 260,
        damping: mobile ? 15 : 20,
        mass: mobile ? 1.2 : 1
      }
    },
    exit: {
      opacity: 0,
      y: mobile ? 10 : 0,
      x: mobile ? -10 : 0,
      scale: mobile ? 0.95 : 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (mobile && onClose) {
        onClose();
      }
    }
  };

  return (
    <motion.div 
      className={`${baseStyles} w-full`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {items.map((item, index) => {
        const isActive = activeSection === item.href;
        return (
          <motion.a
            key={item.href}
            variants={itemVariants}
            custom={index}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`group relative inline-flex items-center justify-center px-3 py-1.5 
                      font-mono text-sm tracking-wide transition-colors
                      hover:text-neon-blue focus:outline-none focus:ring-1 
                      focus:ring-neon-blue/30 rounded
                      ${isActive ? 'text-neon-blue' : 'text-code-gray'}
                      ${mobile ? 'text-base py-2' : ''}`}
            animate={{ 
              scale: isActive ? 1.05 : 1,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }
            }}
            whileHover={{ 
              scale: 1.1,
              x: mobile ? 10 : 0,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }
            }}
          >
            {/* Glowing background effect */}
            <motion.span 
              className={`absolute inset-0 rounded opacity-0 transition-all duration-300 
                         bg-gradient-to-r from-neon-blue/10 to-neon-purple/10
                         group-hover:opacity-100 blur-[2px] -z-10
                         ${isActive ? 'opacity-100' : ''}`}
              layoutId={`glow-${mobile ? 'mobile' : 'desktop'}-${item.href}`}
            />
            
            {/* Main content */}
            <span className="relative inline-flex items-center justify-center">
              {/* Animated brackets */}
              <motion.span 
                className="mr-0.5 text-neon-blue/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -10 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {`{`}
              </motion.span>
              
              <span className="relative inline-block">{item.label}</span>
              
              <motion.span 
                className="ml-0.5 text-neon-blue/50"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 10 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {`}`}
              </motion.span>
              
              {/* Animated underline */}
              <motion.span 
                className="absolute -bottom-1 left-1/2 h-px bg-gradient-to-r 
                          from-transparent via-neon-blue to-transparent"
                initial={{ width: 0 }}
                animate={{ 
                  width: isActive ? '100%' : '0%',
                  translateX: '-50%'
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
              
              {/* Active indicator dot */}
              <motion.span 
                className="absolute -bottom-1 left-1/2 h-[3px] rounded-full bg-neon-blue/50 shadow-glow"
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: isActive ? '4px' : '0px',
                  opacity: isActive ? 1 : 0,
                  translateX: '-50%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default NavLinks;
