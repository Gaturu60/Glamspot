import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link> {/*Link to Home Page*/}
        </li>
        <li>
          <Link to="/services">Services</Link> {/*Link to Services Page*/}
        </li>
        <li>
          <Link to="/stylists">Stylists</Link> {/*Link to Stylists Page*/}
        </li>
        <li>
          <Link to="/bookings">Bookings</Link> {/*Link to Bookings Page*/}
        </li>
        <li>
          <Link to="/login">Login</Link> {/*Link to Login Page*/}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
