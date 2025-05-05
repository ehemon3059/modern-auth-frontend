// ===== src/pages/NotFound.jsx =====
/**
 * NotFound Page Component
 * Displays 404 error page for invalid routes
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * NotFound component
 * Shows 404 error message with navigation options
 */
const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-actions">
          <Link to="/">
            <Button variant="primary">
              Go to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;