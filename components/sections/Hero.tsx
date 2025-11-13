'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import InteractiveBackground from '@/components/InteractiveBackground';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 relative overflow-hidden bg-white"
    >
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              Pablo Rosa
            </motion.h1>
            
            <motion.div
              className="max-w-2xl mx-auto lg:mx-0 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
                A global creative sanctuary — where music, identity, and philosophy breathe in rhythm.
              </p>
              
              <motion.p
                className="text-base md:text-lg text-gray-600 italic leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2 }}
              >
                Minimal. Global. Reflective. Cinematic. Textural. Emotional.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                className="inline-block"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Artist Image */}
          <motion.div
            className="relative w-full aspect-[3/4] max-w-xs mx-auto lg:max-w-sm"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative w-full h-full">
              {/* Decorative border */}
              <div className="absolute inset-0 border-2 border-[#960018]/20 rounded-sm z-0" />
              
              {/* Image container with subtle shadow */}
              <motion.div
                className="relative w-full h-full rounded-sm overflow-hidden bg-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image
                  src="/artist-image.jpg"
                  alt="Pablo Rosa"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                
                {/* Fallback placeholder */}
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-200 text-gray-400 font-serif text-lg">
                  Artist Image
                </div>
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none z-10" />
              </motion.div>
              
              {/* Accent line */}
              <div className="absolute -bottom-4 -right-4 w-24 h-1 bg-[#960018] opacity-30 z-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

