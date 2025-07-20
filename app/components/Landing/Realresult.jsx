"use client";
import { useEffect } from 'react';

export default function RealResults() {
  useEffect(() => {
    const wave = document.querySelector('.wave');
    wave.style.animation = 'wave 3s infinite ease-in-out';
  }, []);

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 animate-slide-up">Real results from clients</h2>
      <div className="relative">
        <div className="wave h-16 bg-gradient-to-r from-green-400 to-green-600 absolute bottom-0 w-full"></div>
      </div>
    </section>
  );
}