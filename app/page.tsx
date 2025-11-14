'use client';

import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/Cursor';
import Hero from '@/components/sections/Hero';
import AlbumHero from '@/components/sections/AlbumHero';
import Music from '@/components/sections/Music';
import Gallery from '@/components/sections/Gallery';
import YouTubeSets from '@/components/sections/YouTubeSets';
import TourSlider from '@/components/sections/TourSlider';
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
        
        {/* Latest Album Section - Musico Style */}
        <div className="relative">
          <AlbumHero />
        </div>
        
        {/* Finished Work Section */}
        <div className="relative">
          <Music />
          <Gallery />
          <YouTubeSets />
        </div>
        
        {/* Tour Section - Musico Style Slider */}
        <div className="relative">
          <TourSlider />
        </div>

        {/* Process & Philosophy Section */}
        <div className="relative">
          {/* Animated visual divider between Finished Work and Process */}
          <motion.div
            className="h-px relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(to right, transparent, #960018, transparent)',
                  'linear-gradient(to right, transparent, #6b46c1, transparent)',
                  'linear-gradient(to right, transparent, #2563eb, transparent)',
                  'linear-gradient(to right, transparent, #ea580c, transparent)',
                  'linear-gradient(to right, transparent, #960018, transparent)',
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
          </motion.div>
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
