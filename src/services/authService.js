import axios from '../api/axios';

export const registerUser = async (data) => {
  return axios.post('/auth/register', data);
};

export const loginUser = async (data) => {
  return axios.post('/auth/login', data);
};