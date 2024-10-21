import { Link } from "react-router-dom";

function Navbar() {
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
        {/* <li>
          <Link to="/bookings" className="text-white font-bold hover:underline">
            Bookings
          </Link>
        </li> */}
        <li>
          <Link to="/signup" className="text-white font-bold hover:underline">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white font-bold hover:underline">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
