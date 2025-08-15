import React from 'react'

interface MultiSelectProps {
  label: string
  options: { id: number; name: string }[]
  selected: number[]
  onChange: (ids: number[]) => void
}

export default function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter(x => x !== id)
        : [...selected, id]
    )
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 border rounded p-2 space-y-1 max-h-48 overflow-y-auto">
        {options.map(opt => (
          <div key={opt.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span>{opt.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}