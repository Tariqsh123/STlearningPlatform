'use client';

import Image from 'next/image';

const features = [
  {
    title: 'Events',
    desc: 'Join virtual and in-person gatherings in your community to learn, network, and collaborate with peers and experts.',
    image: 'https://img.icons8.com/?size=100&id=BGWrIxzCqnD3&format=png&color=0ea5e9',
  },
  {
    title: 'Knowledge Hub',
    desc: 'Explore quick videos, tutorials, and resources—from AI basics to more advanced content.',
    image: 'https://img.icons8.com/?size=100&id=53421&format=png&color=0ea5e9',
  },
  {
    title: 'Community Groups',
    desc: 'Connect with peers by interest or location for discussions, shared learning, and collaboration.',
    image: 'https://img.icons8.com/?size=100&id=J715ns61u5eV&format=png&color=0ea5e9',
  },
  {
    title: 'Connect',
    desc: 'Message fellow members to exchange ideas, build relationships, and grow your network.',
    image: 'https://img.icons8.com/?size=100&id=58562&format=png&color=0ea5e9',
  },
];

export default function HomeCommunitySection() {
  return (
    <section className="py-16 px-4 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <Image
              src={item.image}
              alt={item.title}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <h3 className="text-xl font-semibold text-[#0F172A]">{item.title}</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
