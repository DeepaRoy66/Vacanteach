export default function ExplorePros() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 animate-slide-up">Explore millions of pros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Development & IT', 'Design & Creative', 'Sales & Marketing', 'Writing & Translation', 'Admin & Customer Service', 'Legal', 'HR & Training', 'Architecture & Engineering'].map((category, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-3xl mb-2">{getIcon(index)}</span>
              <p className="text-gray-700 font-medium">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getIcon(index) {
  const icons = ['👨‍💻', '🎨', '💼', '✍️', '📊', '⚖️', '🏢', '🏛️'];
  return icons[index % icons.length];
}