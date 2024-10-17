import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import StylistsPage from "./pages/StylistsPage";
import LoginPage from "./pages/LoginPage";
import backgroundImage from './assets/background/pexels-david-geib-1265112-3268732.jpg';


function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image here
      }}
    >
      <Router>
        <Navbar />
        <div className="bg-white bg-opacity-90 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/stylists" element={<StylistsPage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
