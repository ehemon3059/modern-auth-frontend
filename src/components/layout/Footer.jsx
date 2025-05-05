// ===== src/components/layout/Footer.jsx =====
/**
 * Footer Component
 * Contains site footer with links and copyright
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 * Page footer with information and links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-content">
          {/* Company info */}
          <div className="footer-section">
            <h3 className="footer-logo">Modern Auth</h3>
            <p className="footer-tagline">
              Secure authentication made simple
            </p>
          </div>
          
          {/* Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal links */}
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="footer-link">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Modern Auth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;