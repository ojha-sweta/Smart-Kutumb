import React from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { RoomCard } from './RoomCard';
import { StatsCard } from './StatsCard';
import { Zap, Home, Thermometer, Shield } from 'lucide-react';

export function Dashboard() {
  const { devices, rooms } = useDevices();

  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.status === 'on').length;
  const totalPower = devices.reduce((sum, device) => sum + (device.properties.powerConsumption || 0), 0);
  const offlineDevices = devices.filter(d => !d.isOnline).length;

  const stats = [
    {
      title: 'Total Devices',
      value: totalDevices.toString(),
      change: '+2 this week',
      icon: Home,
      color: 'blue'
    },
    {
      title: 'Active Devices',
      value: activeDevices.toString(),
      change: `${Math.round((activeDevices / totalDevices) * 100)}% of total`,
      icon: Zap,
      color: 'green'
    },
    {
      title: 'Power Usage',
      value: `${totalPower}W`,
      change: '-15% from yesterday',
      icon: Thermometer,
      color: 'yellow'
    },
    {
      title: 'System Status',
      value: offlineDevices === 0 ? 'All Online' : `${offlineDevices} Offline`,
      change: offlineDevices === 0 ? 'Excellent' : 'Needs attention',
      icon: Shield,
      color: offlineDevices === 0 ? 'green' : 'red'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Smart Home</h1>
        <p className="text-slate-400">Monitor and control all your devices from one place</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Rooms */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Rooms</h2>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}