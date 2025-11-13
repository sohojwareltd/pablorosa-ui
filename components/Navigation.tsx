'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Intro', href: '#intro' },
  { name: 'Music', href: '#music' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Sets', href: '#sets' },
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

  const handleClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow menu to close
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-end pt-8">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto relative z-10 px-4 py-2 text-sm uppercase tracking-wider font-grotesk"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">
              Menu
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#960018]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-24 right-6 md:right-12 pointer-events-auto bg-white/95 backdrop-blur-sm shadow-lg p-8 min-w-[200px]"
            >
              <ul className="space-y-4">
                {navItems.map((item) => {
                  const sectionId = item.href.substring(1);
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => handleClick(item.href)}
                        className={`text-left uppercase tracking-wider text-sm font-grotesk transition-colors ${
                          isActive ? 'text-[#960018]' : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

