// ===== src/components/profile/TwoFactorSetup.jsx =====
/**
 * TwoFactorSetup Component
 * Handles two-factor authentication setup and management
 */

import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';
import Modal from '../common/Modal';
import authService from '../../services/authService';

/**
 * TwoFactorSetup component
 * Provides interface for enabling, disabling and managing 2FA
 */
const TwoFactorSetup = ({ user }) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupData, setSetupData] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [password, setPassword] = useState('');

  // Check if 2FA is enabled
  const is2FAEnabled = user?.twoFactorEnabled || false;

  /**
   * Generate 2FA secret and show setup modal
   */
  const initiate2FASetup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.generate2FA();
      setSetupData(response);
      setShowSetupModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate 2FA secret');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Enable 2FA after verification
   */
  const enable2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await authService.enable2FA({
        secret: setupData.secret,
        token: verificationCode
      });
      
      setSuccess('Two-factor authentication enabled successfully');
      setShowSetupModal(false);
      setVerificationCode('');
      // Refresh user data
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Disable 2FA with password confirmation
   */
  const disable2FA = async () => {
    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await authService.disable2FA({ password });
      
      setSuccess('Two-factor authentication disabled successfully');
      setShowDisableModal(false);
      setPassword('');
      // Refresh user data
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Two-Factor Authentication" className="two-factor-card">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div className="two-factor-content">
        <p className="two-factor-description">
          Two-factor authentication adds an extra layer of security to your account. 
          When enabled, you'll need to enter a verification code from your authentication app 
          in addition to your password when logging in.
        </p>

        {/* Current status */}
        <div className="two-factor-status">
          <div className="status-info">
            <span className="status-label">Status:</span>
            <span className={`status-value ${is2FAEnabled ? 'enabled' : 'disabled'}`}>
              {is2FAEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="two-factor-actions">
          {!is2FAEnabled ? (
            <Button 
              variant="primary" 
              onClick={initiate2FASetup}
              loading={isLoading}
              disabled={isLoading}
            >
              Enable Two-Factor Authentication
            </Button>
          ) : (
            <Button 
              variant="error" 
              onClick={() => setShowDisableModal(true)}
              disabled={isLoading}
            >
              Disable Two-Factor Authentication
            </Button>
          )}
        </div>
      </div>

      {/* Setup Modal */}
      {showSetupModal && setupData && (
        <Modal
          isOpen={showSetupModal}
          onClose={() => setShowSetupModal(false)}
          title="Set Up Two-Factor Authentication"
          size="medium"
        >
          <div className="two-factor-setup">
            <div className="setup-step">
              <h4>Step 1: Scan QR Code</h4>
              <p>Scan this QR code with your authentication app (Google Authenticator, Authy, etc.)</p>
              <div className="qr-code-container">
                <img src={setupData.qrCode} alt="2FA QR Code" className="qr-code" />
              </div>
            </div>

            <div className="setup-step">
              <h4>Step 2: Enter Verification Code</h4>
              <p>Enter the 6-digit code from your authenticator app to verify the setup</p>
              <Input
                type="text"
                name="verificationCode"
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                pattern="[0-9]{6}"
                required
              />
            </div>

            <div className="modal-actions">
              <Button 
                variant="primary" 
                onClick={enable2FA}
                loading={isLoading}
                disabled={isLoading || verificationCode.length !== 6}
              >
                Enable 2FA
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSetupModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Disable Confirmation Modal */}
      {showDisableModal && (
        <Modal
          isOpen={showDisableModal}
          onClose={() => setShowDisableModal(false)}
          title="Disable Two-Factor Authentication"
          size="small"
        >
          <div className="disable-two-factor">
            <p>Are you sure you want to disable two-factor authentication?</p>
            <p className="warning">
              This will make your account less secure.
            </p>
            <Input
              type="password"
              name="password"
              label="Enter your password to confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="modal-actions">
              <Button 
                variant="error" 
                onClick={disable2FA}
                loading={isLoading}
                disabled={isLoading || !password}
              >
                Disable 2FA
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDisableModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default TwoFactorSetup;