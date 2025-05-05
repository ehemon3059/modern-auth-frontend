// ===== src/services/userService.js =====
/**
 * User Service
 * Handles all user-related API calls
 */

import api from './api';

const userService = {
  /**
   * Get current user profile
   * @returns {Promise} - API response with user data
   */
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - API response with updated user data
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  /**
   * Change user password
   * @param {Object} passwordData - Current and new password
   * @returns {Promise} - API response
   */
  changePassword: async (passwordData) => {
    const response = await api.put('/users/password', passwordData);
    return response.data;
  },

  /**
   * Upload user avatar
   * @param {File} file - Avatar image file
   * @returns {Promise} - API response with avatar URL
   */
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete user avatar
   * @returns {Promise} - API response
   */
  deleteAvatar: async () => {
    const response = await api.delete('/users/avatar');
    return response.data;
  },

  /**
   * Get user's activity log
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response with activity data
   */
  getActivity: async (params = {}) => {
    const response = await api.get('/users/activity', { params });
    return response.data;
  },

  /**
   * Update user preferences
   * @param {Object} preferences - User preferences
   * @returns {Promise} - API response
   */
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  /**
   * Get user's connected accounts (social logins)
   * @returns {Promise} - API response with connected accounts
   */
  getConnectedAccounts: async () => {
    const response = await api.get('/users/connected-accounts');
    return response.data;
  },

  /**
   * Disconnect a social account
   * @param {string} provider - Social provider (google, facebook, etc.)
   * @returns {Promise} - API response
   */
  disconnectAccount: async (provider) => {
    const response = await api.delete(`/users/connected-accounts/${provider}`);
    return response.data;
  },

  /**
   * Delete user account
   * @param {Object} data - Confirmation data (password)
   * @returns {Promise} - API response
   */
  deleteAccount: async (data) => {
    const response = await api.delete('/users/account', { data });
    return response.data;
  },

  /**
   * Export user data
   * @returns {Promise} - API response with user data
   */
  exportData: async () => {
    const response = await api.get('/users/export');
    return response.data;
  },

  /**
   * Subscribe to notifications
   * @param {Object} subscription - Subscription data
   * @returns {Promise} - API response
   */
  subscribeToNotifications: async (subscription) => {
    const response = await api.post('/users/subscribe', subscription);
    return response.data;
  },

  /**
   * Unsubscribe from notifications
   * @param {string} endpoint - Subscription endpoint
   * @returns {Promise} - API response
   */
  unsubscribeFromNotifications: async (endpoint) => {
    const response = await api.post('/users/unsubscribe', { endpoint });
    return response.data;
  },

  /**
   * Get notification preferences
   * @returns {Promise} - API response with notification settings
   */
  getNotificationPreferences: async () => {
    const response = await api.get('/users/notification-preferences');
    return response.data;
  },

  /**
   * Update notification preferences
   * @param {Object} preferences - Notification preferences
   * @returns {Promise} - API response
   */
  updateNotificationPreferences: async (preferences) => {
    const response = await api.put('/users/notification-preferences', preferences);
    return response.data;
  },

  /**
   * Request account verification
   * @param {Object} data - Verification data
   * @returns {Promise} - API response
   */
  requestVerification: async (data) => {
    const response = await api.post('/users/request-verification', data);
    return response.data;
  },

  /**
   * Get user dashboard stats
   * @returns {Promise} - API response with dashboard data
   */
  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard-stats');
    return response.data;
  },

  /**
   * Update user role (admin only)
   * @param {string} userId - User ID
   * @param {string} role - New role
   * @returns {Promise} - API response
   */
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
  },

  /**
   * Get all users (admin only)
   * @param {Object} params - Query parameters (page, limit, search, etc.)
   * @returns {Promise} - API response with users list
   */
  getAllUsers: async (params = {}) => {
    const response = await api.get('/users/all', { params });
    return response.data;
  },

  /**
   * Get user by ID (admin only)
   * @param {string} userId - User ID
   * @returns {Promise} - API response with user data
   */
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update user status (admin only)
   * @param {string} userId - User ID
   * @param {Object} status - Status data (active, banned, etc.)
   * @returns {Promise} - API response
   */
  updateUserStatus: async (userId, status) => {
    const response = await api.put(`/users/${userId}/status`, status);
    return response.data;
  },

  /**
   * Search users (admin only)
   * @param {Object} searchParams - Search parameters
   * @returns {Promise} - API response with search results
   */
  searchUsers: async (searchParams) => {
    const response = await api.post('/users/search', searchParams);
    return response.data;
  },

  /**
   * Get user sessions
   * @returns {Promise} - API response with active sessions
   */
  getUserSessions: async () => {
    const response = await api.get('/users/sessions');
    return response.data;
  },

  /**
   * Terminate session
   * @param {string} sessionId - Session ID to terminate
   * @returns {Promise} - API response
   */
  terminateSession: async (sessionId) => {
    const response = await api.delete(`/users/sessions/${sessionId}`);
    return response.data;
  },

  /**
   * Terminate all sessions
   * @returns {Promise} - API response
   */
  terminateAllSessions: async () => {
    const response = await api.delete('/users/sessions/all');
    return response.data;
  }
};

export default userService;