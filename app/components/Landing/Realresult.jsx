"use client";
import { motion } from "framer-motion";

export default function RealResults() {
  const testimonials = [
    {
      quote:
        "This platform helped us find the perfect math teacher who transformed our students' performance. The collaboration tools made integration seamless.",
      author: "Principal Maria Rodriguez",
      school: "Lincoln Elementary School",
      result: "30% improvement in math scores",
    },
    {
      quote:
        "As a teacher, I found my dream school through this platform. The collaborative environment has allowed me to grow professionally.",
      author: "James Chen",
      position: "Science Teacher",
      result: "Perfect teaching-school match",
    },
    {
      quote:
        "The partnership we formed through this platform has led to innovative teaching methods and improved student engagement across all subjects.",
      author: "Dr. Emily Watson",
      school: "Riverside High School",
      result: "25% increase in student engagement",
    },
  ];

  const stats = [
    { value: "92%", label: "Schools report improved teaching quality" },
    { value: "87%", label: "Teachers feel more supported" },
    { value: "35%", label: "Increase in student performance" },
    { value: "95%", label: "Successful long-term partnerships" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Results from School-Teacher Partnerships
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform creates successful collaborations that benefit both institutions and educators.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 sm:p-8 border-l-4 border-green-600 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-green-600 text-sm mb-2">
                  {testimonial.school || testimonial.position}
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full inline-block">
                  {testimonial.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-green-50 rounded-2xl p-8 sm:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
            Impact of Educational Collaboration
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
