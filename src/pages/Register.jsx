import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth } from "../context/AuthContext"; // Assuming this is the correct import path

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await register(formData);
    alert(response.data.message || "Registration successful. Please log in.");
    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    setError("Registration failed.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register for OLMS
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border px-4 py-2 rounded" />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full border px-4 py-2 rounded" />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full border px-4 py-2 rounded" />
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-4 py-2 rounded">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="librarian">Librarian</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;