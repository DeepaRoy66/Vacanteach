"use client"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Schools Post Jobs",
      description: "Educational institutions post teaching positions with detailed requirements and benefits.",
    },
    {
      number: 2,
      title: "Teachers Apply",
      description: "Qualified educators browse and apply for positions that match their expertise and preferences.",
    },
    {
      number: 3,
      title: "Perfect Match",
      description: "Our platform facilitates connections between schools and teachers for successful placements.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to connect educational institutions with qualified teaching professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-lime-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
