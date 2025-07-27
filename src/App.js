import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ExploreBooks from './pages/ExploreBooks';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute'; // ✅ Corrected path

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExploreBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected route for any logged-in user */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ AdminDashboard now accessible to all logged-in users */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Unauthorized fallback */}
        <Route
          path="/unauthorized"
          element={
            <div className="text-center mt-20">
              <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
              <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;