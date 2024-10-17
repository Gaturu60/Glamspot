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
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">These Stylists are Available</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stylists.map((stylist) => (
          <li key={stylist.id} className="list-item p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105">
            <h2 className="font-semibold text-lg">{stylist.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StylistsPage;
