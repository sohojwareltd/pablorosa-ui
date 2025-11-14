'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

export default function MusicPlayerDrawer() {
  const { selectedTrack, closePlayer, isOpen } = useMusicPlayer();
  const [isMobile, setIsMobile] = useState(true);

  // Detect screen size for drawer animation direction
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!selectedTrack) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePlayer}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ 
              y: isMobile ? '100%' : 0,
              x: isMobile ? 0 : '100%',
            }}
            animate={{ 
              y: 0,
              x: 0,
            }}
            exit={{ 
              y: isMobile ? '100%' : 0,
              x: isMobile ? 0 : '100%',
            }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:w-[500px] lg:w-[600px] bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-gray-800 z-[101] shadow-2xl overflow-y-auto"
            style={{
              maxHeight: '100vh',
            }}
          >
            {/* Terminal header */}
            <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-800 bg-[#050505] flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-mono text-gray-400 ml-2">
                  SPOTIFY_PLAYER.EXE
                </span>
              </div>
              <button
                onClick={closePlayer}
                className="text-gray-500 hover:text-white font-mono text-sm transition-colors duration-200 flex items-center gap-2"
                aria-label="Close player"
              >
                <FaTimes className="text-base" />
                <span className="hidden md:inline">[CLOSE]</span>
              </button>
            </div>

            {/* Player content */}
            <div className="p-6 md:p-8">
              {/* Track info */}
              <div className="mb-6 space-y-2">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white uppercase tracking-tight">
                  {selectedTrack.title}
                </h3>
                {selectedTrack.artist && (
                  <p className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                    {selectedTrack.artist}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                  <span>STATUS: <span className="text-green-400">ACTIVE</span></span>
                  {selectedTrack.duration && (
                    <span>DURATION: {selectedTrack.duration}</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-800 mb-6" />

              {/* Embed container */}
              <div className="relative bg-black border border-gray-800 rounded-sm overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                <iframe
                  src={selectedTrack.embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="w-full relative z-0"
                  key={selectedTrack.embedUrl}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
              </div>

              {/* Footer info */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
                <span>STREAM: SPOTIFY</span>
                <span>QUALITY: HIGH</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

