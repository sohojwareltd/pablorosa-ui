'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface JournalEntry {
  id: number;
  type: 'text' | 'quote' | 'sketch';
  content: string;
  date?: string;
  author?: string;
}

// Placeholder journal data - replace with actual content
const journalEntries: JournalEntry[] = [
  {
    id: 1,
    type: 'text',
    content: 'The space between notes holds as much meaning as the notes themselves. In that silence, we find our rhythm.',
    date: '2024',
  },
  {
    id: 2,
    type: 'quote',
    content: 'Music is the silence between the notes.',
    author: 'Claude Debussy',
    date: '2024',
  },
  {
    id: 3,
    type: 'text',
    content: 'Every field recording is a snapshot of time. A moment captured, then transformed. The raw becomes refined, the accidental becomes intentional.',
    date: '2023',
  },
  {
    id: 4,
    type: 'sketch',
    content: '[Visual sketch placeholder]',
    date: '2024',
  },
  {
    id: 5,
    type: 'text',
    content: 'Design is not about decoration. It\'s about creating spaces where ideas can breathe and emotions can flow.',
    date: '2023',
  },
  {
    id: 6,
    type: 'quote',
    content: 'The composition must be so constructed that it is able to convey the composer\'s musical ideas to the mind of the listener.',
    author: 'Arnold Schoenberg',
    date: '2024',
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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Field Journal
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
            Ideas, notes, and reflections from the creative process.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {journalEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`break-inside-avoid mb-6 md:mb-8 p-6 md:p-8 bg-gray-50 hover:bg-gray-100 transition-colors duration-500 ${
                entry.type === 'quote' ? 'border-l-4 border-[#960018]' : ''
              }`}
            >
              {entry.type === 'sketch' ? (
                <div className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
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
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

