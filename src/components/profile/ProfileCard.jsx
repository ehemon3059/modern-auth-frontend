// ===== src/components/profile/ProfileCard.jsx =====
/**
 * ProfileCard Component
 * Displays user profile information in a card format
 */

import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

/**
 * ProfileCard component
 * Shows user profile details in a visually appealing card
 */
const ProfileCard = ({ user }) => {
  /**
   * Format date to readable string
   * @param {string} dateString - Date string to format
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="profile-card">
      <div className="profile-header">
        {/* User avatar */}
        <div className="profile-avatar-container">
          <img 
            src={user?.profile?.avatar || '/images/default-avatar.png'} 
            alt={user?.name} 
            className="profile-avatar"
          />
          <Link to="/profile/edit-avatar" className="edit-avatar-btn">
            <Button variant="outline" size="small">
              Change Photo
            </Button>
          </Link>
        </div>
        
        {/* User basic info */}
        <div className="profile-info">
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
          <span className={`profile-role-badge role-${user?.role}`}>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </span>
        </div>
      </div>

      <div className="profile-details">
        {/* Bio section */}
        {user?.profile?.bio && (
          <div className="profile-section">
            <h3 className="section-title">Bio</h3>
            <p className="section-content">{user.profile.bio}</p>
          </div>
        )}

        {/* Contact information */}
        <div className="profile-section">
          <h3 className="section-title">Contact Information</h3>
          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">
                {user?.profile?.phone || 'Not provided'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">
                {user?.profile?.location || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Account information */}
        <div className="profile-section">
          <h3 className="section-title">Account Information</h3>
          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">Member since:</span>
              <span className="info-value">{formatDate(user?.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last updated:</span>
              <span className="info-value">{formatDate(user?.updatedAt)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email status:</span>
              <span className={`info-value status-badge ${user?.isEmailVerified ? 'verified' : 'unverified'}`}>
                {user?.isEmailVerified ? 'Verified' : 'Not verified'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">2FA status:</span>
              <span className={`info-value status-badge ${user?.twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile actions */}
      <div className="profile-actions">
        <Link to="/profile/edit">
          <Button variant="primary">Edit Profile</Button>
        </Link>
        <Link to="/settings/security">
          <Button variant="outline">Security Settings</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProfileCard;