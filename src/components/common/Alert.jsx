/**
 * Alert Component
 * Displays various types of alert messages
 */

import React, { useState, useEffect } from 'react';

/**
 * Alert component props
 * @typedef {Object} AlertProps
 * @property {string} type - Alert type (success, error, warning, info)
 * @property {string} message - Alert message
 * @property {boolean} dismissible - Show dismiss button
 * @property {boolean} autoClose - Auto-close after delay
 * @property {number} autoCloseDelay - Auto-close delay in ms
 * @property {Function} onClose - Close callback
 */

/**
 * Alert component
 */
const Alert = ({
  type = 'info',
  message,
  dismissible = false,
  autoClose = false,
  autoCloseDelay = 5000,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;

  // Icon for different alert types
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  const alertClasses = `alert alert-${type}`;

  return (
    <div className={alertClasses} role="alert">
      <div className="alert-icon">{getIcon()}</div>
      <div className="alert-message">{message}</div>
      {dismissible && (
        <button
          type="button"
          className="alert-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;