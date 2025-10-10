"use client"

export default function ExplorePros() {
  const subjects = [
    { name: "Mathematics & Sciences", count: "3,200+ positions", icon: "🔬" },
    { name: "Languages & Literature", count: "2,800+ positions", icon: "📚" },
    { name: "Arts & Creative Studies", count: "1,900+ positions", icon: "🎨" },
    { name: "Physical Education", count: "1,500+ positions", icon: "⚽" },
    { name: "Special Education", count: "2,100+ positions", icon: "🤝" },
    { name: "Technology & Computing", count: "1,800+ positions", icon: "💻" },
    { name: "Social Studies", count: "2,400+ positions", icon: "🌍" },
    { name: "Early Childhood", count: "2,600+ positions", icon: "🧸" },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Explore Teaching Specializations
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Find teaching opportunities across all educational disciplines and grade levels
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {subject.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 group-hover:text-green-700">
                {subject.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{subject.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
