// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://olmsbe-production-c5f7.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;