/**
 * Button Component
 * Reusable button with loading state and various styles
 */

import React from 'react';

/**
 * Button component props
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content
 * @property {string} type - Button type (button, submit, reset)
 * @property {string} variant - Button style variant
 * @property {string} size - Button size
 * @property {boolean} fullWidth - Make button full width
 * @property {boolean} loading - Show loading state
 * @property {boolean} disabled - Disable button
 * @property {Function} onClick - Click handler
 * @property {string} className - Additional CSS classes
 */

/**
 * Button component
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  // Generate button classes
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const fullWidthClass = fullWidth ? 'btn-full-width' : '';
  const loadingClass = loading ? 'btn-loading' : '';
  
  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    loadingClass,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner" />
          <span className="btn-text">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;