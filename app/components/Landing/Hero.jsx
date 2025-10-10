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
      <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-50 animate-pulse hidden sm:block"></div>
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-lime-200 rounded-full blur-3xl opacity-40 animate-pulse hidden sm:block"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20 sm:pt-28">
        {/* Hero Heading */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connect Teachers with <span className="text-green-400">Schools</span>
        </motion.h1>

        {/* Hero Paragraph */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The premier platform where educational institutions post teaching positions and qualified educators find their perfect role.
        </motion.p>

        {/* Search Bar + Button */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by subject, location, or school type..."
              className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
            />
          </div>
          <Button 
            size="lg" 
            className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Find Teaching Jobs
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { value: "15,000+", label: "Active Teaching Positions", color: "text-green-400" },
            { value: "2,500+", label: "Partner Schools & Colleges", color: "text-lime-400" },
            { value: "98%", label: "Successful Placements", color: "text-green-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
            >
              <div className={`text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
