import React, { useState } from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { Edit3, Trash2, Wifi, WifiOff } from 'lucide-react';
import { Device } from '../../types';

export function DeviceManagement() {
  const { devices, removeDevice, updateDevice } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDeleteDevice = (deviceId: string) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      removeDevice(deviceId);
    }
  };

  const handleToggleOnline = (device: Device) => {
    updateDevice(device.id, { isOnline: !device.isOnline });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Device Management</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Device</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Room</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Power</th>
                <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {device.isOnline ? (
                        <Wifi className="w-4 h-4 text-green-400" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-white font-medium">{device.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{device.room}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-slate-300">{device.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      device.status === 'on' ? 'bg-green-500/20 text-green-400' :
                      device.status === 'off' ? 'bg-slate-500/20 text-slate-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {device.properties.powerConsumption || 0}W
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleOnline(device)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          device.isOnline 
                            ? 'text-red-400 hover:bg-red-500/20' 
                            : 'text-green-400 hover:bg-green-500/20'
                        }`}
                        title={device.isOnline ? 'Set offline' : 'Set online'}
                      >
                        {device.isOnline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
                        title="Edit device"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDevice(device.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                        title="Delete device"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}