/**
 * Register Page Component
 * Contains the registration form
 */

import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';




/**
 * Register component
 * Renders the registration form component
 */
const Register = () => {
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
};

export default Register;