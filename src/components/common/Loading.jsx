/**
 * Loading Component
 * Reusable loading indicator with different variations
 */

import React from 'react';

/**
 * Loading component props
 * @typedef {Object} LoadingProps
 * @property {string} type - Loading spinner type
 * @property {string} size - Spinner size
 * @property {string} text - Loading text
 * @property {boolean} fullScreen - Full screen overlay
 */

/**
 * Loading component
 */
const Loading = ({
  type = 'spinner',
  size = 'medium',
  text = 'Loading...',
  fullScreen = false
}) => {
  const wrapperClasses = fullScreen 
    ? 'loading-overlay' 
    : 'loading-inline';
  
  const spinnerClasses = `loading-spinner loading-${type} loading-${size}`;

  return (
    <div className={wrapperClasses}>
      <div className="loading-content">
        <div className={spinnerClasses} />
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;