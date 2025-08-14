import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  required?: boolean;
}

export default function Select({ label, options, value, onChange, error, required }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
          error ? 'border-red-500 ring-red-300' : 'border-gray-300 ring-indigo-300'
        }`}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
