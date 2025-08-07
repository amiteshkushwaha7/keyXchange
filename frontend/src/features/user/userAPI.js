import api from '../../utils/apiClient';

const userAPI = {
  
  
  getProfileAPI: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  updateProfileAPI: async (data) => {
    const res = await api.put('/users/me', data);
    return res.data; 
  },

  deleteAddressAPI: async (id) => {
    const res = await api.delete(`/users/me/addresses/${id}`);
    return res.data;
  }
};

export default userAPI;