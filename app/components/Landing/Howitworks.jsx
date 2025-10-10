"use client";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Schools Post Jobs",
      description:
        "Educational institutions post teaching positions with detailed requirements and benefits.",
    },
    {
      number: 2,
      title: "Teachers Apply",
      description:
        "Qualified educators browse and apply for positions that match their expertise and preferences.",
    },
    {
      number: 3,
      title: "Perfect Match",
      description:
        "Our platform facilitates connections between schools and teachers for successful placements.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-green-50 to-lime-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to connect educational institutions with qualified teaching professionals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Number Circle */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-700 to-lime-600 text-white rounded-full mb-6 flex items-center justify-center text-2xl font-bold shadow-md">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
