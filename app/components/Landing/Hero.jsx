"use client"
import { Button } from "../ui/button"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co/rfsT1CVS/photo-1585298799938-a15d7abb8523.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div> {/* Semi-transparent overlay */}
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-lime-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connect Teachers with <span className="text-green-400">Schools</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The premier platform where educational institutions post teaching positions and qualified educators find their perfect role.
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by subject, location, or school type..."
              className="w-full p-4 text-lg rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Find Teaching Jobs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: "15,000+", label: "Active Teaching Positions", color: "text-green-400" },
            { value: "2,500+", label: "Partner Schools & Colleges", color: "text-lime-400" },
            { value: "98%", label: "Successful Placements", color: "text-green-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}