'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  animX: number[];
  animY: number[];
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  const [orbs] = useState<Orb[]>(() => 
    Array.from({ length: 8 }, (_, i) => {
      const size = 200 + Math.random() * 300;
      return {
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 15,
        animX: [
          0,
          (Math.random() - 0.5) * size * 0.3,
          (Math.random() - 0.5) * size * 0.3,
          0,
        ],
        animY: [
          0,
          (Math.random() - 0.5) * size * 0.3,
          (Math.random() - 0.5) * size * 0.3,
          0,
        ],
      };
    })
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white opacity-90" />
      
      {/* Animated orbs with mouse interaction */}
      {orbs.map((orb, index) => {
        const offsetX = useTransform(
          mouseXSpring,
          [0, 100],
          [-orb.size * 0.15, orb.size * 0.15]
        );
        const offsetY = useTransform(
          mouseYSpring,
          [0, 100],
          [-orb.size * 0.15, orb.size * 0.15]
        );

        // Rotate through different colors
        const colorIndex = index % 5;
        const colorMap = [
          { color: 'rgba(150, 0, 24, 0.12)', name: 'carmine' },      // Carmine red
          { color: 'rgba(107, 70, 193, 0.10)', name: 'purple' },     // Purple
          { color: 'rgba(37, 99, 235, 0.10)', name: 'blue' },        // Blue
          { color: 'rgba(234, 88, 12, 0.10)', name: 'orange' },      // Orange
          { color: 'rgba(138, 138, 138, 0.06)', name: 'gray' },      // Gray
        ];
        const gradientColor = colorMap[colorIndex].color;

        return (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
              x: offsetX,
              y: offsetY,
            }}
            animate={{
              x: orb.animX,
              y: orb.animY,
              scale: [1, 1.3, 0.9, 1.1, 1],
              opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.5,
            }}
          />
        );
      })}

      {/* Floating particles with more colors */}
      {Array.from({ length: 30 }).map((_, i) => {
        const colorOptions = ['#960018', '#6b46c1', '#2563eb', '#ea580c', '#8a8a8a'];
        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 5,
              height: 2 + Math.random() * 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: randomColor,
              opacity: 0.25,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(150, 0, 24, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(150, 0, 24, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
