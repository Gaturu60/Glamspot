import React, { useState } from "react";
import { useFormik } from "formik";

function LoginPage() {
  const [userBookings, setUserBookings] = useState([]);

  // Formik form for login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // Log in the user
      // Replace with backend API endpoint
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((userData) => {
          // Fetch the user's bookings after login
          // Replace with backend API endpoint
          fetch(`/api/users/${userData.id}/bookings`)
            .then((response) => response.json())
            .then((bookings) => setUserBookings(bookings))
            .catch((error) => console.error("Error fetching bookings:", error));
        })
        .catch((error) => console.error("Error logging in:", error));
    },
  });

  return (
    <div className="login-container">
      <h1>User Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="bookings-list">
        <h2>Your Bookings</h2>
        <ul>
          {userBookings.map((booking) => (
            <li key={booking.id}>
              {booking.service_name} with {booking.stylist_name} on{" "}
              {booking.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;
