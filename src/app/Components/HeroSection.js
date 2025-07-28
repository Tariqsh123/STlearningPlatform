'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative top-[-65px] w-full h-[400px] md:h-[650px] [@media(min-width:1800px)]:h-[850px] overflow-hidden font-sans z-10">
      {/* Background Image with cinematic zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 25, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/HomeHeaderBG.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 z-10" />

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-white text-3xl sm:text-5xl md:text-6xl [@media(min-width:1800px)]:text-7xl font-extrabold drop-shadow-xl"
        >
          Empowering Schools with AI
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-white text-lg sm:text-xl md:text-2xl [@media(min-width:1800px)]:text-3xl mt-3 font-medium drop-shadow"
        >
          Smarter Learning. Simpler Management.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="text-white text-sm sm:text-base md:text-lg [@media(min-width:1800px)]:text-xl max-w-2xl mt-4 drop-shadow-sm"
        >
          An intelligent platform connecting administrators, teachers, and students for a seamless learning experience.
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          href="#get-started"
          className="mt-6 inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg transition duration-300"
        >
          Get Started
        </motion.a>
      </motion.div>
    </section>
  );
}
