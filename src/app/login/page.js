'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === "admin" && password === "admin") {
      router.push("/admin");
    } else if (id === "school" && password === "school") {
      router.push("/school");
    } else {
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:max-w-md p-8 bg-white rounded-2xl shadow-xl border border-[#E2E8F0]"
        >
          <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-8 tracking-tight">
            Log in Form
          </h2>

          <div className="mb-5">
            <label htmlFor="id" className="block text-sm font-medium text-[#64748B] mb-2">
              ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] text-[#0F172A] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition"
              placeholder="Enter your ID"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-[#64748B] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E2E8F0] text-[#0F172A] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-[#0284C7] transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-white bg-[#0EA5E9] hover:bg-[#0284C7] font-semibold rounded-lg shadow-md transition-all"
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
