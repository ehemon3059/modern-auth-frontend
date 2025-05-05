// ===== src/components/profile/Security.jsx =====
/**
 * Security Component
 * Displays security settings and status for user account
 */

import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import TwoFactorSetup from './TwoFactorSetup';
import PasswordChange from './PasswordChange';

/**
 * Security component
 * Provides an overview of account security settings
 */
const Security = ({ user }) => {
  return (
    <div className="security-container">
      {/* Security overview card */}
      <Card title="Security Overview" className="security-overview">
        <div className="security-grid">
          {/* Email verification status */}
          <div className="security-item">
            <div className="security-item-header">
              <h4>Email Verification</h4>
              <span className={`status-badge ${user?.isEmailVerified ? 'verified' : 'unverified'}`}>
                {user?.isEmailVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            <p className="security-item-description">
              {user?.isEmailVerified 
                ? 'Your email has been verified.' 
                : 'Please verify your email for added security.'}
            </p>
            {!user?.isEmailVerified && (
              <Button variant="outline" size="small">
                Verify Email
              </Button>
            )}
          </div>

          {/* Two-factor authentication status */}
          <div className="security-item">
            <div className="security-item-header">
              <h4>Two-Factor Authentication</h4>
              <span className={`status-badge ${user?.twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="security-item-description">
              {user?.twoFactorEnabled 
                ? 'Your account is protected with 2FA.' 
                : 'Add an extra layer of security to your account.'}
            </p>
            <Link to="#two-factor">
              <Button variant="outline" size="small">
                Manage 2FA
              </Button>
            </Link>
          </div>

          {/* Password status */}
          <div className="security-item">
            <div className="security-item-header">
              <h4>Password</h4>
              <span className="status-badge secure">Protected</span>
            </div>
            <p className="security-item-description">
              Last changed {user?.passwordChangedAt ? new Date(user.passwordChangedAt).toLocaleDateString() : 'more than 30 days ago'}
            </p>
            <Link to="#password">
              <Button variant="outline" size="small">
                Change Password
              </Button>
            </Link>
          </div>

          {/* Recent activity */}
          <div className="security-item">
            <div className="security-item-header">
              <h4>Recent Activity</h4>
              <span className="status-badge info">Monitoring</span>
            </div>
            <p className="security-item-description">
              Last login: {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Not available'}
            </p>
            <Link to="/account/activity">
              <Button variant="outline" size="small">
                View Activity
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Detailed sections */}
      <section id="password">
        <PasswordChange />
      </section>

      <section id="two-factor">
        <TwoFactorSetup user={user} />
      </section>
    </div>
  );
};

export default Security;