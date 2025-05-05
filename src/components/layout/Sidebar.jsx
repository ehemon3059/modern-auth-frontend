/**
 * Sidebar Component
 * Side navigation for authenticated users
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * Sidebar component
 * Contains navigation links for authenticated users
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      {/* Sidebar content */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* User section */}
        <div className="sidebar-user">
          <img 
            src={user?.profile?.avatar || '/images/default-avatar.png'} 
            alt={user?.name} 
            className="sidebar-avatar"
          />
          <h3 className="sidebar-username">{user?.name}</h3>
          <p className="sidebar-email">{user?.email}</p>
        </div>
        
        {/* Navigation sections */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-section-title">Settings</h4>
            <ul className="nav-links">
              <li>
                <Link 
                  to="/settings" 
                  className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="nav-icon">⚙️</span>
                  Settings
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings/security" 
                  className={`nav-link ${isActive('/settings/security') ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span className="nav-icon">🔒</span>
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;