// ===== src/hooks/useValidation.js =====
/**
 * useValidation Hook
 * Provides form validation functionality and commonly used validation rules
 */

import { useCallback } from 'react';

/**
 * Custom hook for form validation
 * @returns {Object} - Validation utilities and rules
 */
const useValidation = () => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone validation regex (supports various formats)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  
  // Password strength regex patterns
  const passwordPatterns = {
    minLength: /.{8,}/,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumbers: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
  };

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Is email valid
   */
  const validateEmail = useCallback((email) => {
    if (!email) return false;
    return emailRegex.test(email);
  }, []);

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result
   */
  const validatePassword = useCallback((password) => {
    const result = {
      isValid: true,
      errors: [],
      score: 0
    };

    // Check minimum length
    if (!passwordPatterns.minLength.test(password)) {
      result.isValid = false;
      result.errors.push('Password must be at least 8 characters long');
    } else {
      result.score += 1;
    }

    // Check for uppercase letters
    if (!passwordPatterns.hasUpperCase.test(password)) {
      result.errors.push('Password must contain at least one uppercase letter');
    } else {
      result.score += 1;
    }

    // Check for lowercase letters
    if (!passwordPatterns.hasLowerCase.test(password)) {
      result.errors.push('Password must contain at least one lowercase letter');
    } else {
      result.score += 1;
    }

    // Check for numbers
    if (!passwordPatterns.hasNumbers.test(password)) {
      result.errors.push('Password must contain at least one number');
    } else {
      result.score += 1;
    }

    // Check for special characters
    if (!passwordPatterns.hasSpecialChar.test(password)) {
      result.errors.push('Password must contain at least one special character');
    } else {
      result.score += 1;
    }

    // Calculate strength level
    if (result.score >= 4) {
      result.strength = 'Strong';
    } else if (result.score >= 3) {
      result.strength = 'Moderate';
    } else {
      result.strength = 'Weak';
    }

    return result;
  }, []);

  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - Is phone valid
   */
  const validatePhone = useCallback((phone) => {
    if (!phone) return true; // Phone is optional
    return phoneRegex.test(phone);
  }, []);

  /**
   * Validate required fields
   * @param {Object} data - Form data
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} - Validation errors
   */
  const validateRequired = useCallback((data, requiredFields) => {
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    return errors;
  }, []);

  /**
   * Validate username format
   * @param {string} username - Username to validate
   * @returns {Object} - Validation result
   */
  const validateUsername = useCallback((username) => {
    const result = {
      isValid: true,
      errors: []
    };

    if (!username) {
      result.isValid = false;
      result.errors.push('Username is required');
      return result;
    }

    if (username.length < 3) {
      result.isValid = false;
      result.errors.push('Username must be at least 3 characters long');
    }

    if (username.length > 20) {
      result.isValid = false;
      result.errors.push('Username cannot exceed 20 characters');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      result.isValid = false;
      result.errors.push('Username can only contain letters, numbers, and underscores');
    }

    return result;
  }, []);

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} - Is URL valid
   */
  const validateURL = useCallback((url) => {
    if (!url) return true; // URL is optional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  /**
   * Validate date
   * @param {string} date - Date to validate
   * @returns {boolean} - Is date valid
   */
  const validateDate = useCallback((date) => {
    if (!date) return true; // Date is optional
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate instanceof Date;
  }, []);

  /**
   * Custom validation rules generator
   * @param {Object} rules - Custom validation rules
   * @returns {Function} - Validation function
   */
  const createValidator = useCallback((rules) => {
    return (data) => {
      const errors = {};
      
      Object.entries(rules).forEach(([field, fieldRules]) => {
        const value = data[field];
        
        fieldRules.forEach(rule => {
          if (!rule.validator(value)) {
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field].push(rule.message);
          }
        });
      });
      
      return errors;
    };
  }, []);

  /**
   * Common validation schema for registration
   */
  const registrationSchema = {
    name: [
      {
        validator: (value) => value && value.trim().length > 0,
        message: 'Name is required'
      },
      {
        validator: (value) => value && value.length <= 50,
        message: 'Name must not exceed 50 characters'
      }
    ],
    email: [
      {
        validator: (value) => value && value.trim().length > 0,
        message: 'Email is required'
      },
      {
        validator: validateEmail,
        message: 'Please enter a valid email address'
      }
    ],
    password: [
      {
        validator: (value) => value && value.length >= 8,
        message: 'Password must be at least 8 characters long'
      },
      {
        validator: (value) => passwordPatterns.hasUpperCase.test(value),
        message: 'Password must contain at least one uppercase letter'
      },
      {
        validator: (value) => passwordPatterns.hasNumbers.test(value),
        message: 'Password must contain at least one number'
      }
    ]
  };

  return {
    validateEmail,
    validatePassword,
    validatePhone,
    validateRequired,
    validateUsername,
    validateURL,
    validateDate,
    createValidator,
    registrationSchema
  };
};

export default useValidation;