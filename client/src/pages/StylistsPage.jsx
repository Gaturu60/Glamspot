import React, { useState, useEffect } from "react";

function StylistsPage() {
  // Initialize stylists state as an empty array
  const [stylists, setStylists] = useState([]);

  // Fetch stylists data from the API when the component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:5000/stylists")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the case where 'stylists' may not exist in the response
        setStylists(data.stylists || []);
      })
      .catch((error) => {
        console.error("Error fetching stylists:", error);
        setStylists([]); // Optional: Set an empty array in case of error
      });
  }, []);

  // If stylists is not an array, ensure rendering doesn't break by checking its type
  if (!Array.isArray(stylists)) {
    return <div>No stylists available</div>; // Render a fallback if 'stylists' is not an array
  }

  return (
    <div className="container p-6 bg-gradient-to-b from-purple-50 to-white">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Available Stylists
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stylists.map((stylist) => (
          <li
            key={stylist.id}
            className="list-item p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
          >
            <h2 className="font-semibold text-lg">{stylist.name}</h2>
            <p className="text-gray-600">{stylist.specialty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StylistsPage;
