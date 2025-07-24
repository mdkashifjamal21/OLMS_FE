// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR9Xk9_EHN48wkqIlOGl2FdscNCFsMFqs",
  authDomain: "olms-c96fc.firebaseapp.com",
  projectId: "olms-c96fc",
  storageBucket: "olms-c96fc.firebasestorage.app",
  messagingSenderId: "393614872365",
  appId: "1:393614872365:web:520084906c4256d2e00da4",
  measurementId: "G-2MGP68DTQT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();