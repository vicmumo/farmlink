import React from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function DatePicker({ value, onChange }: Props) {
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 ring-indigo-300"
    />
  )
}
