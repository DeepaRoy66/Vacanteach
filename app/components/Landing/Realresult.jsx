"use client"

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
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results from School-Teacher Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our platform creates successful collaborations that benefit both institutions and educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 border-l-4 border-green-600">
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-green-600 text-sm mb-2">{testimonial.school || testimonial.position}</div>
                <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full inline-block">
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Impact of Educational Collaboration</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-gray-700">Schools report improved teaching quality</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
              <div className="text-gray-700">Teachers feel more supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">35%</div>
              <div className="text-gray-700">Increase in student performance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-700">Successful long-term partnerships</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
