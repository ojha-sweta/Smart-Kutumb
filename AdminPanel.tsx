import React, { useState } from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Settings, Users, Activity, BarChart3 } from 'lucide-react';
import { DeviceManagement } from './DeviceManagement';
import { AddDeviceForm } from './AddDeviceForm';
import { SystemMetrics } from './SystemMetrics';

type AdminView = 'devices' | 'add-device' | 'users' | 'metrics';

export function AdminPanel() {
  const [currentView, setCurrentView] = useState<AdminView>('devices');
  const { user } = useAuth();
  const { devices } = useDevices();

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-slate-400 mb-2">Access Denied</h3>
        <p className="text-slate-500">You need administrator privileges to access this panel.</p>
      </div>
    );
  }

  const adminNavItems = [
    { id: 'devices' as AdminView, label: 'Device Management', icon: Settings },
    { id: 'add-device' as AdminView, label: 'Add Device', icon: Plus },
    { id: 'users' as AdminView, label: 'User Management', icon: Users },
    { id: 'metrics' as AdminView, label: 'System Metrics', icon: BarChart3 }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'devices':
        return <DeviceManagement />;
      case 'add-device':
        return <AddDeviceForm onSuccess={() => setCurrentView('devices')} />;
      case 'users':
        return <UserManagement />;
      case 'metrics':
        return <SystemMetrics />;
      default:
        return <DeviceManagement />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
        <p className="text-slate-400">Manage your smart home system</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {renderCurrentView()}
    </div>
  );
}

// Mock User Management Component
function UserManagement() {
  const mockUsers = [
    { id: '1', username: 'admin', email: 'admin@smarthome.com', role: 'admin', status: 'active' },
    { id: '2', username: 'user', email: 'user@smarthome.com', role: 'user', status: 'active' }
  ];

  return (
    <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-bold text-white mb-6">User Management</h2>
      
      <div className="space-y-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
            <div>
              <h3 className="font-medium text-white">{user.username}</h3>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {user.role}
              </span>
              <p className="text-sm text-green-400 mt-1">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}