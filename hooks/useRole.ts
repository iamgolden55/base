"use client"

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_KEY } from '@/lib/constants';

export const useRole = () => {
  const [role, setRole] = useState<string>('role'); // Set default value to 'role'

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role || 'role'); // Fallback to 'role' if not found in token
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole('role'); // Fallback to 'role' on error
      }
    }
  }, []);

  return role;
}; 