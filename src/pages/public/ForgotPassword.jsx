/**
 * Forgot Password Page Component
 * Handles password reset request
 */

import React, { useState } from 'react';
import authService from '../../services/authService';
import useForm from '../../hooks/useForm';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { Link } from 'react-router-dom';


/**
 * ForgotPassword component
 * Allows users to request password reset email
 */
const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling
  const { formData, handleChange, handleSubmit, errors } = useForm(
    {
      email: ''
    },
    // Validation
    (data) => {
      const newErrors = {};
      
      if (!data.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      return newErrors;
    },
    // Submit handler
    async (data) => {
      try {
        setIsLoading(true);
        setError(null);
        
        await authService.forgotPassword(data.email);
        
        setSuccess('Password reset instructions sent to your email');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to send reset instructions');
      } finally {
        setIsLoading(false);
      }
    }
  );

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter your email address and we'll send you instructions to reset your password
        </p>
        
        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}
        
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
        </form>
        
        <div className="back-link">
          <Link to="/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;