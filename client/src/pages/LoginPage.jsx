import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFormik } from "formik";

function LoginPage() {
  const { login } = useContext(AuthContext); //Get Login function from AuthContext
  const navigate = useNavigate();

  //Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //include session credentials
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            formik.setStatus(data.error); // Set error message if login fails
          } else {
            login(); // Update auth state on successful login

            if (data.role === "admin") {
              navigate("/admin"); // Redirect to admin page if admin
            } else {
              navigate("/bookings"); // Redirect to bookings page
            }
          }
        })
        .catch((error) => {
          formik.setStatus("An error occurred. Please try again.");
          console.error("Error:", error);
        });
    },
  });

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        User Login
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
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

        <button
          type="submit"
          className="w-auto px-4 py-2 bg-primary text-white text-base font-bold rounded-md hover:bg-secondary transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
