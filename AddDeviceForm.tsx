import React, { useState } from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { Device, DeviceType } from '../../types';
import { Plus } from 'lucide-react';

interface AddDeviceFormProps {
  onSuccess: () => void;
}

export function AddDeviceForm({ onSuccess }: AddDeviceFormProps) {
  const { addDevice } = useDevices();
  const [formData, setFormData] = useState({
    name: '',
    type: 'light' as DeviceType,
    room: '',
    status: 'off' as const,
    isOnline: true,
    properties: {
      powerConsumption: 0
    }
  });

  const deviceTypes: { value: DeviceType; label: string }[] = [
    { value: 'light', label: 'Smart Light' },
    { value: 'fan', label: 'Smart Fan' },
    { value: 'ac', label: 'Air Conditioner' },
    { value: 'sensor', label: 'Sensor' },
    { value: 'security', label: 'Security Device' },
    { value: 'thermostat', label: 'Thermostat' }
  ];

  const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Entry'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add device-specific properties based on type
    let properties = { ...formData.properties };
    
    switch (formData.type) {
      case 'light':
        properties = { ...properties, brightness: 50, color: '#FFFFFF' };
        break;
      case 'fan':
        properties = { ...properties, speed: 1 };
        break;
      case 'ac':
        properties = { ...properties, temperature: 22, mode: 'cool' as const };
        break;
      case 'sensor':
        properties = { ...properties, value: 0, unit: '°C', threshold: 30 };
        break;
    }

    addDevice({
      ...formData,
      properties
    });

    // Reset form
    setFormData({
      name: '',
      type: 'light',
      room: '',
      status: 'off',
      isOnline: true,
      properties: {
        powerConsumption: 0
      }
    });

    onSuccess();
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Add New Device</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Name */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Device Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Living Room Light"
              required
            />
          </div>

          {/* Device Type */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Device Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as DeviceType })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {deviceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Room */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Room
            </label>
            <select
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          {/* Power Consumption */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Power Consumption (Watts)
            </label>
            <input
              type="number"
              value={formData.properties.powerConsumption}
              onChange={(e) => setFormData({
                ...formData,
                properties: {
                  ...formData.properties,
                  powerConsumption: Number(e.target.value)
                }
              })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 12"
              min="0"
            />
          </div>
        </div>

        {/* Online Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isOnline"
            checked={formData.isOnline}
            onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
            className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="isOnline" className="text-slate-300">
            Device is online and reachable
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
}