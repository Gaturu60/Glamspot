import React, { useState, useEffect } from "react";

function StylistsPage() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetch("/api/stylists/available")
      .then((response) => response.json())
      .then((data) => setStylists(data))
      .catch((error) => console.error("Error fetching stylists:", error));
  }, []);

  return (
    <div className="py-16 bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Available Stylists</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
        {stylists.map((stylist) => (
          <li key={stylist.id} className="p-6 bg-gray-600 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="font-semibold text-lg">{stylist.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StylistsPage;
