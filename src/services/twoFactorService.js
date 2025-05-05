// ===== src/services/twoFactorService.js =====
/**
 * Two Factor Authentication Service
 * Handles all 2FA-related API calls
 */

import api from './api';

const twoFactorService = {
  /**
   * Generate 2FA secret and QR code
   * @returns {Promise} - API response with secret and QR code
   */
  generate: async () => {
    const response = await api.post('/2fa/generate');
    return response.data;
  },

  /**
   * Verify 2FA token during setup or login
   * @param {Object} data - Verification data
   * @param {string} [data.userId] - User ID (for login verification)
   * @param {string} data.token - 6-digit verification code
   * @param {string} [data.secret] - Secret (for setup verification)
   * @returns {Promise} - API response
   */
  verify: async (data) => {
    const response = await api.post('/2fa/verify', data);
    
    // If login verification successful, store access token
    if (data.userId && response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Enable 2FA for user account
   * @param {Object} data - Enable 2FA data
   * @param {string} data.secret - 2FA secret
   * @param {string} data.token - Verification token
   * @returns {Promise} - API response
   */
  enable: async (data) => {
    const response = await api.put('/2fa/enable', data);
    return response.data;
  },

  /**
   * Disable 2FA for user account
   * @param {Object} data - Disable 2FA data
   * @param {string} data.password - User password for confirmation
   * @returns {Promise} - API response
   */
  disable: async (data) => {
    const response = await api.put('/2fa/disable', data);
    return response.data;
  },

  /**
   * Check 2FA status for user
   * @returns {Promise} - API response with 2FA status
   */
  getStatus: async () => {
    const response = await api.get('/2fa/status');
    return response.data;
  },

  /**
   * Generate backup codes for 2FA
   * @returns {Promise} - API response with backup codes
   */
  generateBackupCodes: async () => {
    const response = await api.post('/2fa/backup-codes');
    return response.data;
  },

  /**
   * Get current backup codes
   * @returns {Promise} - API response with backup codes
   */
  getBackupCodes: async () => {
    const response = await api.get('/2fa/backup-codes');
    return response.data;
  },

  /**
   * Use a backup code for authentication
   * @param {Object} data - Backup code data
   * @param {string} data.code - Backup code
   * @param {string} data.userId - User ID
   * @returns {Promise} - API response
   */
  useBackupCode: async (data) => {
    const response = await api.post('/2fa/backup-codes/use', data);
    
    // If verification successful, store access token
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Regenerate backup codes (invalidate old ones)
   * @returns {Promise} - API response with new backup codes
   */
  regenerateBackupCodes: async () => {
    const response = await api.post('/2fa/backup-codes/regenerate');
    return response.data;
  },

  /**
   * Set up TOTP authenticator app
   * @returns {Promise} - API response with setup instructions
   */
  setupTOTP: async () => {
    const response = await api.post('/2fa/totp/setup');
    return response.data;
  },

  /**
   * Verify TOTP setup
   * @param {Object} data - TOTP verification data
   * @param {string} data.secret - TOTP secret
   * @param {string} data.token - 6-digit code from authenticator app
   * @returns {Promise} - API response
   */
  verifyTOTP: async (data) => {
    const response = await api.post('/2fa/totp/verify', data);
    return response.data;
  },

  /**
   * Send SMS verification code (if SMS 2FA is enabled)
   * @param {Object} data - SMS request data
   * @param {string} data.phoneNumber - Phone number to send SMS to
   * @returns {Promise} - API response
   */
  sendSMSCode: async (data) => {
    const response = await api.post('/2fa/sms/send', data);
    return response.data;
  },

  /**
   * Verify SMS code (if SMS 2FA is enabled)
   * @param {Object} data - SMS verification data
   * @param {string} data.userId - User ID
   * @param {string} data.code - 6-digit SMS code
   * @returns {Promise} - API response
   */
  verifySMSCode: async (data) => {
    const response = await api.post('/2fa/sms/verify', data);
    
    // If verification successful, store access token
    if (response.data.success && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  },

  /**
   * Get 2FA settings and available methods
   * @returns {Promise} - API response with 2FA settings
   */
  getSettings: async () => {
    const response = await api.get('/2fa/settings');
    return response.data;
  },

  /**
   * Update 2FA settings
   * @param {Object} settings - 2FA settings to update
   * @returns {Promise} - API response
   */
  updateSettings: async (settings) => {
    const response = await api.put('/2fa/settings', settings);
    return response.data;
  },

  /**
   * Get recovery options for lost 2FA access
   * @returns {Promise} - API response with recovery options
   */
  getRecoveryOptions: async () => {
    const response = await api.get('/2fa/recovery');
    return response.data;
  },

  /**
   * Initiate 2FA recovery process
   * @param {Object} data - Recovery request data
   * @param {string} data.email - Email for recovery
   * @param {string} data.method - Recovery method
   * @returns {Promise} - API response
   */
  initiateRecovery: async (data) => {
    const response = await api.post('/2fa/recovery/initiate', data);
    return response.data;
  },

  /**
   * Complete 2FA recovery process
   * @param {Object} data - Recovery completion data
   * @param {string} data.token - Recovery token
   * @param {string} data.email - Recovery email
   * @returns {Promise} - API response
   */
  completeRecovery: async (data) => {
    const response = await api.post('/2fa/recovery/complete', data);
    return response.data;
  },

  /**
   * Get trusted devices for 2FA
   * @returns {Promise} - API response with trusted devices
   */
  getTrustedDevices: async () => {
    const response = await api.get('/2fa/trusted-devices');
    return response.data;
  },

  /**
   * Trust current device (skip 2FA for this device)
   * @param {Object} data - Trust device data
   * @param {string} data.deviceName - Name for the device
   * @returns {Promise} - API response
   */
  trustDevice: async (data) => {
    const response = await api.post('/2fa/trusted-devices', data);
    return response.data;
  },

  /**
   * Remove trusted device
   * @param {string} deviceId - Device ID to remove
   * @returns {Promise} - API response
   */
  removeTrustedDevice: async (deviceId) => {
    const response = await api.delete(`/2fa/trusted-devices/${deviceId}`);
    return response.data;
  }
};

export default twoFactorService;