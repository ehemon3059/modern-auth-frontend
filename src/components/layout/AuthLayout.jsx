// ===== src/components/layout/AuthLayout.jsx =====
/**
 * Authentication Layout Component
 * Simplified layout for authentication pages
 */

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import logo from '../../assets/ehwebdev.png'; // Import your logo image

/**
 * AuthLayout component
 * Contains only the authentication content
 */
const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Logo and app name */}
        <div className="auth-header">
          <img src={logo} alt="App Logo" className="auth-logo" />
          <h1>Modern Auth</h1>
        </div>
        
        {/* Authentication content */}
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;