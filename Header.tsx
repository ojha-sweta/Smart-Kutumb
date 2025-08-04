import React from 'react';
import { Home, Bell, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDevices } from '../../contexts/DeviceContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { user, logout } = useAuth();
  const { notifications } = useDevices();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Home</h1>
              <p className="text-xs text-slate-400">Automation System</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
              alt={user?.username}
              className="w-8 h-8 rounded-full border-2 border-slate-600"
            />
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}