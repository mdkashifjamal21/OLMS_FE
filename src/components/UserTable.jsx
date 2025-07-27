import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const UserTable = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);

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
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ✅ Show fallback if not logged in
  if (!currentUser) {
    return <p className="text-center text-red-500">Please login to view users.</p>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            {currentUser.role === "admin" && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_users} className="hover:bg-gray-50 transition duration-300">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 capitalize">{user.role}</td>
              {currentUser.role === "admin" && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id_users)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default UserTable;