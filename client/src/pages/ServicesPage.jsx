import React, { useState, useEffect } from "react";

function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data.services || []);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Services Offered
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="list-item p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
          >
            <h2 className="font-semibold text-lg">{service.name}</h2>
            <p className="text-gray-600">Ksh.{service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
