import api from './axiosInstance';

const ProductClient = {
  getProducts(limit, skip) {
    const params = {};
    if (limit != null) params.limit = limit;
    if (skip != null) params.skip = skip;
    return api.get('/api/products', { params });
  },

  getProductById(id) {
    return api.get(`/api/products/${id}`);
  },

  createProduct(data) {
    return api.post('/api/products', data);
  },

  updateProduct(id, data) {
    return api.put(`/api/products/${id}`, data);
  },

  deleteProduct(id) {
    return api.delete(`/api/products/${id}`);
  },
};

export default ProductClient;
