import React from 'react';

function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-50 text-white" style={{ 
        backgroundImage: 'url(/images/pexels-pixabay-219550.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}>
        <h1 className="text-5xl font-bold mb-4">Welcome to Glamspot</h1>
        <p className="text-lg mb-6">Your one-stop destination for all your beauty needs.</p>
        <a href="/bookings" className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition">
          Book Now
        </a>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-600 rounded-lg shadow-lg">
              <p className="italic text-gray-300">"The best salon experience ever! Highly recommend."</p>
              <p className="mt-4 font-semibold text-white">- Jane Doe</p>
            </div>
            <div className="p-6 bg-gray-600 rounded-lg shadow-lg">
              <p className="italic text-gray-300">"Amazing services and friendly staff!"</p>
              <p className="mt-4 font-semibold text-white">- John Smith</p>
            </div>
            <div className="p-6 bg-gray-600 rounded-lg shadow-lg">
              <p className="italic text-gray-300">"I love my new hairstyle! Thank you!"</p>
              <p className="mt-4 font-semibold text-white">- Alice Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Look?</h2>
        <p className="mb-6 text-gray-300">Book your appointment today and experience the Glamspot difference!</p>
        <a href="/bookings" className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition">
          Get Started
        </a>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Glamspot. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
