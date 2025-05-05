// ===== src/pages/auth/Verify2FA.jsx =====
/**
 * Verify2FA Page Component
 * Handles two-factor authentication verification after login
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoFactorForm from '../../components/auth/TwoFactorForm';
import Alert from '../../components/common/Alert';

/**
 * Verify2FA component
 * Renders the 2FA verification form and manages the verification process
 */
const Verify2FA = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get userId from navigation state
  const { userId } = location.state || {};
  
  // Refs for managing component lifecycle
  const mounted = useRef(true);
  
  useEffect(() => {
    // Cleanup function to prevent state updates after unmount
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Redirect to login if no userId is provided
    if (!userId) {
      navigate('/login', { 
        replace: true,
        state: { 
          error: 'Authentication session expired. Please login again.' 
        }
      });
    }
  }, [userId, navigate]);

  // Don't render if no userId
  if (!userId) {
    return null;
  }

  return (
    <div className="verify-2fa-page">
      <div className="verify-2fa-container">
        {/* Header section */}
        <div className="verify-2fa-header">
          <h1 className="verify-2fa-title">Two-Factor Authentication</h1>
          <p className="verify-2fa-subtitle">
            Enter the 6-digit code from your authenticator app to complete login
          </p>
        </div>

        {/* Informational alert */}
        <Alert 
          type="info" 
          message="This additional step helps keep your account secure" 
        />

        {/* 2FA form */}
        <TwoFactorForm />

        {/* Help section */}
        <div className="verify-2fa-help">
          <details className="help-section">
            <summary>Having trouble?</summary>
            <div className="help-content">
              <h4>Can't access your authenticator app?</h4>
              <ul>
                <li>Make sure your device's time is synchronized</li>
                <li>Check if you're using the correct account in your authenticator</li>
                <li>Try refreshing the code if it's about to expire</li>
              </ul>
              <p>
                If you still can't access your account, please contact our support team.
              </p>
            </div>
          </details>
        </div>

        {/* Back to login link */}
        <div className="verify-2fa-footer">
          <button 
            onClick={() => navigate('/login')}
            className="back-to-login"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;