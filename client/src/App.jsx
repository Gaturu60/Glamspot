import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import StylistsPage from "./pages/StylistsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stylists" element={<StylistsPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
