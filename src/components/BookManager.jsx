import React, { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const BookManager = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    Title: "",
    Author: "",
    total_copies: 0,
    Avaible_copies: 0
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
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

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setMessage("🗑️ Book deleted.");
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
      setMessage("❌ Failed to delete book.");
    }
  };

  if (!currentUser) {
    return <p className="text-center text-red-500">Access denied. Please login.</p>;
  }

  const canManageBooks = ["admin", "librarian"].includes(currentUser.role);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {canManageBooks && (
        <form
          onSubmit={handleAddBook}
          className="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-blue-700">📘 Add New Book</h2>
          {message && <p className="text-sm text-green-600">{message}</p>}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              onChange={(e) => setNewBook({ ...newBook, total_copies: parseInt(e.target.value) })}
              className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
              required
              min={0}
            />
            <input
              type="number"
              placeholder="Available Copies"
              value={newBook.Avaible_copies}
              onChange={(e) => setNewBook({ ...newBook, Avaible_copies: parseInt(e.target.value) })}
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

      <div className="grid md:grid-cols-2 gap-6">
        {books.map((book) => (
          <motion.div
            key={book.id_books}
            className="p-6 bg-white shadow rounded-lg border hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-800">{book.Title}</h3>
            <p className="text-sm text-gray-600">Author: {book.Author}</p>
            <p className="text-sm text-gray-500">Total Copies: {book.total_copies}</p>
            <p className="text-sm text-gray-500">Available Copies: {book.Avaible_copies}</p>
            {canManageBooks && (
              <button
                onClick={() => handleDelete(book.id_books)}
                className="mt-3 text-red-500 hover:text-red-700 text-sm"
              >
                🗑️ Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookManager;