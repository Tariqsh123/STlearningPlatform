'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FaRobot,
  FaCode,
  FaChartBar,
  FaPalette,
  FaCloud,
  FaMobileAlt,
  FaDatabase,
} from 'react-icons/fa';

const allCourses = [
  {
    title: 'AI Fundamentals',
    category: 'AI',
    description:
      'Understand the core principles of AI, including ML, DL, and NLP for practical applications.',
    image: '/AI-Fundamentals.png',
    icon: <FaRobot className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'Web Development',
    category: 'Development',
    description:
      'Master HTML, CSS, JavaScript, and popular frameworks to build powerful, dynamic websites.',
    image: '/Web-Development.png',
    icon: <FaCode className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'Data Science',
    category: 'AI',
    description:
      'Work with data tools, visualization, and machine learning to gain insights and build models.',
    image: '/Data-Science.png',
    icon: <FaChartBar className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'UI/UX Design',
    category: 'Design',
    description:
      'Design user-first interfaces using Figma, wireframing, and interactive prototyping techniques.',
    image: '/UI-UX-Design.png',
    icon: <FaPalette className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'Cloud Computing',
    category: 'Cloud',
    description:
      'Learn cloud architecture, AWS/Azure services, and real-world deployment strategies.',
    image: '/Cloud-Computing.png',
    icon: <FaCloud className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'Mobile App Development',
    category: 'Development',
    description:
      'Build iOS and Android applications using React Native, Flutter, and other modern frameworks.',
    image: '/Mobile-App-Development.png',
    icon: <FaMobileAlt className="text-[#0EA5E9] text-3xl" />,
  },
  {
    title: 'Database Management',
    category: 'Development',
    description:
      'Master SQL, NoSQL, and data modeling to manage and scale modern databases efficiently.',
    image: '/Database-Management.png',
    icon: <FaDatabase className="text-[#0EA5E9] text-3xl" />,
  },
];

const categories = ['All', 'AI', 'Development', 'Design', 'Cloud'];

export default function HomeCourseSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses =
    activeCategory === 'All'
      ? allCourses
      : allCourses.filter((course) => course.category === activeCategory);

  return (
    <section className="bg-gradient-to-b from-[#F1F5F9] to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F172A] mb-10 tracking-tight">
          Explore Our Most Demanded Courses
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium border ${
                activeCategory === category
                  ? 'bg-[#0EA5E9] text-white border-transparent'
                  : 'bg-white text-[#0F172A] border-[#E2E8F0]'
              } hover:bg-[#0284C7] hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.015] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="w-full h-52 relative">
                   <Image
    src={course.image}
    alt={course.title}
    fill
    className="object-cover"
  />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">{course.icon}</div>
                <h3 className="text-2xl font-semibold text-[#0F172A] mb-2 tracking-wide">
                  {course.title}
                </h3>
                <p className="text-sm text-[#64748B] flex-grow leading-relaxed">
                  {course.description}
                </p>

                <button className="mt-6 self-start bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
