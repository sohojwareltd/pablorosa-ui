'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface Artwork {
  id: number;
  title: string;
  image: string;
  year?: string;
}

// Placeholder artwork data - replace with actual images
const artworks: Artwork[] = [
  { id: 1, title: 'Cover Art 01', image: '/api/placeholder/600/800', year: '2024' },
  { id: 2, title: 'Cover Art 02', image: '/api/placeholder/800/600', year: '2024' },
  { id: 3, title: 'Cover Art 03', image: '/api/placeholder/700/700', year: '2023' },
  { id: 4, title: 'Cover Art 04', image: '/api/placeholder/900/600', year: '2023' },
  { id: 5, title: 'Cover Art 05', image: '/api/placeholder/600/900', year: '2022' },
  { id: 6, title: 'Cover Art 06', image: '/api/placeholder/800/800', year: '2022' },
];

export default function Gallery() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Asymmetric grid layout
  const gridClasses = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1',
    'md:col-span-1 md:row-span-2',
    'md:col-span-2',
    'md:col-span-1',
    'md:col-span-2 md:row-span-1',
  ];

  return (
    <section
      id="gallery"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Cover Art
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Visual narratives that echo the sonic landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-6 md:gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`relative overflow-hidden bg-gray-100 ${gridClasses[index]} aspect-[3/4] md:aspect-auto`}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === artwork.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Placeholder for image - replace with Next.js Image component */}
              <div className="w-full h-full bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {artwork.title}
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: hoveredId === artwork.id ? 0 : 20,
                  opacity: hoveredId === artwork.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white text-lg md:text-xl font-serif mb-1">
                  {artwork.title}
                </h3>
                {artwork.year && (
                  <p className="text-white/80 text-sm uppercase tracking-wider font-grotesk">
                    {artwork.year}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

