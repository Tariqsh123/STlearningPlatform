'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  {
    question: 'What is the purpose of this platform?',
    answer:
      'Our platform connects students, schools, and educators with cutting-edge AI learning tools, courses, and communities.',
  },
  {
    question: 'Who can join the platform?',
    answer:
      'Students, school principals, educators, and tech enthusiasts interested in learning and implementing AI can join.',
  },
  {
    question: 'Are the courses free or paid?',
    answer:
      'We offer a mix of free and premium courses depending on the depth and resources provided.',
  },
  {
    question: 'How can schools get involved?',
    answer:
      'School principals can sign up, get a custom dashboard, and onboard students to participate in the AI learning journey.',
  },
  {
    question: 'Is technical knowledge required?',
    answer:
      'No prior experience is required for most courses. We start from AI fundamentals and gradually move to advanced topics.',
  },
];

export default function HomeFAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F1F5F9] py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E2E8F0] bg-white rounded-xl shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left px-6 py-4 flex justify-between items-center font-medium text-lg focus:outline-none transition-colors duration-200 ${
                  activeIndex === index
                    ? 'text-[#0284C7]'
                    : 'text-[#0F172A] hover:text-[#0284C7]'
                }`}
              >
                {faq.question}
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-[#64748B] text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
