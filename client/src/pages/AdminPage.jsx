import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited

  useEffect(() => {
    // Fetch all users from the backend
    fetch("http://127.0.0.1:5000/admin/users", {
      method: "GET",
      credentials: "include", // Include session credentials
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Formik setup for editing user details
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    enableReinitialize: true, // Reinitialize when editing user changes
    onSubmit: (values) => {
      fetch(`http://127.0.0.1:5000/admin/users/${editingUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            // Update the local users state with the new data
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

  const deleteUser = (userId) => {
    fetch(`http://127.0.0.1:5000/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId));
        } else {
          console.error("Error deleting user");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const startEditing = (user) => {
    setEditingUserId(user.id);
    formik.setValues({
      name: user.name,
      email: user.email,
    });
  };

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <form onSubmit={formik.handleSubmit}>
                <input
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingUserId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                {user.name} ({user.email}) - Role: {user.role}
                <button onClick={() => startEditing(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
