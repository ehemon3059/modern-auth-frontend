// ===== src/pages/public/VerifyEmail.jsx =====
/**
 * VerifyEmail Page Component
 * Handles email verification using token from URL
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Loading from '../../components/common/Loading';

/**
 * VerifyEmail component
 * Verifies user email using token from URL parameters
 */
const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Component state
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'success', 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    /**
     * Verify email with token
     */
    const verifyEmail = async () => {
      try {
        if (!token) {
          setVerificationStatus('error');
          setMessage('Invalid verification link. No token provided.');
          return;
        }

        // Call email verification API
        const response = await authService.verifyEmail(token);
        
        if (response.success) {
          setVerificationStatus('success');
          setMessage(response.message || 'Email verified successfully! You can now login.');
          
          // Start countdown for redirect
          startCountdown();
        } else {
          setVerificationStatus('error');
          setMessage(response.message || 'Failed to verify email.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage(
          error.response?.data?.message || 
          'Failed to verify email. The link may be invalid or expired.'
        );
      }
    };

    verifyEmail();
  }, [token]);

  /**
   * Start countdown before redirecting to login
   */
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  /**
   * Render loading state while verifying
   */
  if (verificationStatus === 'pending') {
    return (
      <div className="verify-email-page">
        <Loading 
          text="Verifying your email..." 
          fullScreen 
        />
      </div>
    );
  }

  /**
   * Render success or error state
   */
  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        {/* Email verification icon */}
        <div className="verify-email-icon">
          {verificationStatus === 'success' ? (
            <div className="success-icon">✓</div>
          ) : (
            <div className="error-icon">✕</div>
          )}
        </div>

        {/* Title */}
        <h1 className="verify-email-title">
          {verificationStatus === 'success' ? 'Email Verified!' : 'Verification Failed'}
        </h1>

        {/* Alert message */}
        <Alert 
          type={verificationStatus === 'success' ? 'success' : 'error'} 
          message={message} 
        />

        {/* Actions based on status */}
        <div className="verify-email-actions">
          {verificationStatus === 'success' ? (
            <>
              <p className="redirect-message">
                Redirecting to login in {countdown} seconds...
              </p>
              <Link to="/login">
                <Button variant="primary" fullWidth>
                  Go to Login Now
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="error-actions">
                <Link to="/login">
                  <Button variant="primary" fullWidth>
                    Go to Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" fullWidth>
                    Register Again
                  </Button>
                </Link>
              </div>
              <p className="help-text">
                If you continue to have problems, please contact support.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;