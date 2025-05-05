/**
 * Two-Factor Authentication Component
 * Handles 2FA verification during login
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import authService from '../../services/authService';

/**
 * TwoFactorForm component
 * Verifies 2FA code during login process
 */
const TwoFactorForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if no userId provided
  if (!userId) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.verify2FA({
        userId,
        token: code
      });
      
      // Store access token and navigate to dashboard
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || '2FA verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="two-factor-form">
      <h2>Two-Factor Authentication</h2>
      <p className="subtitle">Enter the 6-digit code from your authenticator app</p>
      
      {error && <Alert type="error" message={error} />}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="code"
          label="Authentication Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          pattern="[0-9]*"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>
      
      <div className="back-link">
        <button 
          onClick={() => navigate('/login')}
          className="link-button"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
};

export default TwoFactorForm;