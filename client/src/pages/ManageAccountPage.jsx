import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ManageAccountPage() {
  const [activeSection, setActiveSection] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchUserDetails();
    fetchBookings();
  }, []);

  const fetchUserDetails = () => {
    fetch("https://glamspot.onrender.com/protected", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchBookings = () => {
    fetch("https://glamspot.onrender.com/user/bookings", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setBookings(data.bookings))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  // Delete booking function
  const handleDeleteBooking = (bookingId) => {
    fetch(`https://glamspot.onrender.com/user/bookings/${bookingId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          fetchBookings(); // Refresh bookings after deletion
          alert("Booking deleted successfully!");
        } else {
          alert("Failed to delete booking.");
        }
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  // Update account details
  const updateAccount = (field, value) => {
    fetch("https://glamspot.onrender.com/user/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchUserDetails();
      })
      .catch((error) => {
        console.error("Error updating account:", error);
      });
  };

  // Delete account function with confirmation
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch("https://glamspot.onrender.com/user/account", {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Account deleted. Logging out and redirecting...");
            alert("Account deleted successfully!");
            logout();
            navigate("/login");
          } else {
            alert("Failed to delete account.");
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-purple-600 p-6">
        <ul className="space-y-6 text-white font-bold">
          <li>
            <button
              onClick={() => setActiveSection("bookings")}
              className={`w-full text-left p-2 rounded-lg transition ${
                activeSection === "bookings"
                  ? "bg-purple-800"
                  : "hover:bg-purple-700"
              }`}
            >
              Manage Bookings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("account")}
              className={`w-full text-left p-2 rounded-lg transition ${
                activeSection === "account"
                  ? "bg-purple-800"
                  : "hover:bg-purple-700"
              }`}
            >
              Manage Account
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        {activeSection === "bookings" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              My Bookings
            </h2>
            {bookings.length > 0 ? (
              <ul className="space-y-4">
                {bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="p-4 bg-white shadow rounded-lg border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold">
                        Booking ID: {booking.id}
                      </p>
                      <p className="text-lg font-semibold">
                        Stylist: {booking.stylist_name}
                      </p>
                      <p className="text-lg font-semibold">
                        Service: {booking.service_name}
                      </p>
                      <p className="text-lg font-semibold">
                        Date: {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No bookings found.</p>
            )}
          </div>
        )}

        {/* Manage Account Section */}
        {activeSection === "account" && user && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Manage Account
            </h2>

            {/* Edit Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
              />
              <button
                onClick={() => updateAccount("name", name)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Name
              </button>
            </div>

            {/* Edit Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
              />
              <button
                onClick={() => updateAccount("email", email)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Email
              </button>
            </div>

            {/* Edit Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
              />
              <button
                onClick={() => updateAccount("password", password)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </div>

            {/* Delete Account Button */}
            <button
              onClick={handleDeleteAccount}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAccountPage;
