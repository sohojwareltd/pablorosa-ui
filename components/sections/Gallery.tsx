'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  image: string;
  year?: string;
}

// Cover art images from public/coverart folder
const artworks: Artwork[] = [
  { id: 1, title: 'Cover Art 01', image: '/coverart/art1.jpg', year: '2024' },
  { id: 2, title: 'Cover Art 02', image: '/coverart/art2.jpg', year: '2024' },
  { id: 3, title: 'Cover Art 03', image: '/coverart/art3.jpg', year: '2023' },
  { id: 4, title: 'Cover Art 04', image: '/coverart/art4.jpg', year: '2023' },
];

export default function Gallery() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Interlocking grid pattern by varying row spans
  const layoutPattern = [
    'md:row-span-3',
    'md:row-span-2',
    'md:row-span-2 lg:row-span-3',
    'md:row-span-3',
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
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-grotesk">
              Finished Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Cover Art
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Visual narratives that echo the sonic landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[320px]">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`relative overflow-hidden bg-gray-100 ${layoutPattern[index % layoutPattern.length]} min-h-[320px] md:min-h-0 md:h-full group`}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.03 }}
            >
              {/* Colorful border on hover */}
              <motion.div
                className="absolute inset-0 border-4 pointer-events-none z-30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === artwork.id ? 1 : 0,
                  borderColor: [
                    'rgba(150, 0, 24, 0.6)',
                    'rgba(107, 70, 193, 0.6)',
                    'rgba(37, 99, 235, 0.6)',
                    'rgba(234, 88, 12, 0.6)',
                    'rgba(150, 0, 24, 0.6)',
                  ],
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  borderColor: {
                    duration: 2,
                    repeat: hoveredId === artwork.id ? Infinity : 0,
                    ease: 'easeInOut',
                  },
                }}
              />
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === artwork.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  animate={{
                    background: hoveredId === artwork.id
                      ? [
                          'linear-gradient(to top, rgba(150, 0, 24, 0.7), transparent)',
                          'linear-gradient(to top, rgba(107, 70, 193, 0.7), transparent)',
                          'linear-gradient(to top, rgba(37, 99, 235, 0.7), transparent)',
                          'linear-gradient(to top, rgba(150, 0, 24, 0.7), transparent)',
                        ]
                      : 'linear-gradient(to top, rgba(0, 0, 0, 0), transparent)',
                  }}
                  transition={{
                    duration: 3,
                    repeat: hoveredId === artwork.id ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
              
              {/* Image with Next.js Image component */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 600px"
                  quality={90}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
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

