import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/bookService';

const ExploreBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleBorrow = (book) => {
    const user = localStorage.getItem("olmsUser");
    if (!user) {
      navigate('/register');
    } else {
      alert(`Proceed to borrow "${book.Title}"`);
    }
  };

  // ✅ Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Explore Books</h2>

      {/* ✅ Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ✅ Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id_books}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{book.Title}</h3>
              <p className="text-gray-600 mb-2">Author: {book.Author}</p>
              <p className="text-gray-500 mb-4">
                Status: {book.Avaible_copies > 0 ? "Available" : "Unavailable"}
              </p>
              <button
                onClick={() => handleBorrow(book)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                disabled={book.Avaible_copies === 0}
              >
                {book.Avaible_copies > 0 ? "Borrow" : "Not Available"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreBooks;