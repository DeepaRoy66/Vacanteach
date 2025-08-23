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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Explore Teaching Specializations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find teaching opportunities across all educational disciplines and grade levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700">{subject.name}</h3>
              <p className="text-sm text-gray-600">{subject.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
