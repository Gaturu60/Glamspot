import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import ContactsPage from "./pages/ContactsPage";
import BookingPage from "./pages/BookingPage";
import ServicesPage from "./pages/ServicesPage";
import StylistsPage from "./pages/StylistsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import ManageAccountPage from "./pages/ManageAccountPage";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/stylists" element={<StylistsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contacts" element={<ContactsPage />} />

            {/* Protected Route for Manage Account */}
            <Route
              path="/manage-account"
              element={
                <ProtectedRoute>
                  <ManageAccountPage />
                </ProtectedRoute>
              }
            />

            {/* Protect Bookings Page */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            {/* Protect Admin Page (only accessible to admins) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
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
