import axios from "../api/axios";
// 📚 Get all issued books
export const getIssuedBooks = () => {
  return axios.get("/api/issued-books");
};

// 📚 Issue a new book
export const issueBook = (data) => {
  return axios.post("/api/issued-books", data);
};

// 📚 Return a book
export const returnBook = (id) => {
  return axios.put(`/api/issued-books/return/${id}`);
};
