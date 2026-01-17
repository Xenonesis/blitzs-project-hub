<<<<<<< HEAD
// This file is deprecated - use supabase.ts instead
// Keeping for backward compatibility during migration

export default {
  get: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  post: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  put: () => Promise.reject(new Error('API deprecated - use Supabase instead')),
  delete: () => Promise.reject(new Error('API deprecated - use Supabase instead'))
};
=======
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
>>>>>>> 543604f79ee2629fb590a13389ced1f0a9de7d10
