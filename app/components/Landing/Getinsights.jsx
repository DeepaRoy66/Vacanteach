export default function GetInsights() {
  return (
    <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 animate-fade-in">Get insights into freelancer pricing</h2>
        <p className="text-lg mb-8">We'll calculate your job's average cost with skills you need.</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 animate-bounce">
          Describe your job
        </button>
      </div>
    </section>
  );
}