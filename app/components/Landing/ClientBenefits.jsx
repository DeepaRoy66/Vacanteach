"use client"
import { Card, CardContent } from "../ui/card"

export default function ClientBenefits() {
  const benefits = [
    {
      icon: "🎓",
      title: "Quality Education Partnerships",
      description: "Connect with certified educators who share your institution's vision for academic excellence.",
    },
    {
      icon: "🤝",
      title: "Collaborative Teaching Approach",
      description: "Foster teamwork between schools and teachers to create innovative learning environments.",
    },
    {
      icon: "📈",
      title: "Improved Student Outcomes",
      description: "Access data-driven insights showing how teacher-school partnerships enhance student performance.",
    },
    {
      icon: "🌟",
      title: "Professional Development",
      description: "Support continuous growth through collaborative professional development programs.",
    },
    {
      icon: "💡",
      title: "Innovation in Education",
      description: "Encourage creative teaching methods through school-teacher collaboration initiatives.",
    },
    {
      icon: "🏆",
      title: "Recognition Programs",
      description: "Celebrate successful partnerships with awards and recognition for outstanding collaboration.",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Why Schools & Teachers Choose Our Platform
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Building bridges between educational institutions and passionate educators for transformative learning
            experiences.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
            >
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collaboration Highlight */}
        <div className="mt-16 sm:mt-20 bg-green-600 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Success Through Collaboration</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Quote Section */}
            <div>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                "Our partnership platform has revolutionized how schools and teachers connect. We’ve seen a 40%
                improvement in teaching quality and student engagement."
              </p>
              <div className="font-semibold text-white">Dr. Sarah Johnson</div>
              <div className="text-green-200 text-sm sm:text-base">
                Director of Education, Metro School District
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
              <div className="text-3xl sm:text-4xl font-bold mb-2">40%</div>
              <div className="text-green-200 mb-4 text-sm sm:text-base">
                Improvement in Teaching Quality
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">85%</div>
              <div className="text-green-200 text-sm sm:text-base">
                Teacher Retention Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
