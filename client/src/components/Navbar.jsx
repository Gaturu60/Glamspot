import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="text-white font-bold hover:underline">
            Home
          </Link>
        </li>

        <li>
          <Link to="/services" className="text-white font-bold hover:underline">
            Services
          </Link>
        </li>
        <li>
          <Link to="/stylists" className="text-white font-bold hover:underline">
            Stylists
          </Link>
        </li>
        {isAuthenticated && userRole === "user" && (
          <li>
            <Link
              to="/bookings"
              className="text-white font-bold hover:underline"
            >
              Bookings
            </Link>
          </li>
        )}

        {isAuthenticated && userRole === "admin" && (
          <li>
            <Link to="/admin" className="text-white font-bold hover:underline">
              Admin
            </Link>
          </li>
        )}
        <li>
          <Link to="/signup" className="text-white font-bold hover:underline">
            Sign Up
          </Link>
        </li>
        {/* Show login or logout button based on authentication state */}
        {!isAuthenticated ? (
          <li>
            <Link to="/login" className="text-white font-bold">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button onClick={handleLogout} className="text-white font-bold">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
