import api from './api';
import { parseJwt } from '@/utils/jwt'; // Import the function

export default {
  async login(email, password) {
    try {
      const response = await api.post('auth/login', { email, password });
      if (response.data && response.data.access_token) {
        const decodedToken = parseJwt(response.data.access_token);
        
        localStorage.setItem('authToken', response.data.access_token);
        
        return {
          token: response.data.access_token,
          ...decodedToken
        };
      }
      return null;
    } catch (error) {
      console.error('Login failed', error);
      return null;
    }
  },

  async logout() {
    localStorage.removeItem('authToken');
  },
};
