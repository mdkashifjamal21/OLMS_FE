import axios from "../api/axios";

export const getUsers = () => axios.get("/users");
export const addUser = (userData) => axios.post("/users", userData);
export const updateUser = (userId, userData) => axios.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => axios.delete(`/users/${userId}`);
export const getUserById = (userId) => axios.get(`/users/${userId}`);
export const getUserByEmail = (email) => axios.get(`/users/email/${email}`);    