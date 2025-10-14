"use client";
import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong!");
    }
  };

  return (
    <main className="bg-green-50 min-h-screen py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 mb-3 sm:mb-4">
            Contact Us
          </h1>
          <p className="text-green-800 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto">
            Have questions or need assistance? We’re here to help! Reach out to us using the form below.
          </p>
        </section>

        {/* Contact Form */}
        <section className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg max-w-md sm:max-w-3xl mx-auto mb-12 sm:mb-16">
          <form className="grid grid-cols-1 gap-4 sm:gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-green-900 font-medium mb-1 sm:mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-green-300 rounded-md p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-green-900 font-medium mb-1 sm:mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-green-300 rounded-md p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-green-900 font-medium mb-1 sm:mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your message..."
                className="w-full border border-green-300 rounded-md p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-green-600 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center text-green-900 text-sm sm:text-base">{status}</p>}
        </section>

        {/* Contact Info */}
        <section className="text-center px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4 sm:mb-6">Our Contact Info</h2>
          <p className="text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">Email: deeparoy6622@gmail.com</p>
          <p className="text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">Phone: +977-9828555512</p>
          <p className="text-green-800 text-sm sm:text-base">Address: Sindhuli, Nepal</p>
        </section>
      </div>
    </main>
  );
}
