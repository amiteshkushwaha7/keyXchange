import api from '../../utils/apiClient';

const productAPI = {

  getAllProductsAPI: async (params = {}) => {
    const res = await api.get('/products', { params });
    return res.data; 
  },

  getProductByIdAPI: async (id) => { 
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
 
  createProductAPI: async (data) => {
    const res = await api.post('/products/create', data);
    return res.data;
  }, 

  updateProductAPI: async ({ id, data }) => {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  },

  deleteProductAPI: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },

  getSimilarProducts: async (id) => {
    const res = await api.get(`/products/${id}/similar`);
    return res.data;
  },

  searchProducts: async (params = {}) => {
    const res = await api.get(`/products/search`, { params });
    return res.data;
  }
};

export default productAPI; 