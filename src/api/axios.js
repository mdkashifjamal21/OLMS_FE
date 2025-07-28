// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://olmsbe-production-c5f7.up.railway.app/api",
});

instance.interceptors.request.use(
  (config) => {
    // const user = JSON.parse(localStorage.getItem("olmsUser"));
    const token = localStorage.getItem("olmsToken"); // ✅ Correct key


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;