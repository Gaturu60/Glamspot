import React, { useState, useEffect } from "react";

function StylistsPage() {
  const [stylists, setStylists] = useState([]);

  // Fetch available stylists from the backend
  useEffect(() => {
    fetch("/api/stylists/available") // Replace with backend api endpoint
      .then((response) => response.json())
      .then((data) => setStylists(data))
      .catch((error) => console.error("Error fetching stylists:", error));
  }, []);

  return (
    <div className="stylists-container">
      <h1>These are our available stylists</h1>
      <ul>
        {stylists.map((stylist) => (
          <li key={stylist.id}>{stylist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StylistsPage;
