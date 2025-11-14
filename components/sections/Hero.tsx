'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure video autoplays when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay prevented, handle gracefully
      });
    }
  }, [videoLoaded]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('album') || document.getElementById('music');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20 md:py-32 relative overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/herovideo.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
      </div>

      {/* Animated Text Overlay - Always visible */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center space-y-6 md:space-y-8">
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-serif uppercase tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.3,
            }}
          >
            <motion.span
              className="relative inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #960018 20%, #6b46c1 40%, #2563eb 60%, #ea580c 80%, #ffffff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(150, 0, 24, 0.5))',
              }}
            >
              Pablo Rosa
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="space-y-4 max-w-3xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.8,
            }}
          >
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 font-sans font-light leading-relaxed drop-shadow-lg"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.3)',
                  '0 0 30px rgba(150, 0, 24, 0.4)',
                  '0 0 30px rgba(107, 70, 193, 0.4)',
                  '0 0 20px rgba(255, 255, 255, 0.3)',
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              A global creative sanctuary — where music, identity, and philosophy breathe in rhythm.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base font-grotesk uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <motion.span
                className="text-white/70"
                animate={{
                  color: ['rgba(255, 255, 255, 0.7)', '#960018', '#6b46c1', '#2563eb', 'rgba(255, 255, 255, 0.7)'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Minimal
              </motion.span>
              <span className="text-white/40">•</span>
              <motion.span
                className="text-white/70"
                animate={{
                  color: ['rgba(255, 255, 255, 0.7)', '#2563eb', '#ea580c', '#960018', 'rgba(255, 255, 255, 0.7)'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                Global
              </motion.span>
              <span className="text-white/40">•</span>
              <motion.span
                className="text-white/70"
                animate={{
                  color: ['rgba(255, 255, 255, 0.7)', '#6b46c1', '#960018', '#ea580c', 'rgba(255, 255, 255, 0.7)'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                Reflective
              </motion.span>
              <span className="text-white/40">•</span>
              <motion.span
                className="text-white/70"
                animate={{
                  color: ['rgba(255, 255, 255, 0.7)', '#ea580c', '#2563eb', '#6b46c1', 'rgba(255, 255, 255, 0.7)'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                Cinematic
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
        
      </motion.div>
      

    </section>
  );
}

