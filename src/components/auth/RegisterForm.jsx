// ===== src/components/auth/RegisterForm.jsx =====
/**
 * Registration Form Component
 * Handles new user account creation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

/**
 * RegisterForm component
 * Provides user registration functionality with validation
 */
const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling with custom hook
  const { formData, handleChange, handleSubmit, errors } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    // Validation rules
    (data) => {
      const newErrors = {};
      
      // Name validation
      if (!data.name) {
        newErrors.name = 'Name is required';
      }
      
      // Email validation
      if (!data.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      // Password validation
      if (!data.password) {
        newErrors.password = 'Password is required';
      } else if (data.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      
      // Confirm password validation
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
        
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...registrationData } = data;
        
        await register(registrationData);
        
        // Show success message and redirect to login
        alert('Registration successful! Please check your email for verification.');
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      } finally {
        setIsLoading(false);
      }
    }
  );

  return (
    <div className="register-form">
      <h2>Create Account</h2>
      <p className="subtitle">Join us today!</p>
      
      {error && <Alert type="error" message={error} />}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          autoComplete="name"
        />
        
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
          autoComplete="new-password"
        />
        
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
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
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;