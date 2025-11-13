'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Track {
  platform: 'spotify' | 'soundcloud';
  embedUrl?: string;
  trackUrl?: string; // For SoundCloud: the track's page URL
  title: string;
}

export default function Music() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Placeholder data - replace with actual Spotify/SoundCloud URLs
  const tracks: Track[] = [
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
      embedUrl: 'https://soundcloud.com/user-394444112/sets/ed-sheeran-afterglow-the?si=87e07b7e1dcd474d9cf1273b7aedfffb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', // Replace with your SoundCloud track URL
      // Format: https://soundcloud.com/username/track-name
      // The component will build the embed URL from this
      trackUrl: 'https://soundcloud.com/user-394444112/sets/ed-sheeran-afterglow-the?si=87e07b7e1dcd474d9cf1273b7aedfffb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', // e.g., 'https://soundcloud.com/username/track-name'
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
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-grotesk">
              Finished Work
            </span>
          </div>
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
              className={`bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500 ${
                track.platform === 'soundcloud' ? 'lg:col-span-2' : ''
              }`}
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
              ) : track.platform === 'soundcloud' ? (
                <div className="w-full">
                  {(() => {
                    // Build SoundCloud embed URL
                    const soundcloudUrl = track.trackUrl || track.embedUrl;
                    if (!soundcloudUrl) {
                      return (
                        <div className="w-full h-[352px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                          <p>Add your SoundCloud track URL</p>
                        </div>
                      );
                    }
                    
                    // If it's already a full embed URL, use it
                    if (soundcloudUrl.includes('w.soundcloud.com/player')) {
                      return (
                        <div className="w-full rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="352"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={soundcloudUrl}
                            className="rounded-lg"
                            style={{ borderRadius: '12px' }}
                            loading="lazy"
                          />
                        </div>
                      );
                    }
                    
                    // Otherwise, build the embed URL from the track URL
                    // Remove query parameters for cleaner embed
                    const cleanUrl = soundcloudUrl.split('?')[0];
                    const encodedUrl = encodeURIComponent(cleanUrl);
                    const embedUrl = `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true&sharing=true&download=false&liking=true&buying=false`;
                    
                    return (
                      <div className="w-full rounded-lg overflow-hidden bg-white">
                        <iframe
                          width="100%"
                          height="352"
                          scrolling="no"
                          frameBorder="no"
                          allow="autoplay"
                          src={embedUrl}
                          className="rounded-lg"
                          style={{ borderRadius: '12px', border: 'none' }}
                          loading="lazy"
                        />
                      </div>
                    );
                  })()}
                </div>
              ) : null}
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

