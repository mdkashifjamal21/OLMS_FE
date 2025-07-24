// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  provider
} from "../firebaseConfig";
import {
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const localUser = JSON.parse(localStorage.getItem("olmsUser"));
        const fullUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || localUser?.name || "",
          role: localUser?.role || "student",
          photoURL: user.photoURL || "",
        };
        setCurrentUser(fullUser);
        localStorage.setItem("olmsUser", JSON.stringify(fullUser));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("olmsUser");
      }
    });

    return () => unsub();
  }, []);

  const register = async (email, password, name, role) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const fullUser = {
      uid: res.user.uid,
      email,
      name,
      role,
      photoURL: ""
    };
    localStorage.setItem("olmsUser", JSON.stringify(fullUser));
    return res;
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const localUser = JSON.parse(localStorage.getItem("olmsUser"));
    const fullUser = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: localUser?.name || result.user.displayName || "",
      role: localUser?.role || "student",
      photoURL: result.user.photoURL || "",
    };
    setCurrentUser(fullUser);
    localStorage.setItem("olmsUser", JSON.stringify(fullUser));
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Try to preserve existing localStorage data
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
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem("olmsUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
