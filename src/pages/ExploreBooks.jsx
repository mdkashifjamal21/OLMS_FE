import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { useNavigate } from "react-router-dom";

const ExploreBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        if (err.response?.status === 401) {
          alert("Unauthorized. Please log in again.");
         
        }
      }
    };

    fetchBooks();
  }, [navigate]);

  const filteredBooks = books.filter((book) => {
    const title = book?.title?.toLowerCase() || "";
    const term = searchTerm?.toLowerCase() || "";
    return title.includes(term);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Books</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBooks;