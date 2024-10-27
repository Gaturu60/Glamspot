import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  // const [editingStylistId, setEditingStylistId] = useState(null);
  // const [editingBookingId, setEditingBookingId] = useState(null);

  // Fetch users, stylists, services and bookings on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.users || []))
      .catch((error) => console.error("Error fetching users:", error));

    fetch("http://127.0.0.1:5000/stylists", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setStylists(data.stylists || []))
      .catch((error) => console.error("Error fetching stylists:", error));

    fetch("http://127.0.0.1:5000/bookings", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setBookings(data || []))
      .catch((error) => console.error("Error fetching bookings:", error));

    fetch("http://127.0.0.1:5000/services", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setServices(data.services || []))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Formik setup for adding a new stylist
  const addStylistFormik = useFormik({
    initialValues: { name: "", specialty: "", image: null },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("specialty", values.specialty);
      formData.append("image", values.image);
      fetch("http://127.0.0.1:5000/stylists", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((newStylist) => {
          setStylists([...stylists, newStylist.stylist]);
          resetForm(); // Reset form fields after successful submission
        })
        .catch((error) => console.error("Error adding stylist:", error));
    },
  });

  // Formik setup for adding a new service
  const addServiceFormik = useFormik({
    initialValues: { name: "", description: "", price: "", image: null },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", values.image);

      fetch("http://127.0.0.1:5000/services", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((newService) => {
          setServices([...services, newService.service]);
          resetForm(); // Reset form fields after submission
          alert("Service added successfully!");
        })
        .catch((error) => console.error("Error adding service:", error));
    },
  });

  // Formik setup for editing user details
  const userFormik = useFormik({
    initialValues: { name: "", email: "" },
    enableReinitialize: true,
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:5000/users/${editingUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values), // Ensure values contain name and email
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error updating user:", data.error);
          } else {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === editingUserId ? { ...user, ...values } : user
              )
            );
            setEditingUserId(null); // Close edit mode on success
          }
        })
        .catch((error) => console.error("Error updating user:", error));
    },
  });

  // Delete functions
  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const deleteStylist = (stylistId) => {
    fetch(`http://127.0.0.1:5000/stylists/${stylistId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setStylists((prevStylists) =>
            prevStylists.filter((stylist) => stylist.id !== stylistId)
          );
        }
      })
      .catch((error) => console.error("Error deleting stylist:", error));
  };

  const deleteBooking = (bookingId) => {
    fetch(`http://127.0.0.1:5000/bookings/${bookingId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== bookingId)
          );
        }
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const deleteService = (serviceId) => {
    fetch(`http://127.0.0.1:5000/services/${serviceId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setServices((prevServices) =>
            prevServices.filter((service) => service.id !== serviceId)
          );
        } else {
          console.error("Failed to delete service");
        }
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-600 text-white p-5 space-y-4">
        <nav className="fixed h-full">
          <ul className="space-y-2">
            <li>
              <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
              <a
                href="#manage-users"
                className="block py-2 px-4 rounded hover:bg-purple-700"
              >
                Manage Users
              </a>
            </li>
            <li>
              <a
                href="#manage-stylists"
                className="block py-2 px-4 rounded hover:bg-purple-700"
              >
                Manage Stylists
              </a>
            </li>
            <li>
              <a
                href="#manage-bookings"
                className="block py-2 px-4 rounded hover:bg-purple-700"
              >
                Manage Bookings
              </a>
            </li>
            <li>
              <a
                href="#manage-services"
                className="block py-2 px-4 rounded hover:bg-purple-700"
              >
                Manage Services
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Admin Management
        </h1>

        {/* Manage Users */}
        <div id="manage-users" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
          <ul className="mt-4 space-y-4">
            {users.map((user) => (
              <li key={user.id} className="p-4 bg-white rounded shadow">
                <p className="text-lg font-medium">
                  {user.name} ({user.email})
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => {
                      setEditingUserId(user.id); // Set the user to edit
                      userFormik.setValues({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                      }); // Populate form with user data
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Edit User Form */}
          {editingUserId && (
            <form
              onSubmit={userFormik.handleSubmit}
              className="p-4 bg-gray-100 rounded shadow mt-4"
            >
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>
              <label>
                Name:
                <input
                  name="name"
                  type="text"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.name}
                  className="p-2 border rounded w-full"
                />
              </label>
              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.email}
                  className="p-2 border rounded w-full"
                />
              </label>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingUserId(null)} // Cancel editing
                className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Manage Stylists */}
        <div id="manage-stylists" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Stylists</h2>

          {/* Add New Stylist Form */}
          <form
            onSubmit={addStylistFormik.handleSubmit}
            className="p-4 bg-white rounded shadow mb-4 space-y-2"
          >
            <h3 className="text-lg font-medium">Add New Stylist</h3>
            <input
              name="name"
              type="text"
              onChange={addStylistFormik.handleChange}
              value={addStylistFormik.values.name}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              name="specialty"
              type="text"
              onChange={addStylistFormik.handleChange}
              value={addStylistFormik.values.specialty}
              placeholder="Specialty"
              className="w-full p-2 border rounded"
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                addStylistFormik.setFieldValue(
                  "image",
                  event.currentTarget.files[0]
                )
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Stylist
            </button>
          </form>

          <ul className="mt-4 space-y-4">
            {stylists.map((stylist) => (
              <li key={stylist.id} className="p-4 bg-white rounded shadow">
                {stylist.image_url ? (
                  <img
                    src={stylist.image_url}
                    alt={stylist.name}
                    className="w- h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
                <p className="text-lg font-medium">
                  {stylist.name} - Specialty: {stylist.specialty}
                </p>
                <button
                  onClick={() => deleteStylist(stylist.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Manage Bookings */}
        <div id="manage-bookings">
          <h2 className="text-2xl font-semibold text-gray-800">Bookings</h2>
          <ul className="mt-4 space-y-4">
            {bookings.map((booking) => {
              const user = users.find((u) => u.id === booking.user_id);
              const stylist = stylists.find((s) => s.id === booking.stylist_id);
              const service = services.find(
                (srv) => srv.id === booking.service_id
              );
              return (
                <li key={booking.id} className="p-4 bg-white rounded shadow">
                  <p className="text-lg font-medium">
                    Booking ID: {booking.id}
                  </p>
                  <p>User: {user ? user.name : "Unknown User"}</p>
                  <p>Stylist: {stylist ? stylist.name : "Unknown Stylist"}</p>
                  <p>Service: {service ? service.name : "Unknown Service"}</p>
                  <p>Date: {booking.date_time}</p>
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Manage Services */}
        <div id="manage-services">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Manage Services
          </h2>

          {/* Add New Service Form */}
          <form
            onSubmit={addServiceFormik.handleSubmit}
            className="mb-8 p-4 bg-white rounded shadow"
          >
            <h3 className="text-lg font-medium mb-4">Add New Service</h3>
            <input
              name="name"
              type="text"
              onChange={addServiceFormik.handleChange}
              value={addServiceFormik.values.name}
              placeholder="Service Name"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              onChange={addServiceFormik.handleChange}
              value={addServiceFormik.values.description}
              placeholder="Service Description"
              className="w-full p-2 border rounded"
              rows="3"
            />
            <input
              name="price"
              type="number"
              onChange={addServiceFormik.handleChange}
              value={addServiceFormik.values.price}
              placeholder="Price"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                addServiceFormik.setFieldValue(
                  "image",
                  event.currentTarget.files[0]
                )
              }
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Service
            </button>
          </form>

          {/* Display existing services */}
          <ul className="mt-4 space-y-4">
            {services.map((service) => (
              <li key={service.id} className="p-4 bg-white rounded shadow">
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-20 h-20 mb-2"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p> // Fallback message if image_url is undefined
                )}
                <p className="text-lg font-medium">{service.name}</p>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-gray-600">Price: ${service.price}</p>
                <button
                  onClick={() => deleteService(service.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
