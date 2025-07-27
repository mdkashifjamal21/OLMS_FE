import axios from "../api/axios";

export const getBooks = () => axios.get("/books");
export const addBook = (bookData) => axios.post("/books", bookData);
export const updateBook = (bookId, bookData) => axios.put(`/books/${bookId}`, bookData);
export const deleteBook = (bookId) => axios.delete(`/books/${bookId}`);
export const getIssuedBooks = () => axios.get("/books/issued");