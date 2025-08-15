import React from 'react'

interface Option {
  label: string
  value: string
}

interface Props {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function MultiSelect({ options, selected, onChange }: Props) {
  const toggle = (value: string) => {
    const exists = selected.includes(value)
    const updated = exists
      ? selected.filter(v => v !== value)
      : [...selected, value]
    onChange(updated)
  }

  return (
    <div className="space-y-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            className="form-checkbox"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
