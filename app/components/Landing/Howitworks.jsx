export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 animate-slide-up">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {['Posting jobs is free', 'Get proposals and hire', 'Pay when work is done'].map((step, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}