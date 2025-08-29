import api from '../../utils/apiClient';

const contactAPI = {
  submitContactFormAPI: async (data) => {
    const res = await api.post('/contact/submit', data);
    return res.data;
  },

  submitBugReportAPI: async (data) => {
    const res = await api.post('/contact/bug-report/submit', data);
    return res.data;
  },

  getAllContactsAPI: async () => {
    const res = await api.get('/contact');
    return res.data;
  },

  getContactByIdAPI: async (id) => {
    const res = await api.get(`/contact/${id}`);
    return res.data;
  },

  updateContactAPI: async (id) => {
    const res = await api.put(`/contact/${id}`);
    return res.data;
  },

  deleteContactAPI: async (id) => {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  },

  deleteAllContactsAPI: async () => {
    const res = await api.delete('/contact');
    return res.data;
  }

};

export default contactAPI; 