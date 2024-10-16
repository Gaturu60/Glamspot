import React, { useState, useEffect } from "react";

function ServicesPage() {
  const [services, setServices] = useState([]);

  // Fetch services from the backend when the component loads
  useEffect(() => {
    fetch("/api/services") // Replace with backend API endpoint
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="services-container">
      <h1>Services offered</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
