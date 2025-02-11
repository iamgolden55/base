"use client"

import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN_KEY } from '@/lib/constants';
import { DecodedToken } from '@/app/types/auth';
import axiosInstance from '@/lib/axios';  // Add this import

export const useRole = () => {
  const [userData, setUserData] = useState<DecodedToken['user_data'] | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = useCallback(async () => {
    try {
      // Fetch fresh user data directly from the API
      const response = await axiosInstance.get('api/profile/');
      console.log('Fresh user data:', response.data);
      setUserData({
        basic_info: response.data,
        medical_info: response.data.medical_info || null,
        hospital_info: response.data.hospital_info || null
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [userData?.medical_info, userData?.hospital_info]);

  useEffect(() => {
    refresh(); // Initial fetch
  }, [refresh, refreshTrigger]);

  return {
    basic_info: userData?.basic_info || null,
    medical_info: userData?.medical_info || null,
    hospital_info: userData?.hospital_info || null,
    refresh
  };
};