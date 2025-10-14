"use client";


export default function ContactUsPage() {
  return (
    <>
      

      <main className="bg-green-50 min-h-screen py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Contact Us
            </h1>
            <p className="text-green-800 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions or need assistance? We’re here to help! Reach out to us using the form below.
            </p>
          </section>

          {/* Contact Form */}
          <section className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mb-16">
            <form className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-green-900 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full border border-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-green-900 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full border border-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-green-900 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message..."
                  className="w-full border border-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white font-medium px-6 py-3 rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Our Contact Info</h2>
            <p className="text-green-800 mb-2">Email: support@sikshakrojgar.com</p>
            <p className="text-green-800 mb-2">Phone: +977-980-XXXXXXX</p>
            <p className="text-green-800">Address: Kathmandu, Nepal</p>
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
