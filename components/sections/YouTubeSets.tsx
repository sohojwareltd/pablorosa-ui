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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            YouTube Sets
          </h2>
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
              <div className="relative aspect-video bg-gray-900">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif mb-2">
                    {video.title}
                  </h3>
                  {video.date && (
                    <p className="text-sm text-gray-400 uppercase tracking-wider font-grotesk mb-4">
                      {video.date}
                    </p>
                  )}
                </div>
                
                {video.description && (
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

