import React from 'react';
import { 
  Lightbulb, 
  Fan, 
  Snowflake, 
  Thermometer, 
  Shield, 
  Power,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Device } from '../../types';
import { useDevices } from '../../contexts/DeviceContext';

interface DeviceCardProps {
  device: Device;
  onSettingsClick?: (device: Device) => void;
}

const deviceIcons = {
  light: Lightbulb,
  fan: Fan,
  ac: Snowflake,
  sensor: Thermometer,
  security: Shield,
  thermostat: Thermometer
};

export function DeviceCard({ device, onSettingsClick }: DeviceCardProps) {
  const { toggleDevice, updateDevice } = useDevices();
  const Icon = deviceIcons[device.type] || Power;

  const getStatusColor = () => {
    if (!device.isOnline) return 'text-slate-500';
    switch (device.status) {
      case 'on': return 'text-green-400';
      case 'off': return 'text-slate-400';
      case 'error': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getBackgroundGradient = () => {
    if (!device.isOnline) return 'from-slate-800 to-slate-900';
    switch (device.status) {
      case 'on': return 'from-blue-900/20 to-purple-900/20';
      case 'off': return 'from-slate-800 to-slate-900';
      case 'error': return 'from-red-900/20 to-red-800/20';
      default: return 'from-yellow-900/20 to-orange-900/20';
    }
  };

  const handleBrightnessChange = (brightness: number) => {
    updateDevice(device.id, {
      properties: { ...device.properties, brightness }
    });
  };

  const handleTemperatureChange = (temperature: number) => {
    updateDevice(device.id, {
      properties: { ...device.properties, temperature }
    });
  };

  const handleSpeedChange = (speed: number) => {
    updateDevice(device.id, {
      properties: { ...device.properties, speed }
    });
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient()} backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-slate-800/50 ${getStatusColor()}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{device.name}</h3>
            <p className="text-sm text-slate-400">{device.room}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {device.isOnline ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-400" />
          )}
          {onSettingsClick && (
            <button
              onClick={() => onSettingsClick(device)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status and Controls */}
      <div className="space-y-4">
        {/* Power Toggle */}
        {device.type !== 'sensor' && (
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Power</span>
            <button
              onClick={() => toggleDevice(device.id)}
              disabled={!device.isOnline}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                device.status === 'on' ? 'bg-blue-500' : 'bg-slate-600'
              } ${!device.isOnline ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  device.status === 'on' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

        {/* Device-specific controls */}
        {device.type === 'light' && device.status === 'on' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Brightness</span>
                <span>{device.properties.brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={device.properties.brightness || 0}
                onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}

        {device.type === 'fan' && device.status === 'on' && (
          <div>
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Speed</span>
              <span>Level {device.properties.speed}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={device.properties.speed || 1}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}

        {device.type === 'ac' && device.status === 'on' && (
          <div>
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Temperature</span>
              <span>{device.properties.temperature}°C</span>
            </div>
            <input
              type="range"
              min="16"
              max="30"
              value={device.properties.temperature || 22}
              onChange={(e) => handleTemperatureChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}

        {device.type === 'sensor' && (
          <div className="text-center py-2">
            <div className="text-2xl font-bold text-white mb-1">
              {device.properties.value}{device.properties.unit}
            </div>
            <div className="text-sm text-slate-400">Current Reading</div>
          </div>
        )}

        {/* Power Consumption */}
        {device.properties.powerConsumption !== undefined && (
          <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
            <span className="text-sm text-slate-400">Power</span>
            <span className="text-sm font-medium text-white">
              {device.properties.powerConsumption}W
            </span>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-slate-500 text-center">
          Updated {new Date(device.lastUpdated).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}