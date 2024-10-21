import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Don't forget to import Navigate
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import StylistsPage from "./pages/StylistsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage"; // Import LandingPage
import backgroundImage from "./assets/background/pexels-david-geib-1265112-3268732.jpg";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="bg-white bg-opacity-90 min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/stylists" element={<StylistsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Protect Bookings Page */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
