'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hover]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`rounded-full transition-all duration-300 ${
          isHovering ? 'w-12 h-12 opacity-50' : 'w-4 h-4 opacity-100'
        }`}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: [
            '#960018',
            '#6b46c1',
            '#2563eb',
            '#ea580c',
            '#960018',
          ],
          boxShadow: [
            '0 0 20px rgba(150, 0, 24, 0.5)',
            '0 0 20px rgba(107, 70, 193, 0.5)',
            '0 0 20px rgba(37, 99, 235, 0.5)',
            '0 0 20px rgba(234, 88, 12, 0.5)',
            '0 0 20px rgba(150, 0, 24, 0.5)',
          ],
        }}
        transition={{
          backgroundColor: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          boxShadow: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: { duration: 0.3 },
        }}
      />
    </motion.div>
  );
}

