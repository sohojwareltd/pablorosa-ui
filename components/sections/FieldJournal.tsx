'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface JournalEntry {
  id: number;
  type: 'text' | 'quote' | 'sketch' | 'philosophy' | 'behind-the-scenes' | 'idea';
  content: string;
  date?: string;
  author?: string;
  category?: 'process' | 'reflection' | 'work-in-progress';
}

// Journal entries - process, philosophies, ideas, sketches, behind-the-scenes
const journalEntries: JournalEntry[] = [
  {
    id: 1,
    type: 'philosophy',
    content: 'The space between notes holds as much meaning as the notes themselves. In that silence, we find our rhythm.',
    date: '2024',
    category: 'reflection',
  },
  {
    id: 2,
    type: 'quote',
    content: 'Music is the silence between the notes.',
    author: 'Claude Debussy',
    date: '2024',
    category: 'reflection',
  },
  {
    id: 3,
    type: 'behind-the-scenes',
    content: 'Every field recording is a snapshot of time. A moment captured, then transformed. The raw becomes refined, the accidental becomes intentional.',
    date: '2023',
    category: 'process',
  },
  {
    id: 4,
    type: 'sketch',
    content: '[Visual sketch placeholder]',
    date: '2024',
    category: 'work-in-progress',
  },
  {
    id: 5,
    type: 'philosophy',
    content: 'Design is not about decoration. It\'s about creating spaces where ideas can breathe and emotions can flow.',
    date: '2023',
    category: 'reflection',
  },
  {
    id: 6,
    type: 'idea',
    content: 'Experimenting with layering ambient textures over minimal percussion. The tension between empty space and dense moments creates movement.',
    date: '2024',
    category: 'work-in-progress',
  },
  {
    id: 7,
    type: 'behind-the-scenes',
    content: 'Today\'s session: capturing the sound of rain on different surfaces. Each texture tells a different story.',
    date: '2024',
    category: 'process',
  },
  {
    id: 8,
    type: 'quote',
    content: 'The composition must be so constructed that it is able to convey the composer\'s musical ideas to the mind of the listener.',
    author: 'Arnold Schoenberg',
    date: '2024',
    category: 'reflection',
  },
];

export default function FieldJournal() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="journal"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#960018] font-grotesk">
              Process & Philosophy
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Field Journal
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Ideas, notes, philosophies, and behind-the-scenes moments from the creative process. A studio in motion.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {journalEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`break-inside-avoid mb-6 md:mb-8 p-6 md:p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-500 relative ${
                entry.type === 'quote' ? 'border-l-4 border-[#960018]' : ''
              } ${
                entry.category === 'work-in-progress' ? 'ring-1 ring-gray-300 ring-dashed' : ''
              } ${
                entry.type === 'behind-the-scenes' ? 'border-l-2 border-gray-300' : ''
              } ${
                entry.type === 'idea' ? 'bg-white border border-gray-200' : ''
              }`}
            >
              {/* Entry type label */}
              {(entry.type === 'sketch' || entry.type === 'behind-the-scenes' || entry.type === 'idea' || entry.type === 'philosophy') && (
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-grotesk">
                    {entry.type === 'sketch' && 'Sketch'}
                    {entry.type === 'behind-the-scenes' && 'Behind the Scenes'}
                    {entry.type === 'idea' && 'Idea'}
                    {entry.type === 'philosophy' && 'Philosophy'}
                  </span>
                </div>
              )}

              {entry.type === 'sketch' ? (
                <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
                  {entry.content}
                </div>
              ) : entry.type === 'quote' ? (
                <blockquote className="space-y-4">
                  <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-gray-800">
                    "{entry.content}"
                  </p>
                  {entry.author && (
                    <footer className="text-sm text-gray-600 uppercase tracking-wider font-grotesk">
                      — {entry.author}
                    </footer>
                  )}
                </blockquote>
              ) : entry.type === 'idea' ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#960018] text-xl">•</span>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 flex-1">
                      {entry.content}
                    </p>
                  </div>
                </div>
              ) : entry.type === 'behind-the-scenes' ? (
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 italic">
                    {entry.content}
                  </p>
                </div>
              ) : entry.type === 'philosophy' ? (
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
                    {entry.content}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    {entry.content}
                  </p>
                </div>
              )}
              
              {entry.date && (
                <p className="mt-4 text-xs text-gray-500 uppercase tracking-wider font-grotesk">
                  {entry.date}
                  {entry.category === 'work-in-progress' && (
                    <span className="ml-2 text-[#960018]">• Work in Progress</span>
                  )}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

