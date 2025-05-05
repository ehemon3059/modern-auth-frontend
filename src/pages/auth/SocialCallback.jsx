// ===== src/pages/auth/SocialCallback.jsx =====
/**
 * Social Authentication Callback Component
 * Handles the redirect after social authentication
 */

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';

/**
 * SocialCallback component
 * Processes the social authentication callback and handles token storage
 */
const SocialCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    /**
     * Process the social auth callback
     * Gets token from URL params and stores it
     */
    const processCallback = () => {
      // Get token from URL query parameter
      const token = searchParams.get('token');
      
      if (token) {
        // Store the access token
        localStorage.setItem('accessToken', token);
        
        // Get the original destination or default to dashboard
        const redirectPath = sessionStorage.getItem('loginRedirect') || '/dashboard';
        
        // Clear the stored redirect path
        sessionStorage.removeItem('loginRedirect');
        
        // Navigate to the intended destination
        navigate(redirectPath, { replace: true });
      } else {
        // No token found, redirect to login with error
        navigate('/login', { 
          replace: true,
          state: { error: 'Social login failed. Please try again.' }
        });
      }
    };

    processCallback();
  }, [navigate, searchParams]);

  // Show loading while processing the callback
  return (
    <div className="callback-page">
      <Loading 
        fullScreen 
        text="Processing login..." 
      />
    </div>
  );
};

export default SocialCallback;