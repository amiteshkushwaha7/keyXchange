import axios from 'axios';
// import store from '../app/store';
// import { logoutUser } from '../features/auth/authSlice'; // Only logout needed now

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// 🚫 NO need for request interceptor for Authorization header
// 🚫 NO need to read accessToken from Redux store

// let isRefreshing = false;

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Skip refresh for login, refresh, or already retried
//     if (
//       originalRequest.url.includes('/auth/refresh') ||
//       originalRequest.url.includes('/auth/login') ||
//       error.response?.status !== 401 ||
//       originalRequest._retry ||
//       isRefreshing
//     ) {
//       return Promise.reject(error);
//     }

//     isRefreshing = true;
//     originalRequest._retry = true;

//     try {
//       // Call refresh endpoint to renew access token via cookie
//       await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
//         withCredentials: true,
//       });

//       // Retry the original request
//       return api(originalRequest);
//     } catch (refreshError) {
//       // Clear state and redirect on failure
//       store.dispatch(logoutUser());

//       if (window.location.pathname !== '/login') {
//         window.location.href = '/login';
//       }

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

export default api;






















































// import axios from 'axios';
// import store from '../app/store';
// import { logoutUser, setAccessToken } from '../features/auth/authSlice';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = store.getState().auth.accessToken;
//     // console.log(accessToken);
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRefreshing = false;

// // Update the response interceptor in apiClient.js
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Skip refresh flow for these cases
//     if (
//       originalRequest.url.includes('/auth/refresh') ||
//       originalRequest.url.includes('/auth/login') ||
//       error.response?.status !== 401 ||
//       originalRequest._retry ||
//       isRefreshing
//     ) {
//       return Promise.reject(error);
//     }

//     // Set refreshing flag and retry marker
//     isRefreshing = true;
//     originalRequest._retry = true;

//     try {
//       const refreshResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
//         withCredentials: true
//       });

//       const { accessToken } = refreshResponse.data.data;
//       console.log('New access token received:', accessToken);
//       store.dispatch(setAccessToken({ accessToken }));
//       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      
//       return api(originalRequest);
//     } catch (refreshError) {
//       // Clear auth state on refresh failure
//       store.dispatch(logoutUser());
      
//       // Only redirect if we're not already on login page
//       if (window.location.pathname !== '/login') {
//         window.location.href = '/login';
//       }
      
//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;
    
// //     // Skip refresh flow for these cases
// //     if (
// //       originalRequest.url.includes('/auth/refresh') || 
// //       originalRequest.url.includes('/auth/login') ||
// //       error.response?.status !== 401 ||
// //       originalRequest._retry
// //     ) {
// //       return Promise.reject(error);
// //     }

// //     originalRequest._retry = true;

// //     try {
// //       // Attempt to refresh token
// //       const refreshResponse = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
// //         withCredentials: true
// //       });

// //       const { accessToken } = refreshResponse.data.data;
      
// //       // Update store with new token
// //       store.dispatch(setAccessToken({ accessToken }));
      
// //       // Retry original request with new token
// //       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
// //       return api(originalRequest);
// //     } catch (refreshError) {
// //       // Refresh failed - logout user
// //       store.dispatch(logoutUser());
// //       return Promise.reject(refreshError);
// //     }
// //   }
// // );

// export default api; 