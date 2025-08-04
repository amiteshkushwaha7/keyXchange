import api from '../../utils/apiClient';
 
const adminAPI = {
  // Dashboard
  getDashboardStatsAPI: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },

  // Products
  getAllProductsAPI: async (params = {}) => {
    const res = await api.get('/admin/products', { params }); 
    return res.data;
  },

  getProductByIdAPI: async (id) => {
    const res = await api.get(`/admin/products/${id}`);
    return res.data;
  },

  createProductAPI: async (data) => {
    const res = await api.post('/admin/products/new', data);
    return res.data;
  },

  updateProductAPI: async ({ id, data }) => {
    const res = await api.put(`/admin/products/${id}`, data);
    return res.data;
  },

  deleteProductAPI: async (id) => {
    const res = await api.delete(`/admin/products/${id}`);
    return res.data;
  },

  searchProducts: async (params = {}) => {
    const res = await api.get('/admin/products/search', { params });
    return res.data;
  },

  // Orders
  getAllOrdersAPI: async (params = {}) => {
    const res = await api.get('/admin/orders', { params });
    return res.data;
  },

  getOrderByIdAPI: async (id) => {
    const res = await api.get(`/admin/orders/${id}`);
    return res.data;
  }, 

  updateOrderAPI: async ({ id, data }) => {
    const res = await api.put(`/admin/orders/${id}`, data);
    return res.data;
  },  

  deleteOrderAPI: async (id) => {
    const res = await api.delete(`/admin/orders/${id}`);
    return res.data; 
  },

  updateOrderStatusAPI: async ({ id, status }) => {
    const res = await api.patch(`/admin/orders/${id}/status`, { status });
    return res.data;
  },

  // Customers
  getAllCustomersAPI: async (params = {}) => {
    const res = await api.get('/admin/customers', { params });
    return res.data;
  },

  getCustomerByIdAPI: async (id) => {
    const res = await api.get(`/admin/customers/${id}`);
    return res.data;
  },

  // Users
  getAllUsersAPI: async (params = {}) => {
    const res = await api.get('/admin/users', { params });
    return res.data;
  },

  getUserByIdAPI: async (id) => {
    const res = await api.get(`/admin/users/${id}`);
    return res.data;
  },
};

export default adminAPI;