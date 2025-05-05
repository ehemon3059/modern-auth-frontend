// ===== src/routes.jsx =====
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// Layout components
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth pages
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import VerifyEmail from './pages/public/VerifyEmail';
import Verify2FA from './pages/auth/Verify2FA';
import SocialCallback from './pages/auth/SocialCallback';

// Public pages
import Home from './pages/public/Home';
import NotFound from './pages/NotFound';

// Protected pages
import Dashboard from './pages/private/Dashboard';
import Profile from './pages/private/Profile';
import Settings from './pages/private/Settings';

// Route protection components
import ProtectedRoute from './components/routing/ProtectedRoute';

const AppRoutes = () => {
  const { isLoading } = useAuth();

  // Show loading screen while checking authentication status
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  console.log('Routes are rendering');

  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth routes with auth layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/auth/social" element={<SocialCallback />} />
      </Route>

      {/* Protected routes with main layout */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 route */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRoutes;