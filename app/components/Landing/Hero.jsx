"use client";
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    const inputs = document.querySelectorAll('.hero-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => input.classList.add('border-green-500'));
      input.addEventListener('blur', () => input.classList.remove('border-green-500'));
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-50"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
          Connecting clients to freelancers who deliver
        </h1>
        <div className="flex justify-center">
          <input type="text" placeholder="Search jobs, skills, or keywords" className="hero-input p-3 rounded-l-lg w-3/4 md:w-1/2 border-2 border-gray-300 focus:outline-none" />
          <button className="bg-green-600 text-white p-3 rounded-r-lg hover:bg-green-700 transition duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}