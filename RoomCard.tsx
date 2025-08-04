import React from 'react';
import { Room } from '../../types';
import { Thermometer, Droplets } from 'lucide-react';
import { DeviceCard } from './DeviceCard';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const activeDevices = room.devices.filter(d => d.status === 'on').length;
  const totalPower = room.devices.reduce((sum, device) => 
    sum + (device.properties.powerConsumption || 0), 0
  );

  return (
    <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
      {/* Room Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{room.name}</h2>
          <p className="text-slate-400">
            {activeDevices} of {room.devices.length} devices active
          </p>
        </div>
        
        {/* Room Stats */}
        <div className="flex items-center gap-4">
          {room.temperature && (
            <div className="flex items-center gap-2 text-blue-400">
              <Thermometer className="w-4 h-4" />
              <span className="text-sm font-medium">{room.temperature}°C</span>
            </div>
          )}
          {room.humidity && (
            <div className="flex items-center gap-2 text-cyan-400">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">{room.humidity}%</span>
            </div>
          )}
          <div className="text-right">
            <div className="text-sm font-medium text-white">{totalPower}W</div>
            <div className="text-xs text-slate-400">Power Usage</div>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {room.devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}