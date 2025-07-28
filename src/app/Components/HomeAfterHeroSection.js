'use client';

export default function HomeAfterHeroSection() {
  const sections = [
    {
      title: 'Expert & Community-Led Learning',
      description:
        'Engage with OpenAI experts and external innovators to explore real-world AI applications and the latest industry trends.',
    },
    {
      title: 'Connections & Collaboration',
      description:
        'Build meaningful relationships with peers, innovators, and industry leaders through discussions, shared learning, and community-driven projects.',
    },
    {
      title: 'Stay Ahead with AI',
      description:
        'Learn about new products and the latest cutting-edge solutions directly from OpenAI experts—keeping you informed and ready to innovate.',
    },
  ];

  return (
    <section className="bg-[#F1F5F9] py-12 px-4">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {sections.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 border border-[#E2E8F0] hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg md:text-xl font-semibold text-[#0F172A] mb-3">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
