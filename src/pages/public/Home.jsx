// ===== src/pages/public/Home.jsx =====
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  console.log('Home component is rendering');
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <div className="home-page">
      <h1>HOME PAGE IS LOADING</h1>
      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Modern Auth</h1>
          <p className="hero-subtitle">
            Secure, scalable authentication for your applications
          </p>
          
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="primary" size="large">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" size="large">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="large">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="features">
        <h2 className="section-title">Features</h2>
        
        <div className="features-grid">
          <Card title="Secure Authentication" className="feature-card">
            <p>Industry-standard security with JWT and bcrypt encryption</p>
          </Card>
          
          <Card title="Two-Factor Authentication" className="feature-card">
            <p>Add an extra layer of security with TOTP-based 2FA</p>
          </Card>
          
          <Card title="Social Login" className="feature-card">
            <p>Login with Google, Facebook, and other social providers</p>
          </Card>
          
          <Card title="Password Recovery" className="feature-card">
            <p>Easy password reset via email verification</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;