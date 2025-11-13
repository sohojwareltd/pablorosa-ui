'use client';

import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/Cursor';
import Hero from '@/components/sections/Hero';
import Music from '@/components/sections/Music';
import Gallery from '@/components/sections/Gallery';
import YouTubeSets from '@/components/sections/YouTubeSets';
import FieldJournal from '@/components/sections/FieldJournal';
import SocialHub from '@/components/sections/SocialHub';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Navigation />
      <main className="relative">
        <Hero />
        
        {/* Finished Work Section */}
        <div className="relative">
          <Music />
          <Gallery />
          <YouTubeSets />
        </div>

        {/* Process & Philosophy Section */}
        <div className="relative">
          {/* Visual divider between Finished Work and Process */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <FieldJournal />
        </div>

        {/* Connection Section */}
        <div className="relative">
          <SocialHub />
          <Contact />
        </div>
      </main>
      
      <footer className="py-12 px-6 md:px-12 text-center text-sm text-gray-500 uppercase tracking-wider font-grotesk">
        <p>© {new Date().getFullYear()} Pablo Rosa. All rights reserved.</p>
      </footer>
    </SmoothScroll>
  );
}
