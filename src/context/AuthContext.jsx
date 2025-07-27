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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const localUser = JSON.parse(localStorage.getItem("olmsUser"));
      if (user && localUser) {
        const fullUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || localUser.name || "",
          role: localUser.role || "student",
          photoURL: user.photoURL || "",
        };
        setCurrentUser(fullUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { token, user } = response.data;

    localStorage.setItem("olmsToken", token);
    localStorage.setItem("olmsUser", JSON.stringify(user));
    setCurrentUser(user);

    redirectByRole(user.role);
  };

  const register = async ({ name, email, password, role }) => {
    const response = await registerUser({ name, email, password, role });
    const { token, user } = response.data;

    localStorage.setItem("olmsToken", token);
    localStorage.setItem("olmsUser", JSON.stringify(user));
    setCurrentUser(user);

    redirectByRole(user.role);
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const localUser = JSON.parse(localStorage.getItem("olmsUser"));
    const fullUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: localUser?.role || "student",
      photoURL: user.photoURL,
    };

    setCurrentUser(fullUser);
    localStorage.setItem("olmsUser", JSON.stringify(fullUser));

    redirectByRole(fullUser.role);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem("olmsUser");
    localStorage.removeItem("olmsToken");
    navigate("/login");
  };

  const redirectByRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "librarian":
        navigate("/librarian");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);