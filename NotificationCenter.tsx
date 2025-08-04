import React from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { Bell, AlertTriangle, Info, CheckCircle, X, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function NotificationCenter() {
  const { notifications, markNotificationRead, clearAllNotifications } = useDevices();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-500/30 bg-yellow-900/20 text-yellow-400';
      case 'error': return 'border-red-500/30 bg-red-900/20 text-red-400';
      case 'success': return 'border-green-500/30 bg-green-900/20 text-green-400';
      default: return 'border-blue-500/30 bg-blue-900/20 text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          {notifications.filter(n => !n.isRead).length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.filter(n => !n.isRead).length} new
            </span>
          )}
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-400 mb-2">No notifications</h3>
          <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`border ${colorClass} backdrop-blur-lg rounded-xl p-4 ${
                  !notification.isRead ? 'bg-opacity-50' : 'bg-opacity-20 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-slate-800/50`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{notification.title}</h4>
                        <p className="text-slate-300 mt-1">{notification.message}</p>
                        <p className="text-slate-500 text-sm mt-2">
                          {format(new Date(notification.timestamp), 'MMM dd, yyyy at h:mm a')}
                        </p>
                      </div>
                      
                      {!notification.isRead && (
                        <button
                          onClick={() => markNotificationRead(notification.id)}
                          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                          title="Mark as read"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}