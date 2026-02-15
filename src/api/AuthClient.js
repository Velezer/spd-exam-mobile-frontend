import api from './axiosInstance';

const AuthClient = {
  login(data) {
    return api.post('/api/auth/login', data);
  },

  register(data) {
    return api.post('/api/auth/register', data);
  },

  getProfile() {
    return api.get('/api/auth/me');
  },
};

export default AuthClient;
