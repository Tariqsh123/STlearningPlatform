'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1E293B]/50 text-white shadow-md border-b border-white/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-white">
          AI Learning
        </Link>

        {/* Login Button */}
        <div>
          <Link
            href="/login"
            className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] rounded-full shadow-md hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 rounded-full bg-[#0EA5E9] opacity-20 blur-md"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
