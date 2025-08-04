import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DeviceProvider } from './contexts/DeviceContext';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { AdminPanel } from './components/admin/AdminPanel';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading Smart Home System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'notifications':
        return <NotificationCenter />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DeviceProvider>
        <AppContent />
      </DeviceProvider>
    </AuthProvider>
  );
}

export default App;