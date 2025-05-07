import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api/dashboard', // ✅ Backend port 4000
  withCredentials: true,
});

export default API;
