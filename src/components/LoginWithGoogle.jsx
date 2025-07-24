// src/components/LoginWithGoogle.jsx

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const LoginWithGoogle = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Logged in:", user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      Sign in with Google
    </button>
  );
};

export default LoginWithGoogle;
