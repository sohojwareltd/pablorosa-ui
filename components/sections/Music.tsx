'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Music() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Placeholder data - replace with actual Spotify/SoundCloud URLs
  const tracks = [
    {
      platform: 'spotify',
      embedUrl: 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator',
      title: 'Track Title 1',
    },
    {
      platform: 'spotify',
      embedUrl: 'https://open.spotify.com/embed/track/1Je1IMUlBXcx1Fz0WE7oPT?utm_source=generator',
      title: 'Track Title 2',
    },
    {
      platform: 'soundcloud',
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23960018&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
      title: 'SoundCloud Track',
    },
  ];

  return (
    <section
      id="music"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Music
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Soundscapes that blur the boundaries between emotion and architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              {track.platform === 'spotify' ? (
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={track.embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={track.embedUrl}
                />
              )}
              <p className="mt-4 text-sm text-gray-600 uppercase tracking-wider font-grotesk">
                {track.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

