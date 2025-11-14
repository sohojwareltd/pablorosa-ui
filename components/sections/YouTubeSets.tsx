'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface VideoSet {
  id: string;
  title: string;
  date?: string;
  description?: string;
}

// Placeholder video data - replace with actual YouTube video IDs
const videoSets: VideoSet[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Live Set — Ambient Sessions',
    date: '2024',
    description: 'A journey through ambient textures and rhythmic explorations.',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Live Set — Electronic Minimalism',
    date: '2024',
    description: 'Minimalist compositions in a live setting.',
  },
  {
    id: '9bZkp7q19f0',
    title: 'Live Set — Field Recordings',
    date: '2023',
    description: 'Captured moments from global travels and sonic discoveries.',
  },
];

export default function YouTubeSets() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="sets"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="mb-4">
            <motion.span
              className="text-xs uppercase tracking-[0.2em] font-grotesk inline-block"
              animate={{
                color: ['#9ca3af', '#960018', '#6b46c1', '#2563eb', '#9ca3af'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Finished Work
            </motion.span>
          </div>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight relative inline-block"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #fff 0%, #960018 33%, #6b46c1 66%, #fff 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            YouTube Sets
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Performance archives curated like a film collection.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {videoSets.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              <motion.div
                className="relative aspect-video bg-gray-900 group overflow-hidden rounded-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 border-2 pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  animate={{
                    borderColor: [
                      'rgba(150, 0, 24, 0.6)',
                      'rgba(107, 70, 193, 0.6)',
                      'rgba(37, 99, 235, 0.6)',
                      'rgba(150, 0, 24, 0.6)',
                    ],
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    borderColor: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                />
                <iframe
                  className="absolute inset-0 w-full h-full relative z-0"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>

              <motion.div
                className="space-y-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <motion.h3
                    className="text-2xl md:text-3xl font-serif mb-2"
                    animate={{
                      color: ['#ffffff', '#960018', '#6b46c1', '#2563eb', '#ffffff'],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5,
                    }}
                  >
                    {video.title}
                  </motion.h3>
                  {video.date && (
                    <motion.p
                      className="text-sm uppercase tracking-wider font-grotesk mb-4 inline-block"
                      animate={{
                        color: ['#9ca3af', '#960018', '#6b46c1', '#9ca3af'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                    >
                      {video.date}
                    </motion.p>
                  )}
                </div>
                
                {video.description && (
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    {video.description}
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

