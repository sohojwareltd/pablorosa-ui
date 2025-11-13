'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - replace with actual email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-32 px-6 md:px-12 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">
            Contact & Booking
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed mb-8">
            For collaborations, bookings, or inquiries about work.
          </p>
          
          <motion.a
            href="mailto:hello@pablorosa.com"
            className="inline-block text-xl md:text-2xl text-[#960018] hover:underline font-grotesk transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            hello@pablorosa.com
          </motion.a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm uppercase tracking-wider font-grotesk text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#960018] transition-colors duration-300 font-sans"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm uppercase tracking-wider font-grotesk text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#960018] transition-colors duration-300 font-sans"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm uppercase tracking-wider font-grotesk text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#960018] transition-colors duration-300 font-sans resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitted}
            className="w-full md:w-auto px-12 py-4 bg-[#960018] text-white uppercase tracking-wider font-grotesk text-sm hover:bg-[#7a0014] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

