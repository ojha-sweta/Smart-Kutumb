import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Device, DeviceType, Room, NotificationMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface DeviceContextType {
  devices: Device[];
  rooms: Room[];
  notifications: NotificationMessage[];
  updateDevice: (deviceId: string, updates: Partial<Device>) => void;
  addDevice: (device: Omit<Device, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  removeDevice: (deviceId: string) => void;
  toggleDevice: (deviceId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// Mock initial devices data
const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Living Room Light',
    type: 'light',
    room: 'Living Room',
    status: 'on',
    isOnline: true,
    properties: {
      brightness: 75,
      color: '#FFA500',
      powerConsumption: 12
    },
    createdAt: new Date('2024-01-01'),
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Bedroom Fan',
    type: 'fan',
    room: 'Bedroom',
    status: 'on',
    isOnline: true,
    properties: {
      speed: 3,
      powerConsumption: 45
    },
    createdAt: new Date('2024-01-02'),
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Living Room AC',
    type: 'ac',
    room: 'Living Room',
    status: 'on',
    isOnline: true,
    properties: {
      temperature: 22,
      mode: 'cool',
      powerConsumption: 1200
    },
    createdAt: new Date('2024-01-03'),
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Temperature Sensor',
    type: 'sensor',
    room: 'Living Room',
    status: 'on',
    isOnline: true,
    properties: {
      value: 24.5,
      unit: '°C',
      threshold: 30,
      powerConsumption: 2
    },
    createdAt: new Date('2024-01-04'),
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Kitchen Light',
    type: 'light',
    room: 'Kitchen',
    status: 'off',
    isOnline: true,
    properties: {
      brightness: 50,
      color: '#FFFFFF',
      powerConsumption: 0
    },
    createdAt: new Date('2024-01-05'),
    lastUpdated: new Date()
  },
  {
    id: '6',
    name: 'Security System',
    type: 'security',
    room: 'Entry',
    status: 'on',
    isOnline: true,
    properties: {
      powerConsumption: 15
    },
    createdAt: new Date('2024-01-06'),
    lastUpdated: new Date()
  }
];

const initialNotifications: NotificationMessage[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High Temperature Alert',
    message: 'Living room temperature has exceeded the threshold (30°C)',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    deviceId: '4'
  },
  {
    id: '2',
    type: 'info',
    title: 'Device Added',
    message: 'Security System has been successfully added to your home',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    deviceId: '6'
  }
];

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [notifications, setNotifications] = useState<NotificationMessage[]>(initialNotifications);

  // Group devices by room
  const rooms: Room[] = Array.from(new Set(devices.map(d => d.room))).map(roomName => ({
    id: roomName.toLowerCase().replace(/\s+/g, '-'),
    name: roomName,
    devices: devices.filter(d => d.room === roomName),
    temperature: roomName === 'Living Room' ? 24.5 : undefined,
    humidity: roomName === 'Living Room' ? 65 : undefined
  }));

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update sensor values
      setDevices(prevDevices => 
        prevDevices.map(device => {
          if (device.type === 'sensor' && Math.random() < 0.3) {
            const newValue = 20 + Math.random() * 15; // Random temperature between 20-35°C
            return {
              ...device,
              properties: {
                ...device.properties,
                value: Number(newValue.toFixed(1))
              },
              lastUpdated: new Date()
            };
          }
          return device;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? { ...device, ...updates, lastUpdated: new Date() }
          : device
      )
    );
  };

  const addDevice = (newDevice: Omit<Device, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const device: Device = {
      ...newDevice,
      id: uuidv4(),
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    setDevices(prevDevices => [...prevDevices, device]);
    
    // Add notification for new device
    const notification: NotificationMessage = {
      id: uuidv4(),
      type: 'success',
      title: 'Device Added',
      message: `${device.name} has been successfully added to ${device.room}`,
      timestamp: new Date(),
      isRead: false,
      deviceId: device.id
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const removeDevice = (deviceId: string) => {
    setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceId));
  };

  const toggleDevice = (deviceId: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        if (device.id === deviceId) {
          const newStatus = device.status === 'on' ? 'off' : 'on';
          const powerConsumption = newStatus === 'on' ? device.properties.powerConsumption || 0 : 0;
          
          return {
            ...device,
            status: newStatus,
            properties: {
              ...device.properties,
              powerConsumption
            },
            lastUpdated: new Date()
          };
        }
        return device;
      })
    );
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DeviceContext.Provider value={{
      devices,
      rooms,
      notifications,
      updateDevice,
      addDevice,
      removeDevice,
      toggleDevice,
      markNotificationRead,
      clearAllNotifications
    }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
}