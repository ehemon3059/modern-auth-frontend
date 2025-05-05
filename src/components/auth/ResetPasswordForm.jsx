/**
 * Password Reset Form Component
 * Handles password reset with token from email
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import authService from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

/**
 * ResetPasswordForm component
 * Allows users to set a new password using a reset token
 */
const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling with custom hook
  const { formData, handleChange, handleSubmit, errors } = useForm(
    {
      password: '',
      confirmPassword: ''
    },
    // Validation rules
    (data) => {
      const newErrors = {};
      
      if (!data.password) {
        newErrors.password = 'Password is required';
      } else if (data.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      
      if (data.password !== data.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      return newErrors;
    },
    // Submit handler
    async (data) => {
      try {
        setIsLoading(true);
        setError(null);
        
        await authService.resetPassword(token, data.password);
        
        alert('Password reset successful! Please login with your new password.');
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Password reset failed');
      } finally {
        setIsLoading(false);
      }
    }
  );

  if (!token) {
    return (
      <div className="reset-password-form">
        <Alert type="error" message="Invalid password reset link" />
      </div>
    );
  }

  return (
    <div className="reset-password-form">
      <h2>Reset Your Password</h2>
      <p className="subtitle">Enter your new password</p>
      
      {error && <Alert type="error" message={error} />}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="password"
          label="New Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="new-password"
        />
        
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
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting password...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;