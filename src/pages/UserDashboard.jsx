import React, { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook } from "../services/bookService";
import { getUsers, deleteUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const Dashboard = () => {
  const { currentUser } = useAuth();

  // Book states
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    Title: "",
    Author: "",
    total_copies: 0,
    Avaible_copies: 0,
  });

  // User states
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Shared message
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await addBook(newBook);
      setNewBook({ Title: "", Author: "", total_copies: 0, Avaible_copies: 0 });
      setMessage("✅ Book added successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
      setMessage("❌ Failed to add book.");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setMessage("🗑️ Book deleted.");
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
      setMessage("❌ Failed to delete book.");
    }
  };

  const handleDeleteUser = async (id) => {
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

  const formatDate = (date) => (date ? dayjs(date).format("DD MMM YYYY, hh:mm A") : "—");

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) {
    return <p className="text-center text-red-500">Access denied. Please login.</p>;
  }

  const canManageBooks = ["admin", "librarian"].includes(currentUser.role);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 p-6">
      <h1 className="text-2xl font-bold text-blue-700 text-center">📊 Dashboard</h1>
      {message && <p className="text-center text-green-600 text-sm">{message}</p>}

      <div className="grid md:grid-cols-2 gap-10">
        {/* Book Manager */}
        <div>
          {canManageBooks && (
            <form
              onSubmit={handleAddBook}
              className="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-700">📘 Add New Book</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={newBook.Title}
                  onChange={(e) => setNewBook({ ...newBook, Title: e.target.value })}
                  className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={newBook.Author}
                  onChange={(e) => setNewBook({ ...newBook, Author: e.target.value })}
                  className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="number"
                  placeholder="Total Copies"
                  value={newBook.total_copies}
                  onChange={(e) =>
                    setNewBook({ ...newBook, total_copies: parseInt(e.target.value) })
                  }
                  className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                  required
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Available Copies"
                  value={newBook.Avaible_copies}
                  onChange={(e) =>
                    setNewBook({ ...newBook, Avaible_copies: parseInt(e.target.value) })
                  }
                  className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
                  required
                  min={0}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                ➕ Add Book
              </button>
            </form>
          )}

          <div className="mt-6 space-y-4">
            {books.map((book) => (
              <motion.div
                key={book.id_books}
                className="p-4 bg-white shadow rounded-lg border hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-gray-800">{book.Title}</h3>
                <p className="text-sm text-gray-600">Author: {book.Author}</p>
                <p className="text-sm text-gray-500">Total Copies: {book.total_copies}</p>
                <p className="text-sm text-gray-500">Available Copies: {book.Avaible_copies}</p>
                {canManageBooks && (
                  <button
                    onClick={() => handleDeleteBook(book.id_books)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️ Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">👥 User Management</h2>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
                            onClick={() => handleDeleteUser(user.id_users)}
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
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;