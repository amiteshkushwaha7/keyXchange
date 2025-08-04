import api from '../../utils/apiClient';

const orderAPI = {
  createOrderAPI: async (data) => {
    const res = await api.post('/orders/create', data);
    return res.data;
  },

  verifyPaymentAPI: async (data) => {
    const res = await api.post('/orders/verify-payment', data);
    return res.data;
  },
  
  deleteOrderAPI: async (id) => {
    const res = await api.delete(`/orders/${id}`);
    return res.data;
  },  
  
  getMyOrdersAPI: async () => { 
    const res = await api.get('/orders/my-orders');
    return res.data;
  },
}

export default orderAPI;