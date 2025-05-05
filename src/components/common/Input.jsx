/**
 * Input Component
 * Reusable form input with label and error message
 */

import React from 'react';

/**
 * Input component props
 * @typedef {Object} InputProps
 * @property {string} type - Input type
 * @property {string} name - Input name
 * @property {string} label - Input label
 * @property {string} value - Input value
 * @property {Function} onChange - Change handler
 * @property {string} error - Error message
 * @property {boolean} required - Required field
 * @property {string} placeholder - Placeholder text
 * @property {boolean} disabled - Disable input
 * @property {string} className - Additional CSS classes
 */

/**
 * Input component
 */
const Input = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputId = `input-${name}`;
  const inputClasses = ['form-input', error ? 'form-input-error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClasses}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

export default Input;