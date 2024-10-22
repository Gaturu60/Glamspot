import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-cover bg-center h-screen flex flex-col justify-center items-center text-white bg-gradient-to-b from-purple-600 to-purple-400">
        <h1 className="text-5xl font-bold">Welcome to Glamspot</h1>
        <p className="mt-4 text-lg">
          Your one-stop salon for all your beauty needs!
        </p>
        <Link
          to="/signup"
          className="mt-6 px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600 transition"
        >
          Create an Account and Book Now!
        </Link>
      </section>

      {/* Services Overview */}
      <section className="services p-6 bg-gradient-to-b from-purple-100 to-purple-50">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="service-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">
              A clean Haircut to keep you fresh-all-day!
            </h3>
            <p>Stylish cuts for any occasion.</p>
          </div>
          <div className="service-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">
              Having back troubles and muscle pain?
            </h3>
            <p>Let our experienced masseurs work on your body!</p>
          </div>
          <div className="service-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">
              A professional manicure and pedicure procedure by our artistic
              Nail techs.
            </h3>
            <p>Just be wary of the attention you'll get.</p>
          </div>

          {/* Repeat for more services */}
        </div>
      </section>

      {/* Featured Stylists */}
      <section className="stylists p-6 bg-gradient-to-b from-purple-50 to-gray-100">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Featured Stylists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stylist-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">Jane Doe</h3>
            <p>Specialty: Hot Stone Massage</p>
          </div>
          <div className="stylist-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">Maria Mariah</h3>
            <p>Specialty: Hair Color</p>
          </div>
          <div className="stylist-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="font-semibold text-xl">Moses Oduor</h3>
            <p>Specialty: Nail Design</p>
          </div>
          {/* Repeat for more stylists */}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials p-6 bg-gradient-to-b from-gray-100 to-white">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="testimonial-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <p className="italic">"Amazing service! I love my new haircut."</p>
            <h4 className="font-semibold text-right">- Clare Wangeci</h4>
          </div>
          <div className="testimonial-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <p className="italic">
              "They have the best Nail Techs in the Country!!!"
            </p>
            <h4 className="font-semibold text-right">- Gladys Chemutai</h4>
          </div>
          <div className="testimonial-card p-6 bg-white shadow-xl rounded-lg transition-transform hover:scale-105 hover:shadow-2xl">
            <p className="italic">
              "Even though I'm balding, I could always get a massage instead of
              a haircut!"
            </p>
            <h4 className="font-semibold text-right">- Brian Moses</h4>
          </div>
          {/* Repeat for more testimonials */}
        </div>
      </section>

      {/* About Us */}
      <section className="about p-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          About Us
        </h2>
        <p className="text-center">
          Glamspot is dedicated to providing top-notch beauty services tailored
          to your needs and always respectful of your time.
        </p>
        <Link to="/contacts" className="mt-4 text-blue-500 hover:underline">
          Contact us
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
