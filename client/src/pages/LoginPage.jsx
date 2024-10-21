import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useFormik } from "formik";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            formik.setStatus(data.error);
          } else {
            login();

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
    <div className="container p-6 bg-gradient-to-b from-purple-50 to-white">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        User Login
      </h1>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded p-6">
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
          className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-500 transition duration-200"
        >
          Login
        </button>

        {formik.status && (
          <p className="text-red-500 text-center mt-4">{formik.status}</p>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
