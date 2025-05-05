// ===== src/components/profile/PasswordChange.jsx =====
/**
 * PasswordChange Component
 * Handles password change functionality
 */

import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';
import authService from '../../services/authService';

/**
 * PasswordChange component
 * Provides form to change user password
 */
const PasswordChange = () => {
  // Form state
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Check if new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setSuccess('Password changed successfully. You will be logged out shortly.');
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Logout user after 3 seconds
      setTimeout(() => {
        authService.logout();
        window.location.href = '/login';
      }, 3000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setErrors(prev => ({
          ...prev,
          currentPassword: 'Current password is incorrect'
        }));
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Change Password" className="password-change-card">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit} className="password-change-form">
        <div className="form-group">
          <Input
            type="password"
            name="currentPassword"
            label="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-group">
          <Input
            type="password"
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            required
            autoComplete="new-password"
          />
          <small className="form-hint">
            Password must be at least 8 characters long
          </small>
        </div>

        <div className="form-group">
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-actions">
          <Button 
            type="submit" 
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>

      {/* Security reminder */}
      <div className="security-reminder">
        <h4>Security Tips:</h4>
        <ul>
          <li>Use a strong password with a mix of letters, numbers, and symbols</li>
          <li>Don't reuse passwords from other accounts</li>
          <li>Consider using a password manager</li>
          <li>Change your password regularly</li>
        </ul>
      </div>
    </Card>
  );
};

export default PasswordChange;