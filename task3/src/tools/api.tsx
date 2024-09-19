'use client';

import axios from 'axios';

const useAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return axiosInstance; 
};

export default useAxiosInstance;