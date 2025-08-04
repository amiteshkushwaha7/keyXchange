import api from '../../utils/apiClient';

const userAPI = {
  // User Profile
  getProfileAPI: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  updateProfileAPI: async (data) => {
    const res = await api.put('/users/me', data);
    return res.data;
  },

  updatePasswordAPI: async (data) => {
    const res = await api.patch('/users/me/password', data);
    return res.data;
  },

  // User Orders
  getMyOrdersAPI: async () => {
    const res = await api.get('/users/me/orders');
    return res.data;
  },

  getOrderDetailsAPI: async (id) => {
    const res = await api.get(`/users/me/orders/${id}`);
    return res.data;
  },

  // User Addresses
  getAddressesAPI: async () => {
    const res = await api.get('/users/me/addresses');
    return res.data;
  },

  addAddressAPI: async (data) => {
    const res = await api.post('/users/me/addresses', data);
    return res.data;
  },

  updateAddressAPI: async ({ id, data }) => {
    const res = await api.put(`/users/me/addresses/${id}`, data);
    return res.data; 
  },

  deleteAddressAPI: async (id) => {
    const res = await api.delete(`/users/me/addresses/${id}`);
    return res.data;
  }
};

export default userAPI;