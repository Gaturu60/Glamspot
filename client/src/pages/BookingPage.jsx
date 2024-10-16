import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function BookingPage() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  // Fetch services and stylists from the backend
  useEffect(() => {
    fetch("/api/services") // Replace with backend api endpoint
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));

    fetch("/api/stylists/available") // Replace with backend api endpoint
      .then((response) => response.json())
      .then((data) => setStylists(data))
      .catch((error) => console.error("Error fetching stylists:", error));
  }, []);

  // Formik form for user registration and booking creation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      service: "",
      stylist: "",
      date: "",
    },
    onSubmit: (values) => {
      // First create the user, then create the booking
      // Replace with backend api endpoint
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((userData) => {
          // After user creation, create the booking
          // Replace with backend api endpoint
          fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userData.id,
              service_id: values.service,
              stylist_id: values.stylist,
              date: values.date,
            }),
          })
            .then(() => alert("Booking successfully created!"))
            .catch((error) => console.error("Error creating booking:", error));
        })
        .catch((error) => console.error("Error creating user:", error));
    },
  });

  return (
    <div className="booking-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* User Information */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </div>
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

        {/* Booking Information */}
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            onChange={formik.handleChange}
            value={formik.values.service}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stylist">Stylist</label>
          <select
            id="stylist"
            name="stylist"
            onChange={formik.handleChange}
            value={formik.values.stylist}
            required
          >
            <option value="">Select a stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Appointment Date</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            onChange={formik.handleChange}
            value={formik.values.date}
            required
          />
        </div>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookingPage;
