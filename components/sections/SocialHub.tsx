'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaInstagram, 
  FaSpotify, 
  FaSoundcloud, 
  FaYoutube, 
  FaBandcamp,
  FaTwitter 
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

// Placeholder social links - replace with actual URLs
const socialLinks: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com', icon: FaInstagram },
  { name: 'Spotify', url: 'https://spotify.com', icon: FaSpotify },
  { name: 'SoundCloud', url: 'https://soundcloud.com', icon: FaSoundcloud },
  { name: 'YouTube', url: 'https://youtube.com', icon: FaYoutube },
  { name: 'Bandcamp', url: 'https://bandcamp.com', icon: FaBandcamp },
  { name: 'Twitter', url: 'https://twitter.com', icon: FaTwitter },
];

export default function SocialHub() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="connect"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Follow the journey across platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 max-w-5xl mx-auto"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center space-y-4 p-6 hover:bg-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                {(() => {
                  const IconComponent = link.icon;
                  return (
                    <IconComponent className="text-4xl md:text-5xl text-gray-700 group-hover:text-[#960018] transition-colors duration-300" />
                  );
                })()}
              </div>
              <span className="text-sm md:text-base uppercase tracking-wider font-grotesk text-gray-700 group-hover:text-[#960018] transition-colors duration-300">
                {link.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Mailing List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 uppercase tracking-tight">
            Newsletter
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            Receive updates on new releases, performances, and creative insights.
          </p>
          
          <form
            action="https://mailchimp.com/api/subscribe" // Replace with actual Mailchimp endpoint
            method="post"
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-[#960018] transition-colors duration-300 font-grotesk text-sm uppercase tracking-wider"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#960018] text-white uppercase tracking-wider font-grotesk text-sm hover:bg-[#7a0014] transition-colors duration-300"
            >
              Subscribe
            </motion.button>
          </form>
          
          <p className="mt-4 text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

