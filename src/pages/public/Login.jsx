/**
 * Login Page Component
 * Contains the login form
 */

import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

/**
 * Login component
 * Renders the login form component
 */
const Login = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;