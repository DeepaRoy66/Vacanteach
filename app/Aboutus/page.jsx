"use client";


export default function AboutUsPage() {
  return (
    <>
     

      <main className="bg-green-50 min-h-screen py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              About SikshakRojgar
            </h1>
            <p className="text-green-800 text-lg md:text-xl max-w-2xl mx-auto">
              Empowering teachers and educators to find meaningful work and make a real impact.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">Our Mission</h2>
              <p className="text-green-800">
                To connect qualified teachers with schools and educational institutions across the region, helping them secure rewarding employment and grow professionally.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">Our Vision</h2>
              <p className="text-green-800">
                To build a thriving educational ecosystem where every school has access to quality teachers and every teacher has opportunities to excel.
              </p>
            </div>
          </section>

          {/* Our Team */}
          <section>
            <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Example Team Member */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src="https://i.ibb.co/2yFqYt2/team1.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-green-300"
                />
                <h3 className="text-xl font-semibold text-green-900">Deepa Roy</h3>
                <p className="text-green-700 text-sm">Founder & CEO</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src="https://i.ibb.co/2yFqYt2/team1.jpg"
                  alt="Team Member"
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-green-300"
                />
                <h3 className="text-xl font-semibold text-green-900">Amit Sharma</h3>
                <p className="text-green-700 text-sm">CTO</p>
              </div>

              {/* Add more team members as needed */}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-200 py-8 mt-16">
        <div className="container mx-auto text-center text-green-900">
          &copy; {new Date().getFullYear()} SikshakRojgar. All rights reserved.
        </div>
      </footer>
    </>
  );
}
