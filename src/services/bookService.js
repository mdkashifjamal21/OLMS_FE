import axios from "../api/axios";

// 📚 Get all books
export const getBooks = () => axios.get("/books");

// ➕ Add a new book
export const addBook = (bookData) => axios.post("/books", bookData);

// 🔄 Update book details by ID
export const updateBook = (bookId, bookData) => axios.put(`/books/${bookId}`, bookData);

// ❌ Delete a book by ID
export const deleteBook = (bookId) => axios.delete(`/books/${bookId}`);

// 📘 Get all issued books
export const getIssuedBooks = () => axios.get("/books/issued");

// 📝 Issue a book to a user
export const issueBook = (issueData) => axios.post("/books/issue", issueData);

// 🔧 Update available copies of a book by title
export const updateBookCopies = (title, newCount) =>
  axios.put("/books/update-copies", { title, Avaible_copies: newCount });

export const returnBook = (issueId) => axios.put(`/books/return/${issueId}`);