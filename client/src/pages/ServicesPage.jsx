import React, { useState, useEffect } from "react";


function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="services-page-container py-16 bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Services Offered</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
        {services.map((service) => (
          <li key={service.id} className="p-6 bg-gray-600 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="font-semibold text-lg">{service.name}</h2>
            <p className="text-gray-300">${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
