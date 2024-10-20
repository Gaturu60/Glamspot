import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary p-4 shadow-md">
      <ul className="flex justify-around text-white">
        <li>
          <Link to="/" className="font-bold hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/services" className="font-bold hover:underline">Services</Link>
        </li>
        <li>
          <Link to="/stylists" className="font-bold hover:underline">Stylists</Link>
        </li>
        <li>
          <Link to="/bookings" className="font-bold hover:underline">Bookings</Link>
        </li>
        <li>
          <Link to="/login" className="font-bold hover:underline">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
