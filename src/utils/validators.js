/**
 * Client-side Validation Utilities
 * Common validation functions for form fields
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result with errors and strength score
   */
  export const validatePassword = (password) => {
    const errors = [];
    let score = 0;
  
    // Length check
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }
  
    // Uppercase letter check
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }
  
    // Lowercase letter check
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }
  
    // Number check
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    } else {
      score += 1;
    }
  
    // Special character check
    if (!/[!@#$%^&*()]/.test(password)) {
      errors.push('Password must contain at least one special character');
    } else {
      score += 1;
    }
  
    return { errors, score, isValid: errors.length === 0 };
  };
  
  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - True if phone number is valid
   */
  export const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Validate required fields
   * @param {Object} data - Form data
   * @param {Array} requiredFields - List of required field names
   * @returns {Object} - Validation errors
   */
  export const validateRequired = (data, requiredFields) => {
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors[field] = `${field} is required`;
      }
    });
    
    return errors;
  };