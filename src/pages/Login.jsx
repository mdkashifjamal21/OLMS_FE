import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { googleLogin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // ✅ Use AuthContext login
      navigate("/dashboard"); // ✅ Redirect to dashboard on success
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // ✅ Updates context and redirects
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to OLMS</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>

        <div className="my-4 text-center">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border py-2 rounded flex items-center justify-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="h-5"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;