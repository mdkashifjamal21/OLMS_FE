import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fakeData = [
    { id: 1, title: "1984", author: "George Orwell", available: true },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", available: false },
  ];
  setBooks(fakeData);
}, []);

  const handleBorrow = () => {
    const isLoggedIn = localStorage.getItem("user"); // You can use context or token here
    if (!isLoggedIn) {
      navigate('/register');
    } else {
      alert('Proceed to borrow (You’re logged in)');
      // In future: navigate('/borrow') or open a borrow modal
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">Author: {book.author}</p>
            <p className="text-gray-500 mb-4">Status: {book.available ? "Available" : "Unavailable"}</p>
            <button
              onClick={handleBorrow}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              disabled={!book.available}
            >
              {book.available ? "Borrow" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBooks;
