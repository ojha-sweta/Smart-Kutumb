// Core type definitions for the Smart Home System

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  status: DeviceStatus;
  isOnline: boolean;
  properties: DeviceProperties;
  createdAt: Date;
  lastUpdated: Date;
}

export type DeviceType = 'light' | 'fan' | 'ac' | 'sensor' | 'security' | 'thermostat';

export type DeviceStatus = 'on' | 'off' | 'idle' | 'error';

export interface DeviceProperties {
  // Light properties
  brightness?: number; // 0-100
  color?: string;
  
  // Fan properties
  speed?: number; // 1-5
  
  // AC properties
  temperature?: number; // in Celsius
  mode?: 'cool' | 'heat' | 'fan' | 'auto';
  
  // Sensor properties
  value?: number;
  unit?: string;
  threshold?: number;
  
  // General properties
  powerConsumption?: number; // in Watts
  scheduledTasks?: ScheduledTask[];
}

export interface ScheduledTask {
  id: string;
  deviceId: string;
  action: string;
  scheduledTime: Date;
  isRecurring: boolean;
  isActive: boolean;
}

export interface Room {
  id: string;
  name: string;
  devices: Device[];
  temperature?: number;
  humidity?: number;
}

export interface NotificationMessage {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  deviceId?: string;
}

export interface EnergyData {
  deviceId: string;
  timestamp: Date;
  consumption: number; // in Watts
  cost: number; // in currency units
}

export interface WebSocketMessage {
  type: 'device_update' | 'notification' | 'energy_data' | 'system_status';
  payload: any;
  timestamp: Date;
}