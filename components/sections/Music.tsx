'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaSpotify } from 'react-icons/fa';

interface Track {
  embedUrl: string;
  title: string;
  artist?: string;
  duration?: string;
}

export default function Music() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedTrack, setSelectedTrack] = useState(0);

  // Placeholder data - replace with actual Spotify embed URLs
  // Format: https://open.spotify.com/embed/track/TRACK_ID?utm_source=generator
  const tracks: Track[] = [
    {
      embedUrl: 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator',
      title: 'Track Title 1',
      artist: 'Pablo Rosa',
      duration: '3:45',
    },
    {
      embedUrl: 'https://open.spotify.com/embed/track/1Je1IMUlBXcx1Fz0WE7oPT?utm_source=generator',
      title: 'Track Title 2',
      artist: 'Pablo Rosa',
      duration: '4:12',
    },
    {
      embedUrl: 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator',
      title: 'Track Title 3',
      artist: 'Pablo Rosa',
      duration: '3:28',
    },
    {
      embedUrl: 'https://open.spotify.com/embed/track/1Je1IMUlBXcx1Fz0WE7oPT?utm_source=generator',
      title: 'Track Title 4',
      artist: 'Pablo Rosa',
      duration: '5:02',
    },
    {
      embedUrl: 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator',
      title: 'Track Title 5',
      artist: 'Pablo Rosa',
      duration: '4:35',
    },
    {
      embedUrl: 'https://open.spotify.com/embed/track/1Je1IMUlBXcx1Fz0WE7oPT?utm_source=generator',
      title: 'Track Title 6',
      artist: 'Pablo Rosa',
      duration: '3:15',
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
            <motion.span
              className="text-xs uppercase tracking-[0.2em] font-grotesk inline-block"
              animate={{
                color: ['#6b7280', '#960018', '#6b46c1', '#2563eb', '#6b7280'],
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
              backgroundImage: 'linear-gradient(90deg, #000 0%, #960018 33%, #6b46c1 66%, #000 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Music
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Soundscapes that blur the boundaries between emotion and architecture.
          </p>
        </motion.div>

        {/* 2-Column Layout: Embed | Scrollable List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Selected Track Embed */}
          <motion.div
            key={selectedTrack}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative group"
          >
            {/* Decorative background elements */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#1DB954]/5 via-[#1DB954]/10 to-purple-100/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#1DB954]/10 to-transparent rounded-xl -z-10" />

            {/* Main card */}
            <div className="relative bg-white border-2 border-gray-200 p-6 md:p-8 shadow-lg rounded-xl overflow-hidden">
              {/* Gradient accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1DB954] via-purple-500 to-[#1DB954]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ originX: 0 }}
              />

              {/* Track Info Header */}
              <div className="mb-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-2 leading-tight">
                        {tracks[selectedTrack].title}
                      </h3>
                    </motion.div>
                    {tracks[selectedTrack].artist && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-sm md:text-base text-gray-600 uppercase tracking-wider font-grotesk mb-3"
                      >
                        {tracks[selectedTrack].artist}
                      </motion.p>
                    )}
                    {tracks[selectedTrack].duration && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                        <p className="text-sm text-gray-500 font-grotesk tabular-nums">
                          {tracks[selectedTrack].duration}
                        </p>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <div className="relative">
                      <FaSpotify className="text-4xl md:text-5xl text-[#1DB954] drop-shadow-lg" />
                      <motion.div
                        className="absolute inset-0 bg-[#1DB954] rounded-full blur-xl opacity-30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Divider with decorative elements */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <motion.div
                    className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="text-xs uppercase tracking-widest font-grotesk text-gray-400 px-3"
                  >
                    Now Playing
                  </motion.span>
                  <motion.div
                    className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Spotify Embed with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-inner group/embed"
              >
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover/embed:opacity-100 transition-opacity duration-500" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1DB954]/20 via-purple-500/20 to-[#1DB954]/20 rounded-xl blur-md opacity-0 group-hover/embed:opacity-100 transition-opacity duration-500 -z-10" />

                <iframe
                  src={tracks[selectedTrack].embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full relative z-10 rounded-xl"
                  key={selectedTrack}
                />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#1DB954]/10 to-transparent pointer-events-none rounded-bl-full" />
              </motion.div>

              {/* Bottom decorative element */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                className="h-px bg-gradient-to-r from-transparent via-[#1DB954] to-transparent mt-6"
              />
            </div>
          </motion.div>

          {/* Right: Scrollable Track List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)]"
          >
            <div 
              className="bg-white border border-gray-200 px-6 md:px-8 pt-0 pb-8 h-full overflow-y-auto custom-scrollbar relative"
              onWheel={(e) => {
                // Prevent scroll from propagating to parent
                e.stopPropagation();
              }}
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(138, 138, 138, 0.3) transparent'
              }}
            >
              <div className="sticky top-0 z-30 mb-8 bg-white pt-6 md:pt-8 pb-4 border-b border-gray-200 shadow-sm -mx-6 md:-mx-8 px-6 md:px-8">
                <h3 className="text-xs uppercase tracking-[0.3em] font-grotesk text-gray-400">
                  Tracks — {tracks.length}
                </h3>
              </div>
              
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedTrack(index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`w-full text-left p-5 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                      selectedTrack === index
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                    }`}
                    whileHover={{ x: 2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    
                    {/* Active indicator line */}
                    {selectedTrack === index && (
                      <motion.div
                        layoutId="activeTrack"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#1DB954] rounded-r-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-4 relative z-10">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className={`text-xs font-grotesk tabular-nums font-medium ${
                            selectedTrack === index ? 'text-[#1DB954]' : 'text-gray-400'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h4 className={`font-serif text-lg md:text-xl leading-tight ${
                            selectedTrack === index ? 'text-[#1DB954]' : 'text-gray-900'
                          }`}>
                            {track.title}
                          </h4>
                        </div>
                        {track.artist && (
                          <p className={`text-xs uppercase tracking-wider font-grotesk ml-5 ${
                            selectedTrack === index ? 'text-[#1DB954]' : 'text-gray-500'
                          }`}>
                            {track.artist}
                          </p>
                        )}
                        {track.duration && (
                          <div className="flex items-center gap-2 ml-5 mt-2">
                            <div className={`w-1 h-1 rounded-full ${
                              selectedTrack === index ? 'bg-[#1DB954]' : 'bg-gray-300'
                            }`} />
                            <p className="text-xs text-gray-500 font-grotesk tabular-nums">
                              {track.duration}
                            </p>
                          </div>
                        )}
                      </div>
                      <motion.div
                        animate={{
                          scale: selectedTrack === index ? [1, 1.1, 1] : 1,
                          rotate: selectedTrack === index ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: selectedTrack === index ? Infinity : 0,
                          repeatDelay: 2,
                        }}
                      >
                        <FaSpotify 
                          className={`text-xl flex-shrink-0 transition-colors duration-300 ${
                            selectedTrack === index ? 'text-[#1DB954]' : 'text-gray-300 group-hover:text-[#1DB954]'
                          }`}
                        />
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Bottom spacing */}
              <div className="h-8" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

