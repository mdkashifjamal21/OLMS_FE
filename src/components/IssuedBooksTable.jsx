import React, { useEffect, useState } from "react";
import { getIssuedBooks } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const IssuedBooksTable = () => {
  const { currentUser } = useAuth();
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchIssued = async () => {
      try {
        const res = await getIssuedBooks();
        setIssuedBooks(res.data);
      } catch (err) {
        console.error("Error fetching issued books:", err);
      }
    };
    fetchIssued();
  }, []);

  if (!currentUser) {
    return <p className="text-center text-red-500">Please login to view issued books.</p>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
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
          {issuedBooks.map((book, i) => (
            <tr key={i} className="hover:bg-gray-50 transition duration-300">
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.issuedTo}</td>
              <td className="px-4 py-2">{book.issueDate}</td>
              <td className="px-4 py-2">{book.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default IssuedBooksTable;