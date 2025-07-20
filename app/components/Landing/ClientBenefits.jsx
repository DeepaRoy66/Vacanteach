export default function ClientBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 animate-slide-up">Clients only pay after hiring</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {['0% before hiring', '5% after hiring', 'Contact sales'].map((benefit, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit}</h3>
              <p className="text-gray-600">{getDescription(index)}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300">
          Compare all plans
        </button>
      </div>
    </section>
  );
}

function getDescription(index) {
  const descriptions = [
    'Post jobs for free and browse talent.',
    'Features and support for premium plans.',
    'Explore enterprise solutions.',
  ];
  return descriptions[index % descriptions.length];
}