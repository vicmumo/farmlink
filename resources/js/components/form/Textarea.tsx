import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

export default function Textarea({ label, value, onChange, error, required }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
          error ? 'border-red-500 ring-red-300' : 'border-gray-300 ring-indigo-300'
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
