import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const UserTable = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setMessage("🗑️ User deleted successfully.");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("❌ Failed to delete user.");
    }
  };

  if (!currentUser) {
    return <p className="text-center text-red-500">Please login to view users.</p>;
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleBadge = (role) => {
    const base = "px-2 py-1 rounded text-xs font-semibold";
    switch (role) {
      case "admin":
        return <span className={`${base} bg-red-100 text-red-600`}>Admin</span>;
      case "librarian":
        return <span className={`${base} bg-blue-100 text-blue-600`}>Librarian</span>;
      case "student":
        return <span className={`${base} bg-green-100 text-green-600`}>Student</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-600`}>{role}</span>;
    }
  };

  const formatDate = (date) => (date ? dayjs(date).format("DD MMM YYYY, hh:mm A") : "—");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-bold text-blue-700">👥 User Management</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {message && <p className="text-center text-green-600 text-sm">{message}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Registered</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2">Last Logout</th>
              {currentUser.role === "admin" && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id_users} className="hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{roleBadge(user.role)}</td>
                  <td className="px-4 py-2">{formatDate(user.registrationDate)}</td>
                  <td className="px-4 py-2">{formatDate(user.lastLogin)}</td>
                  <td className="px-4 py-2">{formatDate(user.lastLogout)}</td>
                  {currentUser.role === "admin" && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(user.id_users)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  ❌ No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserTable;