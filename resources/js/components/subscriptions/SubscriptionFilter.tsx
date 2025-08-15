import React from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SubscriptionFilter({ value, onChange }: Props) {
  return (
    <div className="flex space-x-4 text-sm text-gray-600">
      {['all', 'active', 'paused', 'cancelled'].map(status => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-3 py-1 rounded ${
            value === status ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  )
}
