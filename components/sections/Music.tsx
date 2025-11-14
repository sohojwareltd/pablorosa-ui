'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

interface Track {
  embedUrl: string;
  title: string;
  artist?: string;
  duration?: string;
}

export default function Music() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { selectedTrack, openPlayer } = useMusicPlayer();

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
      className="min-h-screen py-20 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden"
    >
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-1 h-12 bg-white"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ originY: 0 }}
            />
            <div>
              <motion.span
                className="text-xs uppercase tracking-[0.3em] font-mono text-gray-400 block mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                [CATALOG]
              </motion.span>
              <motion.h2
                className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-white uppercase tracking-tighter"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                MUSIC
              </motion.h2>
            </div>
          </div>
          
          <motion.div
            className="flex items-center gap-4 text-gray-400 font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="text-white">[</span>
            <span>{tracks.length} TRACKS LOADED</span>
            <span className="text-white">]</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▊
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Grid Layout - System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <button
                onClick={() => openPlayer(track)}
                className="w-full text-left relative bg-[#0a0a0a] border border-gray-800 hover:border-gray-600 transition-all duration-300 overflow-hidden"
              >
                {/* Terminal-style header */}
                <div className="px-4 py-3 border-b border-gray-800 bg-[#050505] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Track info */}
                  <div>
                    <h3 className="text-lg md:text-xl font-mono font-bold text-white mb-2 uppercase tracking-tight">
                      {track.title}
                    </h3>
                    {track.artist && (
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        {track.artist}
                      </p>
                    )}
                  </div>

                  {/* Metadata row */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500 border-t border-gray-800 pt-4">
                    <span className="flex items-center gap-2">
                      <span className="text-green-400">▶</span>
                      <span>READY</span>
                    </span>
                    {track.duration && (
                      <span className="tabular-nums">{track.duration}</span>
                    )}
                  </div>

                  {/* Play indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <motion.div
                      className="w-1 h-4 bg-white"
                      animate={{
                        scaleY: selectedTrack?.embedUrl === track.embedUrl ? [1, 0.3, 1] : 0.3,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: selectedTrack?.embedUrl === track.embedUrl ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="w-1 h-4 bg-white"
                      animate={{
                        scaleY: selectedTrack?.embedUrl === track.embedUrl ? [1, 0.5, 1] : 0.3,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        repeat: selectedTrack?.embedUrl === track.embedUrl ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="w-1 h-4 bg-white"
                      animate={{
                        scaleY: selectedTrack?.embedUrl === track.embedUrl ? [1, 0.7, 1] : 0.3,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        repeat: selectedTrack?.embedUrl === track.embedUrl ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                    <span className="ml-2 text-gray-500">
                      {selectedTrack?.embedUrl === track.embedUrl ? 'PLAYING' : 'IDLE'}
                    </span>
                  </div>
                </div>

                {/* Hover effect - scan line */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ y: '-100%' }}
                  whileHover={{ y: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <div className="w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent" />
                </motion.div>

                {/* Active border glow */}
                {selectedTrack?.embedUrl === track.embedUrl && (
                  <motion.div
                    className="absolute inset-0 border-2 border-white pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

