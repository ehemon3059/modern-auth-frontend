// ===== src/pages/private/Settings.jsx =====
/**
 * Settings Page Component
 * User account settings
 */

import React, { useState } from 'react';
import TwoFactorSetup from '../../components/profile/TwoFactorSetup';
import PasswordChange from '../../components/profile/PasswordChange';

/**
 * Settings component
 * Contains tabs for different settings sections
 */
const Settings = () => {
  const [activeTab, setActiveTab] = useState('security');

  const tabs = [
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' }
  ];

  return (
    <div className="settings-page">
      <h1>Account Settings</h1>
      
      {/* Settings tabs */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className="settings-content">
        {activeTab === 'security' && (
          <div className="settings-panel">
            <PasswordChange />
            <TwoFactorSetup />
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="settings-panel">
            <h2>Notification Settings</h2>
            <p>Configure your notification preferences here.</p>
          </div>
        )}
        
        {activeTab === 'privacy' && (
          <div className="settings-panel">
            <h2>Privacy Settings</h2>
            <p>Manage your privacy settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;