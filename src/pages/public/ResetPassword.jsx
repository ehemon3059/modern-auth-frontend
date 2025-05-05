/**
 * Reset Password Page Component
 * Handles password reset with token
 */

import React from 'react';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';

/**
 * ResetPassword component
 * Renders the password reset form
 */
const ResetPassword = () => {
  return (
    <div className="reset-password-page">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;