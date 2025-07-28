import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { motion } from "framer-motion";

const ExploreBooks = () => {
  const [books, setBooks] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=library&per_page=6`, {
          headers: {
            Authorization: 'Ywfa7QJFVHvm86ilUWbd4IUDSSDio4tWwP7pETTuyzX54QZOZ5xic6kA'
          }
        });
        const data = await res.json();
        setImages(data.photos.map((img) => img.src.medium));
      } catch (err) {
        console.error("Image fetch error:", err);
      }
    };

    fetchBooks();
    fetchImages();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">📚 Explore Our Library</h1>

      {/* Image Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {images.map((url, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={url} alt={`library-${index}`} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">Library Vibes</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <motion.div
            key={book.id_books || index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          > 
          <div className="mb-4">
              <img
                src={images[index % images.length]} // Cycle through Pexels images
                alt={`Book cover for ${book.Title}`}
                className="w-full h-48 object-cover rounded"
              />
            </div>

            <h2 className="text-xl font-bold text-blue-700 mb-2">{book.Title}</h2>
            <p className="text-gray-700 mb-1">👤 <span className="font-medium">Author:</span> {book.Author}</p>
            <p className="text-gray-600 mb-1">📦 <span className="font-medium">Total Copies:</span> {book.total_copies}</p>
            <p className="text-gray-600 mb-4">✅ <span className="font-medium">Available:</span> {book.Avaible_copies}</p>
            <p className="text-sm text-gray-500 italic">
              Dive into this literary gem and explore the world it unfolds.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBooks;