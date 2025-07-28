import React, { useEffect, useState } from "react";
import {
  getIssuedBooks,
  getBooks,
  issueBook,
  updateBookCopies,
  returnBook as returnIssuedBook
} from "../services/bookService";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const IssuedBooksTable = () => {
  const { currentUser } = useAuth();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [authorSuggestions, setAuthorSuggestions] = useState([]);

  const fetchIssued = async () => {
    try {
      const res = await getIssuedBooks();
      const booksWithValidDates = res.data.map((book) => {
        const issueDate = dayjs(book.issue_date);
        const dueDate = dayjs(book.due_date);
        const minDueDate = issueDate.add(10, "day");

        return {
          ...book,
          due_date: dueDate.isBefore(minDueDate)
            ? minDueDate.format("YYYY-MM-DD")
            : book.due_date
        };
      });
      setIssuedBooks(booksWithValidDates);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchIssued();
    fetchBooks();
  }, []);

  const borrow = async (bookTitle) => {
    const book = books.find((b) => b.Title.toLowerCase() === bookTitle.toLowerCase());
    if (!book || book.Avaible_copies <= 0) {
      alert("❌ Book not available for borrowing.");
      return;
    }

    try {
      const issueDate = dayjs().format("YYYY-MM-DD");
      const dueDate = dayjs().add(10, "day").format("YYYY-MM-DD");

      await issueBook({
        users_id: currentUser.id,
        books_id: book.id_books,
        issue_date: issueDate,
        due_date: dueDate,
        return_date: null,
        fine_amount: 0,
        isReturned: false
      });

      await updateBookCopies(book.Title, book.Avaible_copies - 1);
      alert(`✅ Successfully borrowed "${book.Title}"`);
      fetchIssued();
    } catch (err) {
      console.error("Error borrowing book:", err);
      alert("❌ Failed to borrow book.");
    }
  };

  const handleManualBorrow = async () => {
    const title = inputTitle.trim().toLowerCase();
    const author = inputAuthor.trim().toLowerCase();

    if (!title || !author) {
      alert("❌ Please enter both title and author.");
      return;
    }

    const book = books.find(
      (b) =>
        b.Title.toLowerCase() === title &&
        b.Author.toLowerCase() === author
    );

    if (!book) {
      alert("❌ Book not found in the library.");
      return;
    }

    if (book.Avaible_copies <= 0) {
      alert("❌ No available copies to issue.");
      return;
    }

    try {
      const issueDate = dayjs().format("YYYY-MM-DD");
      const dueDate = dayjs().add(10, "day").format("YYYY-MM-DD");

      await issueBook({
        users_id: currentUser.id,
        books_id: book.id_books,
        issue_date: issueDate,
        due_date: dueDate,
        return_date: null,
        fine_amount: 0,
        isReturned: false
      });

      await updateBookCopies(book.Title, book.Avaible_copies - 1);

      alert(`✅ Successfully issued "${book.Title}"`);
      setInputTitle("");
      setInputAuthor("");
      fetchIssued();
    } catch (err) {
      console.error("Error issuing book:", err);
      alert("❌ Failed to issue book.");
    }
  };

  const handleReturnBook = async (id_issue) => {
    try {
      const res = await returnIssuedBook(id_issue);
      if (res.status === 200) {
        alert(`✅ Book returned successfully! Fine: ₹${res.data.fine}`);
        fetchIssued();
      } else {
        alert(`❌ Failed to return book: ${res.data.error}`);
      }
    } catch (err) {
      console.error("Error returning book:", err);
      alert("❌ Failed to return book.");
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setInputTitle(value);

    const filtered = books
      .map((b) => b.Title)
      .filter((title) => title.toLowerCase().includes(value.toLowerCase()));
    setTitleSuggestions(filtered.slice(0, 5));
  };

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setInputAuthor(value);

    const filtered = books
      .map((b) => b.Author)
      .filter((author) => author.toLowerCase().includes(value.toLowerCase()));
    setAuthorSuggestions(filtered.slice(0, 5));
  };

  const filteredBooks = issuedBooks.filter((book) => {
    const title = book.Book?.Title?.toLowerCase() || "";
    const author = book.Book?.Author?.toLowerCase() || "";
    const user = book.User?.username?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return title.includes(term) || author.includes(term) || user.includes(term);
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-bold text-blue-700">📚 Issued Books</h2>
        <input
          type="text"
          placeholder="Search by title, author, or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Book Title"
            value={inputTitle}
            onChange={handleTitleChange}
            className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
          />
          {titleSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
              {titleSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setInputTitle(suggestion);
                    setTitleSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter Author Name"
            value={inputAuthor}
            onChange={handleAuthorChange}
            className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 w-full"
          />
          {authorSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded shadow mt-1 w-full max-h-40 overflow-y-auto">
              {authorSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setInputAuthor(suggestion);
                    setAuthorSuggestions([]);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleManualBorrow}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📘 Issue Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Issued To</th>
              <th className="px-4 py-2">Issue Date</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Returned</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <tr key={i} className="hover:bg-gray-50 transition duration-300">
                  <td className="px-4 py-2">{book.Book?.Title || "Unknown"}</td>
                  <td className="px-4 py-2">{book.Book?.Author || "Unknown"}</td>
                  <td className="px-4 py-2">{book.User?.username || currentUser.username}</td>
                  <td className="px-4 py-2">{book.issue_date}</td>
                  <td className="px-4 py-2">{book.due_date}</td>
                  <td className="px-4 py-2">
                    {book.isReturned ? (
                      <span className="text-green-600 font-semibold">✅ Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">❌ No</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {!book.isReturned && (
                      <>
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => borrow(book.Book?.Title)}
                        >
                          📖 Borrow
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleReturnBook(book.id_issue)}
                        >
                          🔙 Return
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
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