import React from 'react';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SectionCard({
  title,
  children,
  actions,
  icon,
}: SectionCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl text-gray-600">{icon}</div>}
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
