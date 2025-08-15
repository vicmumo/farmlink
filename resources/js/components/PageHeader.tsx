import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, icon, actions }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        {icon && <div className="text-indigo-500">{icon}</div>}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
  );
}
