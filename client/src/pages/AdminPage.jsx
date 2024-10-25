import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Define formik for user editing form
  const formik = useFormik({
    initialValues: { name: "", email: "", role: "" },
    enableReinitialize: true,
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:5000/admin/users/${editingUserId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            // Update users list after edit
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === editingUserId ? { ...user, ...values } : user
              )
            );
            setEditingUserId(null); // Exit edit mode after updating
          } else {
            console.error("Error updating user");
          }
        })
        .catch((error) => console.error("Error:", error));
    },
  });

  // Start editing a user
  const startEditing = (user) => {
    setEditingUserId(user.id);
    formik.setValues({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // Delete a user
  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Update users state after deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-600 text-white p-5 space-y-4">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
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
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Admin Management
        </h1>

        {/* Users Section */}
        <div id="manage-users" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
          <ul className="mt-4 space-y-4">
            {users.map((user) => (
              <li key={user.id} className="p-4 bg-white rounded shadow">
                {editingUserId === user.id ? (
                  <form onSubmit={formik.handleSubmit} className="space-y-2">
                    <input
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="Name"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Email"
                      className="w-full p-2 border rounded"
                    />
                    <select
                      name="role"
                      onChange={formik.handleChange}
                      value={formik.values.role}
                      className="w-full p-2 border rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUserId(null)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-lg font-medium">
                      {user.name} ({user.email}) - Role: {user.role}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => startEditing(user)}
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
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
