import React, { useEffect, useState } from "react";
import { getIssuedBooks } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const borrow = (book) =>
{
alert(`Borrowing book : ${book.title}`);
}

const IssuedBooksTable = () => {
  const { currentUser } = useAuth();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchIssued = async () => {
      try {
        const res = await getIssuedBooks();
        const booksWithValidDates = res.data.map((book) => {
          const issueDate = dayjs(book.issueDate);
          const dueDate = dayjs(book.dueDate);
          const minDueDate = issueDate.add(10, "day");

          return {
            ...book,
            dueDate: dueDate.isBefore(minDueDate) ? minDueDate.format("YYYY-MM-DD") : book.dueDate,
          };
        });
        setIssuedBooks(booksWithValidDates);
      } catch (err) {
        console.error("Error fetching issued books:", err);
      }
    };
    fetchIssued();
  }, []);

  if (!currentUser) {
    return <p className="text-center text-red-500">Please login to view issued books.</p>;
  }

  const filteredBooks = issuedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.issuedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-bold text-blue-700">📚 Issued Books</h2>
        <input
          type="text"
          placeholder="Search by title or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Issued To</th>
              <th className="px-4 py-2">Issue Date</th>
              <th className="px-4 py-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <tr key={i} className="hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.issuedTo}</td>
                  <td className="px-4 py-2">{book.issueDate}</td>
                  <td className="px-4 py-2">{book.dueDate}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline" onClick={() => borrow(book)}>
                      borrow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  ❌ No books found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default IssuedBooksTable;