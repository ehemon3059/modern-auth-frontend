/*Login Form Component
 * Handles user authentication with email/password and social login options
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import SocialAuth from './SocialAuth';

/**
 * LoginForm component
 * Provides user login functionality with validation
 */
const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get the intended destination after login
  const from = location.state?.from?.pathname || '/dashboard';

  // Form handling with custom hook
  const { formData, handleChange, handleSubmit, errors } = useForm(
    {
      email: '',
      password: ''
    },
    // Validation rules
    (data) => {
      const newErrors = {};
      
      // Email validation
      if (!data.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      // Password validation
      if (!data.password) {
        newErrors.password = 'Password is required';
      }
      
      return newErrors;
    },
    // Submit handler
    async (data) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await login(data);
        
        // Check if 2FA is required
        if (response.requiresTwoFactor) {
          navigate('/verify-2fa', { state: { userId: response.userId } });
          return;
        }
        
        // Redirect to intended destination
        navigate(from, { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  );

  return (
    <div className="login-form">
      <h2>Welcome Back</h2>
      <p className="subtitle">Please login to your account</p>
      
      {error && <Alert type="error" message={error} />}
      
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
        
        <Input
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="current-password"
        />
        
        <div className="form-options">
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <SocialAuth />
      
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;