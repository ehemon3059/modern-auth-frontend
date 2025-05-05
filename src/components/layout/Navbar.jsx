// ===== src/components/layout/Navbar.jsx =====
/**
 * Navigation Bar Component
 * Top navigation with logo, links, and user menu
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';

/**
 * Navbar component
 * Contains site navigation and user controls
 */
const Navbar = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left section */}
        <div className="navbar-left">
          {/* Mobile menu toggle (only for authenticated users) */}
          {isAuthenticated && (
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="menu-icon"></span>
            </button>
          )}
          
          {/* Logo and app name */}
          <Link to="/" className="navbar-brand">
            <img src="/images/logo.png" alt="Logo" className="brand-logo" />
            <span className="brand-name">Modern Auth</span>
          </Link>
        </div>
        
        {/* Center section */}
        <div className="navbar-center">
          <ul className="navbar-nav">
            <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {isAuthenticated && (
              <li className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        
        {/* Right section */}
        <div className="navbar-right">
          {isAuthenticated ? (
            /* User menu for authenticated users */
            <div className="user-menu">
              <button
                className="user-menu-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img 
                  src={user?.profile?.avatar || '/images/default-avatar.png'} 
                  alt={user?.name} 
                  className="user-avatar"
                />
                <span className="user-name">{user?.name}</span>
                <span className="menu-arrow">▼</span>
              </button>
              
              {userMenuOpen && (
                <div className="user-dropdown">
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="dropdown-divider" />
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-item logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Authentication buttons for guests */
            <div className="auth-buttons">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;