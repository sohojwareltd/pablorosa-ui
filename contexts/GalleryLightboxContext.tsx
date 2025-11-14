'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Artwork {
  id: number;
  title: string;
  image: string;
  year?: string;
}

interface GalleryLightboxContextType {
  artworks: Artwork[];
  currentIndex: number | null;
  isOpen: boolean;
  openLightbox: (artworks: Artwork[], index: number) => void;
  closeLightbox: () => void;
  nextImage: () => void;
  previousImage: () => void;
  goToImage: (index: number) => void;
}

const GalleryLightboxContext = createContext<GalleryLightboxContextType | undefined>(undefined);

export function GalleryLightboxProvider({ children }: { children: ReactNode }) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openLightbox = (artworkList: Artwork[], index: number) => {
    setArtworks(artworkList);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
    setArtworks([]);
  };

  const nextImage = () => {
    if (currentIndex !== null && currentIndex < artworks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === artworks.length - 1) {
      setCurrentIndex(0); // Loop to first
    }
  };

  const previousImage = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(artworks.length - 1); // Loop to last
    }
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < artworks.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <GalleryLightboxContext.Provider
      value={{
        artworks,
        currentIndex,
        isOpen: currentIndex !== null,
        openLightbox,
        closeLightbox,
        nextImage,
        previousImage,
        goToImage,
      }}
    >
      {children}
    </GalleryLightboxContext.Provider>
  );
}

export function useGalleryLightbox() {
  const context = useContext(GalleryLightboxContext);
  if (context === undefined) {
    throw new Error('useGalleryLightbox must be used within a GalleryLightboxProvider');
  }
  return context;
}

