import React from 'react';
import { useDevices } from '../../contexts/DeviceContext';
import { BarChart3, TrendingUp, Zap, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function SystemMetrics() {
  const { devices } = useDevices();

  // Calculate metrics
  const devicesByType = devices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const devicesByRoom = devices.reduce((acc, device) => {
    acc[device.room] = (acc[device.room] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const powerByRoom = devices.reduce((acc, device) => {
    if (!acc[device.room]) acc[device.room] = 0;
    acc[device.room] += device.properties.powerConsumption || 0;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(devicesByRoom).map(([room, count]) => ({
    room: room.replace(' ', '\n'),
    devices: count,
    power: powerByRoom[room] || 0
  }));

  const pieData = Object.entries(devicesByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const totalPower = devices.reduce((sum, device) => sum + (device.properties.powerConsumption || 0), 0);
  const avgPowerPerDevice = totalPower / devices.length || 0;
  const onlineDevices = devices.filter(d => d.isOnline).length;
  const uptime = ((onlineDevices / devices.length) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Power</p>
              <p className="text-2xl font-bold text-white">{totalPower}W</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Avg Power/Device</p>
              <p className="text-2xl font-bold text-white">{Math.round(avgPowerPerDevice)}W</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">System Uptime</p>
              <p className="text-2xl font-bold text-white">{uptime.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Devices</p>
              <p className="text-2xl font-bold text-white">{devices.filter(d => d.status === 'on').length}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution by Room */}
        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Devices & Power by Room</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="room" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="devices" fill="#3B82F6" name="Devices" />
              <Bar dataKey="power" fill="#10B981" name="Power (W)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Types Distribution */}
        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Device Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}