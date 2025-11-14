'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Track {
  embedUrl: string;
  title: string;
  artist?: string;
  duration?: string;
}

interface MusicPlayerContextType {
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track | null) => void;
  isOpen: boolean;
  openPlayer: (track: Track) => void;
  closePlayer: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const openPlayer = (track: Track) => {
    setSelectedTrack(track);
  };

  const closePlayer = () => {
    setSelectedTrack(null);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        isOpen: selectedTrack !== null,
        openPlayer,
        closePlayer,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}

