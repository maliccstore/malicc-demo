import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'https://api.malicc.store',
  baseURL: 'http://localhost:8000/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
