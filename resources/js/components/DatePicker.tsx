import React from 'react';

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DatePicker({ id, value, onChange, error }: Props) {
  return (
    <div>
      <input
        type="date"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`border rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
