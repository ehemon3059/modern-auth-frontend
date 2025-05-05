// ===== src/components/layout/MainLayout.jsx =====
/**
 * Main Layout Component
 * Provides the layout structure for main application pages
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import useAuth from '../../hooks/useAuth';

/**
 * MainLayout component
 * Contains navigation, main content area, and footer
 */
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar visibility (for mobile)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-layout">
      {/* Navigation bar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="layout-container">
        {/* Sidebar (only for authenticated users) */}
        {isAuthenticated && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        )}
        
        {/* Main content area */}
        <main className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;