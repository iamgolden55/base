import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    
    if (token) {
      // Check if token is expired
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        // Token is expired, try to refresh
        try {
          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/refresh/`,
            {
              refresh: refreshToken
            }
          );
          
          // Save new tokens
          localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
          
          // Update Authorization header
          config.headers.Authorization = `Bearer ${response.data.access}`;
        } catch (error) {
          // Refresh failed, redirect to login
          localStorage.clear();
          window.location.href = '/auth/login';
        }
      } else {
        // Token is still valid
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 