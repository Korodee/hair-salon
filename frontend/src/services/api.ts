import axios from 'axios';

const TOKEN_KEY = 'authToken';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/verify-email', '/auth/check-inbox', '/auth/reset-password'];

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isPublicRoute = publicRoutes.includes(currentPath);
      
      if (!isPublicRoute) {
        // Only redirect to login if not on a public route
        localStorage.removeItem(TOKEN_KEY);
        // Use window.location.href for auth-related redirects to ensure a clean state
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
