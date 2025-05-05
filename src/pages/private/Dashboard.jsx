/**
 * Dashboard Page Component
 * Main user dashboard after authentication
 */

import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

/**
 * Dashboard component
 * Displays user information and quick actions
 */
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p className="subtitle">Here's an overview of your account</p>
      </header>
      
      <div className="dashboard-content">
        {/* User profile card */}
        <Card title="Your Profile" className="profile-card">
          <div className="profile-info">
            <img 
              src={user?.profile?.avatar || '/images/default-avatar.png'} 
              alt={user?.name} 
              className="profile-avatar"
            />
            <div className="profile-details">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <p className="user-role">Role: {user?.role}</p>
            </div>
          </div>
          
          <div className="card-actions">
            <Link to="/profile">
              <Button variant="outline">View Profile</Button>
            </Link>
          </div>
        </Card>
        
        {/* Security status card */}
        <Card title="Security Status" className="security-card">
          <ul className="security-status">
            <li className={`status-item ${user?.isEmailVerified ? 'verified' : 'unverified'}`}>
              <span className="status-icon">
                {user?.isEmailVerified ? '✓' : '!'}
              </span>
              <span className="status-text">
                Email: {user?.isEmailVerified ? 'Verified' : 'Not verified'}
              </span>
            </li>
            
            <li className={`status-item ${user?.twoFactorEnabled ? 'enabled' : 'disabled'}`}>
              <span className="status-icon">
                {user?.twoFactorEnabled ? '✓' : '!'}
              </span>
              <span className="status-text">
                2FA: {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </li>
          </ul>
          
          <div className="card-actions">
            <Link to="/settings">
              <Button variant="outline">Security Settings</Button>
            </Link>
          </div>
        </Card>
        
        {/* Quick actions card */}
        <Card title="Quick Actions" className="actions-card">
          <div className="action-buttons">
            <Link to="/profile">
              <Button variant="outline">Update Profile</Button>
            </Link>
            <Link to="/settings/security">
              <Button variant="outline">Change Password</Button>
            </Link>
            {!user?.twoFactorEnabled && (
              <Link to="/settings/security">
                <Button variant="outline">Enable 2FA</Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;