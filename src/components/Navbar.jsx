import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400">OLMS</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/explore" className="hover:text-blue-400">Explore</Link>

          {!currentUser && (
            <>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
            </>
          )}

          {currentUser && (
            <>
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
              <Link to="/admin-dashboard" className="hover:text-blue-400">Admin Dashboard</Link>
              <div className="flex items-center gap-2 ml-4">
                {currentUser.photoURL && (
                  <img src={currentUser.photoURL} alt="User" className="h-8 w-8 rounded-full" />
                )}
                <span className="text-sm text-gray-300">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <button onClick={handleLogout} className="ml-3 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
