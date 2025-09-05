// api.js
import axios from "axios";
const { VITE_API_URL} = import.meta.env;

export const authApi = axios.create({
  baseURL: VITE_API_URL+"/api/v1/auth/",
});

export const activateAccount = axios.create({
  baseURL: VITE_API_URL+"/auth/activate-account/",
});

export const booksApi = axios.create({
  baseURL: VITE_API_URL+"/api/v1",
});

// Attach token automatically
booksApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default booksApi;
