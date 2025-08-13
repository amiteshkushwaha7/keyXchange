import api from '../../utils/apiClient';
import { getProfile } from './authSlice';

const authAPI = {
  registerAPI: async (data) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  loginAPI: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
 
  logoutAPI: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },

  loadUserAPI: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  }, 

  refreshAPI: async () => {
    const res = await api.get('/auth/refresh');
    return res.data;
  }, 

  forgotPasswordAPI: async (email) => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  updatePasswordAPI: async (data) => {
    const res = await api.patch('/auth/update-password', data);
    return res.data; 
  }, 

  resetPasswordAPI: async ({ token, password, confirmPassword }) => {
    const res = await api.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword
    });
    return res.data;
  },

  updateProfileAPI: async (data) => {
    const res = await api.put('/auth/update-profile', data);
    return res.data;
  },

  deleteAccountAPI: async () => {
    const res = await api.delete('/auth/delete-account');
    return res.data;
  },

  getProfileAPI: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  }
};

export default authAPI;