import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-cover bg-center h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-purple-600 to-purple-400">
        <h1 className="text-5xl font-bold">Welcome to Glamspot</h1>
        <p className="mt-4 text-lg">Your one-stop salon for all your beauty needs!</p>
        <Link to="/bookings" className="mt-6 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600 transition">
          Book Now
        </Link>
      </section>

      {/* Services Overview */}
      <section className="services p-6 bg-gradient-to-b from-purple-100 to-purple-50">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="service-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">Haircut</h3>
            <p>Stylish cuts for any occasion.</p>
          </div>
          {/* Repeat for more services */}
        </div>
      </section>

      {/* Featured Stylists */}
      <section className="stylists p-6 bg-gradient-to-b from-purple-50 to-gray-100">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Featured Stylists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stylist-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">Jane Doe</h3>
            <p>Specialty: Hair Color</p>
          </div>
          {/* Repeat for more stylists */}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials p-6 bg-gradient-to-b from-gray-100 to-white">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="testimonial-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <p className="italic">"Amazing service! I love my new haircut."</p>
            <h4 className="font-semibold text-right">- John Smith</h4>
          </div>
          {/* Repeat for more testimonials */}
        </div>
      </section>

      {/* About Us */}
      <section className="about p-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">About Us</h2>
        <p className="text-center">
          Glamspot is dedicated to providing top-notch beauty services tailored to your needs.
        </p>
        <Link to="/about" className="mt-4 text-blue-500 hover:underline">Learn more</Link>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter p-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Stay Updated!</h2>
        <form className="flex justify-center">
          <input type="email" placeholder="Your email" className="border p-2 rounded-l" required />
          <button type="submit" className="bg-purple-600 text-white p-2 rounded-r">Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default LandingPage;
