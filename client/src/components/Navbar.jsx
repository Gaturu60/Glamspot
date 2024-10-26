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
          <>
            <li>
              <Link
                to="/bookings"
                className="text-white font-bold hover:underline"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/manage-account"
                className="text-white font-bold hover:underline"
              >
                Manage Account
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && userRole === "admin" && (
          <li>
            <Link to="/admin" className="text-white font-bold hover:underline">
              Admin
            </Link>
          </li>
        )}
        {/* Show sign up link if not authenticated */}
        {!isAuthenticated && (
          <li>
            <Link to="/signup" className="text-white font-bold hover:underline">
              Sign Up
            </Link>
          </li>
        )}
        {/* Show login or logout button based on authentication state */}
        {!isAuthenticated ? (
          <li>
            <Link to="/login" className="text-white font-bold hover:underline">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="text-white font-bold hover:underline"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
