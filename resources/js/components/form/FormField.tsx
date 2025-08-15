import React from 'react';

interface Props {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  tooltip?: string;
}

export default function FormField({ label, children, error, required, tooltip }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="text-gray-400 cursor-help" title={tooltip}>
            ⓘ
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
