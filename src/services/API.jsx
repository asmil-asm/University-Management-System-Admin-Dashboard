import axios from 'axios';
import { useAuth } from '../store/useAuth';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

API.interceptors.request.use(
  (config) => {
    const isAuthEndpoint = config.url?.includes('/api/v1/token/');    
    if (!isAuthEndpoint) {
      const token = useAuth.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshPromise = null;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    
    const isAuthEndpoint = original.url?.includes('/api/v1/token/');

    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      if (refreshPromise) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return API(original);
          })
          .catch((err) => Promise.reject(err));
      }

      const refreshToken = useAuth.getState().refreshToken;
      
      if (!refreshToken) {
        useAuth.getState().clearAuth();
        window.location.href = '/';
        return Promise.reject(error);
      }

      refreshPromise = API.post(
        '/api/v1/token/refresh/',
        { refresh: refreshToken }
      );

      try {
        const res = await refreshPromise;
        const newToken = res.data.access;

        useAuth.getState().setAccessToken(newToken);
        processQueue(null, newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return API(original);
      } catch (err) {
        processQueue(err, null);
        useAuth.getState().clearAuth();
        window.location.href = '/';
        return Promise.reject(err);
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export default API;