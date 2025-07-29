'use client';

import { motion } from 'framer-motion';

export default function HomeAbout() {
  return (
    <section className="bg-[#F1F5F9] py-0 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-transparent bg-clip-text">
              About Our
            </span>{' '}
            AI Learning Platform
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-6">
            Empowering students and educators through smart technology. Our AI platform is built to enhance real-time learning, deep skill-building, and future-ready innovation—designed for schools and individuals alike.
          </p>
          <button className="mt-4 px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold rounded-xl shadow transition-all duration-300">
            Learn More
          </button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="/HomeAbout.jpg"
            alt="About AI"
            className="w-full max-w-md mx-auto rounded-3xl shadow-2xl hover:scale-105 transition duration-500 ease-in-out"
          />
          {/* Decorative Glow */}
          <div className="absolute -inset-2 blur-3xl bg-gradient-to-r from-sky-300 to-blue-400 opacity-30 rounded-3xl z-[-1]" />
        </motion.div>

      </div>
    </section>
  );
}
