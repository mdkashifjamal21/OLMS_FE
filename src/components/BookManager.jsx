import React, { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const BookManager = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", available: true });

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
      setNewBook({ title: "", author: "", available: true });
      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  if (!currentUser) {
    return <p className="text-center text-red-500">Access denied. Please login.</p>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <form onSubmit={handleAddBook} className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Add Book
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {books.map((book) => (
          <motion.div
            key={book.id_books}
            className="p-4 bg-white shadow rounded-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold">{book.Title}</h3>
            <p className="text-sm text-gray-500">Author: {book.Author}</p>
            <p className="text-sm text-gray-400 mt-1">Available Copies: {book.Avaible_copies}</p>
            <button
              onClick={() => handleDelete(book.id_books)}
              className="mt-2 text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookManager;