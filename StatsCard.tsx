import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

const colorClasses = {
  blue: 'from-blue-900/20 to-cyan-900/20 text-blue-400 border-blue-500/30',
  green: 'from-green-900/20 to-emerald-900/20 text-green-400 border-green-500/30',
  yellow: 'from-yellow-900/20 to-orange-900/20 text-yellow-400 border-yellow-500/30',
  red: 'from-red-900/20 to-pink-900/20 text-red-400 border-red-500/30'
};

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} backdrop-blur-lg rounded-2xl p-6 border ${colorClasses[color].split(' ')[3]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className={`text-sm mt-2 ${colorClasses[color].split(' ')[2]}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-xl bg-slate-800/50 ${colorClasses[color].split(' ')[2]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}