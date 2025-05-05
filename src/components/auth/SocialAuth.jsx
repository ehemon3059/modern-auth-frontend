// ===== src/components/auth/SocialAuth.jsx =====
/**
 * Social Authentication Component
 * Provides social login buttons for Google and Facebook
 */

import React from 'react';
import Button from '../common/Button';

/**
 * SocialAuth component
 * Displays social login options with proper branding
 */
const SocialAuth = () => {
  /**
   * Handle Google login
   * Redirects to the backend Google OAuth endpoint
   */
  const handleGoogleLogin = () => {
    // Store the current location to redirect back after login
    sessionStorage.setItem('loginRedirect', window.location.pathname);
    
    // Redirect to Google OAuth endpoint
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${apiUrl}/auth/google`;
  };

  /**
   * Handle Facebook login
   * Redirects to the backend Facebook OAuth endpoint
   */
  const handleFacebookLogin = () => {
    // Store the current location to redirect back after login
    sessionStorage.setItem('loginRedirect', window.location.pathname);
    
    // Redirect to Facebook OAuth endpoint
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${apiUrl}/auth/facebook`;
  };

  return (
    <div className="social-auth">
      {/* Separator with "or" text */}
      <div className="divider">
        <span>Or continue with</span>
      </div>
      
      {/* Social login buttons */}
      <div className="social-buttons">
        {/* Google login button */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          fullWidth
          className="google-btn"
        >
          <img 
            src="/images/social/google.svg" 
            alt="Google" 
            className="social-icon" 
          />
          Login with Google
        </Button>
        
        {/* Facebook login button */}
        <Button
          onClick={handleFacebookLogin}
          variant="outline"
          fullWidth
          className="facebook-btn"
        >
          <img 
            src="/images/social/facebook.svg" 
            alt="Facebook" 
            className="social-icon" 
          />
          Login with Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;