'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';
import { FaSpotify, FaAmazon, FaPlay, FaPause } from 'react-icons/fa';
import { SiApple } from 'react-icons/si';
import Image from 'next/image';

interface Track {
  title: string;
  duration: string;
  youtubeId?: string;
}

interface Album {
  title: string;
  year: string;
  description: string;
  coverArt: string;
  demoAudioUrl: string; // Demo audio file URL
  tracks: Track[];
  links: {
    spotify?: string;
    itunes?: string;
    amazon?: string;
  };
}

// Placeholder album data - replace with your actual album
const latestAlbum: Album = {
  title: 'Everything is Love',
  year: '2024',
  description: 'Effortless comfortable full leather lining eye-catching unique detail to the toe low cut-away sides clean and sleek. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design.',
  coverArt: '/coverart/art1.jpg',
  // Demo audio file - replace with your actual audio file URL
  // Supported formats: MP3, WAV, OGG, etc.
  demoAudioUrl: '/audio/demo.mp3', // Place your demo audio file in public/audio/demo.mp3
  tracks: [
    { title: 'Give Me One Moment in Time', duration: '04:35' },
    { title: 'Everything I Do I Do it for You', duration: '04:17' },
    { title: 'I Will Be Right Here Waiting for You', duration: '03:59' },
    { title: 'Close Your Eyes Give Me Your Hand', duration: '03:08' },
    { title: 'More Than Words', duration: '04:07' },
    { title: "I Can't Fight This Feeling Anymore", duration: '04:47' },
    { title: 'Think Twice', duration: '04:20' },
  ],
  links: {
    spotify: 'https://open.spotify.com/album/example',
    itunes: 'https://music.apple.com/album/example',
    amazon: 'https://music.amazon.com/albums/example',
  },
};

// Format time helper
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function AlbumHero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(137); // 2:17 in seconds (2*60 + 17 = 137)
  const [trackTitle, setTrackTitle] = useState(latestAlbum.tracks[0]?.title || 'Demo Track');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  return (
    <section
      id="album"
      ref={ref}
      className="min-h-screen py-20 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] font-grotesk inline-block"
              animate={{
                color: ['#6b7280', '#960018', '#6b46c1', '#2563eb', '#6b7280'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Latest
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tight"
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
              Album
            </motion.h1>
          </div>
          
          {/* Platform Links */}
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.a
              href={latestAlbum.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-[#1DB954] transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSpotify className="text-xl text-[#1DB954] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm uppercase tracking-wider font-grotesk text-gray-700 group-hover:text-[#1DB954]">
                Spotify
              </span>
            </motion.a>
            <motion.a
              href={latestAlbum.links.itunes}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiApple className="text-xl text-black group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm uppercase tracking-wider font-grotesk text-gray-700 group-hover:text-black">
                iTunes
              </span>
            </motion.a>
            <motion.a
              href={latestAlbum.links.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-[#FF9900] transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaAmazon className="text-xl text-[#FF9900] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm uppercase tracking-wider font-grotesk text-gray-700 group-hover:text-[#FF9900]">
                Amazon
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Split Screen: Audio Player | Album Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Audio Player - Musico Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative max-w-2xl mx-auto lg:mx-0"
          >
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={latestAlbum.demoAudioUrl} preload="metadata" />

            {/* Player Container */}
            <div className="relative bg-white border-2 border-gray-200 overflow-hidden shadow-xl">
              {/* Cover Photo Section */}
              <div className="relative w-full aspect-square bg-gray-100">
                <Image
                  src={latestAlbum.coverArt}
                  alt={latestAlbum.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={90}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Content Overlay on Cover */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
                  {/* Latest Badge */}
                  <div>
                    <motion.span
                      className="text-xs uppercase tracking-[0.3em] font-grotesk inline-block"
                      animate={{
                        color: ['rgba(255, 255, 255, 0.9)', '#960018', '#6b46c1', '#2563eb', 'rgba(255, 255, 255, 0.9)'],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      Latest
                    </motion.span>
                  </div>

                  {/* Track Title */}
                  <div>
                    <motion.h2
                      className="text-2xl md:text-3xl lg:text-4xl font-serif mb-2 uppercase tracking-tight"
                      animate={{
                        color: ['#ffffff', '#960018', '#6b46c1', '#ffffff'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {trackTitle}
                    </motion.h2>
                    <p className="text-sm text-white/80 uppercase tracking-wider font-grotesk">
                      {latestAlbum.year}
                    </p>
                  </div>
                </div>
              </div>

              {/* Player Controls Section */}
              <div className="p-6 md:p-8">

                {/* Player Controls */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.button
                    onClick={togglePlay}
                    className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black text-white hover:bg-[#960018] transition-colors duration-300 group flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <FaPause className="text-lg md:text-xl ml-0.5" />
                    ) : (
                      <FaPlay className="text-lg md:text-xl ml-1" />
                    )}
                  </motion.button>

                  {/* Time Display */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm md:text-base font-grotesk text-gray-700 tabular-nums">
                      {formatTime(currentTime)}
                    </span>
                    <span className="text-sm md:text-base font-grotesk text-gray-400">/</span>
                    <span className="text-sm md:text-base font-grotesk text-gray-500 tabular-nums">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="relative h-1 bg-gray-200 cursor-pointer group mb-6"
                  onClick={handleProgressClick}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-[#960018] transition-all duration-150"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#960018] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      animate={{
                        scale: isPlaying ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        repeat: isPlaying ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </div>

                {/* Album Title Badge */}
                <motion.div
                  className="text-center pt-4 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <motion.h3
                    className="text-xl md:text-2xl font-serif mb-1"
                    animate={{
                      color: ['#000', '#960018', '#6b46c1', '#000'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {latestAlbum.title}
                  </motion.h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-grotesk">
                    Album Demo Preview
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Album Details & Tracklist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Album Title & Description */}
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 uppercase tracking-tight"
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
                {latestAlbum.title}
              </motion.h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {latestAlbum.description}
              </p>
              
              {/* Buy Album Button */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#960018] text-white uppercase tracking-wider font-grotesk text-sm hover:bg-[#7a0014] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Buy Album</span>
                <span>→</span>
              </motion.a>

              {/* Listen On Links */}
              <div className="mt-6">
                <h3 className="text-sm uppercase tracking-wider font-grotesk text-gray-600 mb-4">
                  Listen on
                </h3>
                <div className="flex flex-wrap gap-3">
                  {latestAlbum.links.spotify && (
                    <motion.a
                      href={latestAlbum.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-[#1DB954] hover:text-white transition-colors duration-300 rounded-sm group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaSpotify className="text-lg text-[#1DB954] group-hover:text-white transition-colors duration-300" />
                      <span className="text-xs uppercase tracking-wider font-grotesk">Spotify</span>
                    </motion.a>
                  )}
                  {latestAlbum.links.itunes && (
                    <motion.a
                      href={latestAlbum.links.itunes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300 rounded-sm group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <SiApple className="text-lg text-black group-hover:text-white transition-colors duration-300" />
                      <span className="text-xs uppercase tracking-wider font-grotesk">iTunes</span>
                    </motion.a>
                  )}
                  {latestAlbum.links.amazon && (
                    <motion.a
                      href={latestAlbum.links.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-[#FF9900] hover:text-white transition-colors duration-300 rounded-sm group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaAmazon className="text-lg text-[#FF9900] group-hover:text-white transition-colors duration-300" />
                      <span className="text-xs uppercase tracking-wider font-grotesk">Amazon</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>

            {/* Tracklist */}
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-serif mb-6 uppercase tracking-tight"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #000 0%, #960018 50%, #000 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Tracklist
              </motion.h2>
              <div className="space-y-3">
                {latestAlbum.tracks.map((track, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-xs text-gray-500 font-grotesk w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base md:text-lg font-grotesk text-gray-800 group-hover:text-[#960018] transition-colors duration-300">
                        {track.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 font-grotesk">
                      {track.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Notes/Credits */}
            <div className="pt-6 border-t border-gray-200">
              <motion.h2
                className="text-xl md:text-2xl font-serif mb-4 uppercase tracking-tight"
                animate={{
                  color: ['#000', '#960018', '#6b46c1', '#000'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Notes
              </motion.h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Music & Lyrics by PABLO ROSA<br />
                Produced by PABLO ROSA<br />
                Recorded at various studios worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

