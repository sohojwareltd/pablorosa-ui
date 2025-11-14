'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

import Image from 'next/image';

interface TourDate {
  id: number;
  date: string;
  time: string;
  venue: string;
  location: string;
  ticketUrl?: string;
  backgroundImage: string;
}

// Placeholder tour dates - replace with actual dates
const tourDates: TourDate[] = [
  {
    id: 1,
    date: '20 November 2024',
    time: '18:00 - 23:00',
    venue: 'Videotron Center',
    location: 'Manhattan, NY, United States',
    ticketUrl: '#',
    backgroundImage: '/tour/tour1.jpg',
  },
  {
    id: 2,
    date: '6 December 2024',
    time: '18:00 - 23:00',
    venue: 'Spotify On Stage',
    location: 'Suncorp Stadium, Brisbane, Australia',
    ticketUrl: '#',
    backgroundImage: '/tour/tour2.jpg',
  },
  {
    id: 3,
    date: '15 February 2025',
    time: '18:00 - 23:00',
    venue: 'Halloween Bitchy Land',
    location: 'Mediolanum Forum, Milan, Italy',
    ticketUrl: '#',
    backgroundImage: '/tour/tour3.jpg',
  },
  {
    id: 4,
    date: '28 April 2025',
    time: '18:00 - 23:00',
    venue: 'Cornelius - Singha Light',
    location: 'Odyssey (SSE Belfast), Belfast, United Kingdom',
    ticketUrl: '#',
    backgroundImage: '/tour/tour4.jpg',
  },
];

export default function TourSlider() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tourDates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tourDates.length) % tourDates.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get month abbreviation for pagination
  const getMonthAbbr = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section
      id="tour"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-black text-white relative overflow-hidden"
    >
      {/* Background Images with Transition */}
      <div className="absolute inset-0 z-0">
        {tourDates.map((date, index) => (
          <motion.div
            key={`bg-${date.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.1,
            }}
            transition={{
              opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <Image
              src={date.backgroundImage}
              alt={`${date.venue} - ${date.location}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] font-grotesk inline-block"
              animate={{
                color: ['#9ca3af', '#960018', '#6b46c1', '#2563eb', '#9ca3af'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Upcoming
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
                backgroundImage: 'linear-gradient(90deg, #fff 0%, #960018 33%, #6b46c1 66%, #fff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tour
            </motion.h1>
          </div>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Slides */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            {tourDates.map((date, index) => (
              <motion.div
                key={date.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 50,
                  scale: index === currentIndex ? 1 : 0.95,
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                  x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                  scale: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                }}
                className={`absolute inset-0 flex items-center ${
                  index === currentIndex ? 'z-10' : 'z-0 pointer-events-none'
                }`}
              >
                <div className="max-w-4xl mx-auto w-full h-full flex flex-col justify-center px-6 md:px-12">
                  <div className="space-y-6 md:space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : 30,
                      }}
                      transition={{ 
                        opacity: { duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] },
                        y: { duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] },
                      }}
                      className="text-sm md:text-base text-white/80 uppercase tracking-wider font-grotesk"
                    >
                      {date.date} | {date.time}
                    </motion.div>
                    
                    <motion.h3
                      className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tight text-white"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : 30,
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] },
                        y: { duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] },
                      }}
                    >
                      {date.venue}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : 30,
                      }}
                      transition={{ 
                        opacity: { duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] },
                        y: { duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] },
                      }}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-base md:text-lg lg:text-xl font-grotesk">
                        {date.location}
                      </span>
                    </motion.div>
                    
                    {date.ticketUrl && (
                      <motion.a
                        href={date.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white hover:bg-white hover:text-black uppercase tracking-wider font-grotesk text-sm md:text-base mt-4 transition-colors duration-200 ease-out active:scale-95 hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: index === currentIndex ? 1 : 0,
                          y: index === currentIndex ? 0 : 30,
                        }}
                        transition={{ 
                          opacity: { duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] },
                          y: { duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] },
                        }}
                      >
                        <span>Get Tickets</span>
                        <span>→</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between items-center pointer-events-none z-20 md:left-6 md:right-6">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-4 md:p-5 bg-white/10 hover:bg-white/25 active:bg-white/30 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto border border-white/20 rounded-full transition-all duration-150 ease-out active:scale-95 hover:scale-105"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === tourDates.length - 1}
              className="p-4 md:p-5 bg-white/10 hover:bg-white/25 active:bg-white/30 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto border border-white/20 rounded-full transition-all duration-150 ease-out active:scale-95 hover:scale-105"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-4 mt-8">
            {tourDates.map((date, index) => (
              <button
                key={date.id}
                onClick={() => goToSlide(index)}
                className={`relative px-4 py-2 uppercase tracking-wider font-grotesk text-sm transition-all duration-150 ease-out hover:scale-110 active:scale-95 ${
                  index === currentIndex
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {getMonthAbbr(date.date)}
                {index === currentIndex && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#960018]"
                    layoutId="activePagination"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

