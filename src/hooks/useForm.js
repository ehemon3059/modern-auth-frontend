// ===== src/hooks/useForm.js =====
/**
 * Custom hook for form handling
 * Manages form state, validation, and submission
 */

import { useState } from 'react';

/**
 * useForm hook
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @param {Function} onSubmit - Submit handler function
 */
const useForm = (initialValues, validate, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const touchedFields = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(touchedFields);
    
    // Submit if no errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(formData);
      } catch (err) {
        console.error('Form submission error:', err);
      }
    }
  };

  /**
   * Reset form state
   */
  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    formData,
    setFormData,
    errors,
    touched,
    handleChange,
    handleSubmit,
    resetForm
  };
};

export default useForm; 