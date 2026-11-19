import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { BlogDetail } from './pages/BlogDetail';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ProfileManager } from './pages/admin/ProfileManager';
import { SkillsManager } from './pages/admin/SkillsManager';
import { ExperienceManager } from './pages/admin/ExperienceManager';
import { ServicesManager } from './pages/admin/ServicesManager';
import { ProjectsManager } from './pages/admin/ProjectsManager';
import { BlogManager } from './pages/admin/BlogManager';
import { TestimonialsManager } from './pages/admin/TestimonialsManager';
import { MessagesManager } from './pages/admin/MessagesManager';
import { SettingsManager } from './pages/admin/SettingsManager';
import { useAuth } from './context/AuthContext';
import { LoadingSpinner } from './components/common/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Portfolio Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="messages" element={<MessagesManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
