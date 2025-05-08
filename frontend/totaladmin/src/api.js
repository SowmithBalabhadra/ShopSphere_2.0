import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bck-z1bh.onrender.com/api/dashboard', // ✅ Backend port 4000
  withCredentials: true,
});

export default API;
