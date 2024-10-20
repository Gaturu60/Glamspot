import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function BookingPage() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));

    fetch("/api/stylists/available")
      .then((response) => response.json())
      .then((data) => setStylists(data))
      .catch((error) => console.error("Error fetching stylists:", error));
  }, []);

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
            .then(() => alert("Booking Successful!"))
            .catch((error) => console.error("Error creating booking:", error));
        })
        .catch((error) => console.error("Error creating user:", error));
    },
  });

  return (
    <>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Book an Appointment</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <select
              id="service"
              name="service"
              onChange={formik.handleChange}
              value={formik.values.service}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Stylist</label>
            <select
              id="stylist"
              name="stylist"
              onChange={formik.handleChange}
              value={formik.values.stylist}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            >
              <option value="">Select a stylist</option>
              {stylists.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>
                  {stylist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </>
  );
}

export default BookingPage;
