import React from 'react';
import { Icon } from 'lucide-react';

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ icon: IconComponent, title, value, description }) => (
  <div className="p-3 border m-3 rounded-2xl bg-white shadow-sm flex items-center space-x-3">
    <IconComponent className="w-6 h-6 text-brand-600 shrink-0" />
    <div className="flex-1">
      <div className="text-sm font-bold text-stone-800">{title}</div>
      <div className="text-xl font-extrabold text-stone-900">{value}</div>
      {description && <p className="text-[11px] text-stone-500 mt-0.5">{description}</p>}
    </div>
  </div>
);
