import api from './axiosInstance';

const ProductClient = {
  getTutorials(limit, skip) {
    const params = {};
    if (limit != null) params.limit = limit;
    if (skip != null) params.skip = skip;
    return api.get('/api/products', { params });
  },

  getTutorialById(id) {
    return api.get(`/api/products/${id}`);
  },
};

export default ProductClient;
