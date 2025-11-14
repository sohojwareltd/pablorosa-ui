'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { useGalleryLightbox } from '@/contexts/GalleryLightboxContext';

export default function GalleryLightbox() {
  const { artworks, currentIndex, isOpen, closeLightbox, nextImage, previousImage, goToImage } = useGalleryLightbox();
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentArtwork = currentIndex !== null ? artworks[currentIndex] : null;

  // Lock body scroll when lightbox is open
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

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, nextImage, previousImage]);

  // Reset image loaded state when image changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  if (!currentArtwork) return null;

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
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[200]"
          />

          {/* Lightbox Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8"
            onClick={(e) => {
              // Close if clicking on backdrop, not on image
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-30 text-white hover:text-gray-300 transition-colors duration-200 p-2"
              aria-label="Close lightbox"
            >
              <FaTimes className="text-2xl md:text-3xl" />
            </button>

            {/* Navigation Buttons */}
            {artworks.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previousImage();
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors duration-200 p-3 bg-black/50 hover:bg-black/70 rounded-full"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-xl md:text-2xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors duration-200 p-3 bg-black/50 hover:bg-black/70 rounded-full"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-xl md:text-2xl" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center">
              {/* Image */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
              >
                <Image
                  src={currentArtwork.image}
                  alt={currentArtwork.title}
                  fill
                  className="object-contain"
                  quality={95}
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>

              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center text-white"
              >
                <h3 className="text-xl md:text-2xl font-serif mb-2">
                  {currentArtwork.title}
                </h3>
                {currentArtwork.year && (
                  <p className="text-sm md:text-base text-white/70 uppercase tracking-wider font-grotesk">
                    {currentArtwork.year}
                  </p>
                )}
                {artworks.length > 1 && (
                  <p className="text-sm text-white/50 mt-2 font-grotesk">
                    {currentIndex !== null ? currentIndex + 1 : 0} / {artworks.length}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Thumbnail Strip (Desktop) */}
            {artworks.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-2 max-w-4xl overflow-x-auto px-4"
              >
                {artworks.map((artwork, index) => (
                  <button
                    key={artwork.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToImage(index);
                    }}
                    className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? 'border-white scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

