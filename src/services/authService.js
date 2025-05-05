/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import api from './api';

const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Login user with credentials
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    
    // Store access token if login successful
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear token regardless of API response
      localStorage.removeItem('accessToken');
    }
  },

  /**
   * Get current user data
   */
  getCurrentUser: async () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) return null;
    
    try {
      const response = await api.get('/users/profile');
      return response.data.user;
    } catch (error) {
      // Token invalid or expired
      localStorage.removeItem('accessToken');
      return null;
    }
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  }
};

export default authService;