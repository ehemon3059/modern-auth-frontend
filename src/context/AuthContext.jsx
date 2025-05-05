/**
 * Authentication Context
 * Provides authentication state and methods to the entire application
 */

import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create the auth context
export const AuthContext = createContext(null);

/**
 * AuthProvider component
 * Manages authentication state and provides methods to components
 */
export const AuthProvider = ({ children }) => {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already logged in
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        // Clear any invalid tokens
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   * Authenticates user with email and password
   */
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      
      // Check if 2FA is required
      if (response.requiresTwoFactor) {
        return { requiresTwoFactor: true, userId: response.userId };
      }

      // Set user and authentication state
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  /**
   * Register function
   * Creates a new user account
   */
  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  /**
   * Logout function
   * Logs out the current user
   */
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    // Add more auth methods as needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};