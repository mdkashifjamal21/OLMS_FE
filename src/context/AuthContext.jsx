// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Sync Firebase auth and localStorage user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      const localUser = JSON.parse(localStorage.getItem("olmsUser"));

      if (firebaseUser && localUser) {
        const fullUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || localUser.name || "",
          role: localUser.role || "student",
          photoURL: firebaseUser.photoURL || "",
          token: localStorage.getItem("olmsToken") || "",
        };
        setCurrentUser(fullUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsub();
  }, []);

  // ✅ Login with backend
  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;

      localStorage.setItem("olmsToken", token);
      localStorage.setItem("olmsUser", JSON.stringify(user));
      setCurrentUser(user);

      redirectByRole(user.role);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // ✅ Register with backend
  const register = async ({ name, email, password, role }) => {
    try {
      const response = await registerUser({ name, email, password, role });
      const { token, user } = response.data;

      localStorage.setItem("olmsToken", token);
      localStorage.setItem("olmsUser", JSON.stringify(user));
      setCurrentUser(user);

      redirectByRole(user.role);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // ✅ Google login via Firebase
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const localUser = JSON.parse(localStorage.getItem("olmsUser")) || {};
      const fullUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        role: localUser.role || "student",
        photoURL: firebaseUser.photoURL,
        token: localStorage.getItem("olmsToken") || "",
      };

      localStorage.setItem("olmsUser", JSON.stringify(fullUser));
      setCurrentUser(fullUser);

      redirectByRole(fullUser.role);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Firebase signOut failed:", error);
    }

    localStorage.removeItem("olmsUser");
    localStorage.removeItem("olmsToken");
    setCurrentUser(null);
    navigate("/login");
  };

  // ✅ Role-based redirection
  const redirectByRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "librarian":
        navigate("/librarian");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);