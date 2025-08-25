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
};

export default contactAPI;