'use client';

import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const supportContent = {
  'Privacy Policy': `Effective Date: January 1, 2025

At AI Learning, your privacy is our priority. We only collect information necessary for account creation, personalized learning, and platform improvement. This may include your name, email address, selected school, and progress history.

We do NOT share or sell any personal data to third-party advertisers. All data is stored securely, and we implement industry-standard encryption to protect your information.

You can contact us anytime to access, modify, or delete your data. By using this platform, you consent to this policy.

For questions, reach out to: privacy@ailearning.com`,

  'Terms of Service': `Last Updated: January 1, 2025

Welcome to AI Learning. By accessing or using our platform, you agree to the following terms:

1. You must provide accurate account information.
2. You are responsible for maintaining the confidentiality of your account.
3. You may not misuse the platform or attempt to gain unauthorized access.
4. All course content is protected intellectual property of AI Learning.
5. We may modify these terms at any time with reasonable notice.

Violation of these terms may lead to suspension or termination of your account.

If you have questions about these terms, email us at: legal@ailearning.com`
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <footer className="bg-[#1E293B] text-white py-12 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">AI Learning</h2>
          <p className="text-sm text-gray-300 mb-4">
            Empowering students and schools with future-ready AI education.
          </p>
          <div className="flex space-x-4 text-xl text-gray-300 mt-2">
            <a href="#" className="hover:text-[#0EA5E9]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#0EA5E9]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#0EA5E9]"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-[#0EA5E9]"><FaInstagram /></a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActiveModal(item)}
                  className="hover:text-[#0EA5E9] transition duration-200"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
          <p className="text-sm text-gray-300">
            Email: email@gmail.com<br />
            Phone: +12 1212121212<br />
            Location: Random Street Random City Random Country
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-600 pt-6">
        &copy; {new Date().getFullYear()} AI Learning Platform. All rights reserved.
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]"
        >
          <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-xl animate-fade-in relative">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4">{activeModal}</h2>
            <div className="text-sm text-[#475569] whitespace-pre-line overflow-y-auto max-h-[70vh] pr-2">
              {supportContent[activeModal]}
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
