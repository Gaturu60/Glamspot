import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function BookingPage({ userId }) {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  // Fetch services and stylists from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/services")
      .then((response) => response.json())
      .then((data) => setServices(data.services))
      .catch((error) => console.error("Error fetching services:", error));

    fetch("http://127.0.0.1:5000/stylists")
      .then((response) => response.json())
      .then((data) => setStylists(data.stylists))
      .catch((error) => console.error("Error fetching stylists:", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      service: "",
      stylist: "",
      date: "",
    },
    onSubmit: (values) => {
      // Create booking using the logged-in user's ID
      fetch("http://127.0.0.1:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId, // Use the logged-in user's ID
          service_id: values.service,
          stylist_id: values.stylist,
          date_time: `${values.date}T00:00:00`, // Ensure the correct datetime format
        }),
      })
        .then(() => alert("Booking successfully created!"))
        .catch((error) => console.error("Error creating booking:", error));
    },
  });

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Book an Appointment
      </h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Booking Information */}
        <div className="mb-4">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700"
          >
            Service
          </label>
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
          <label
            htmlFor="stylist"
            className="block text-sm font-medium text-gray-700"
          >
            Stylist
          </label>
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
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
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
          className="w-auto px-4 py-2 bg-primary text-white text-base font-bold rounded-md hover:bg-secondary transition duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
