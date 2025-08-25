"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (status !== "authenticated") {
    router.push("/");
    return null;
  }

  const user = session.user;

  const opportunities = [
    {
      id: 1,
      title: "Full Stack Developer Needed for CRM Dashboard",
      description: "Build a CRM Dashboard using React, Node.js, and MongoDB...",
      tags: ["React", "Node.js", "MongoDB", "Full Stack"],
      budget: "$500 - $1000",
      duration: "1-2 weeks",
    },
    {
      id: 2,
      title: "MERN Engineer to Build Real-Time Streaming Platform",
      description: "Develop a real-time streaming and betting platform...",
      tags: ["MERN", "Real-Time", "Streaming", "Engineer"],
      budget: "$1000 - $2000",
      duration: "2-4 weeks",
    },
    {
      id: 3,
      title: "Frontend Developer Needed for E-Commerce Site",
      description: "Create an e-commerce website using Next.js and Tailwind CSS...",
      tags: ["Next.js", "Tailwind", "Frontend", "E-Commerce"],
      budget: "$300 - $600",
      duration: "1-3 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name || "User"}!</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-xl font-semibold text-gray-900">{opp.title}</h2>
              <p className="mt-2 text-gray-600">{opp.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {opp.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-gray-700">
                <p>Budget: {opp.budget}</p>
                <p>Duration: {opp.duration}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                <button className="text-gray-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

       
          </div>
        </div>
      
  );
}
