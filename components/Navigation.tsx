'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Intro', href: '#intro' },
  { name: 'Music', href: '#music' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Sets', href: '#sets' },
  { name: 'Tour', href: '#tour' },
  { name: 'Journal', href: '#journal' },
  { name: 'Connect', href: '#connect' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    // Push main content when drawer opens
    const main = document.querySelector('main');
    if (main) {
      if (isOpen) {
        main.style.transform = 'translateX(300px)';
        main.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      } else {
        main.style.transform = 'translateX(0)';
        main.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow drawer to close
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-50 p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all duration-300 group pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
          <motion.span
            className="absolute w-6 h-0.5 bg-white origin-center"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -8,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute w-6 h-0.5 bg-white"
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-6 h-0.5 bg-white origin-center"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 8,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-40 pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Left Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed left-0 top-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl pointer-events-auto overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-8 border-b border-gray-200">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-serif uppercase tracking-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #000 0%, #960018 33%, #6b46c1 66%, #000 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Menu
                </motion.span>
              </motion.h2>
            </div>

            {/* Menu Items */}
            <ul className="p-8 space-y-2">
              {navItems.map((item, index) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                  >
                    <button
                      onClick={() => handleClick(item.href)}
                      className={`w-full text-left px-6 py-4 uppercase tracking-wider text-sm font-grotesk transition-all duration-300 relative group ${
                        isActive 
                          ? 'text-[#960018] bg-[#960018]/5' 
                          : 'text-gray-700 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-[#960018]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      
                      <span className="relative z-10 flex items-center justify-between">
                        <span>{item.name}</span>
                        <motion.svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </motion.svg>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Drawer Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-gray-200 bg-gray-50/50">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-500 uppercase tracking-wider font-grotesk"
              >
                Pablo Rosa © {new Date().getFullYear()}
              </motion.p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

