import React from 'react';

const BookManager = () => {
  const fakeData = [
    { id: 1, title: "1984", author: "George Orwell", available: true },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", available: false },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {fakeData.map((book) => (
        <div key={book.id} className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-500">Author: {book.author}</p>
          <p className="text-sm text-gray-400 mt-1">Available Copies: {book.available ? 10 : 0}</p>
        </div>
      ))}
    </div>
  );
};

export default BookManager;
