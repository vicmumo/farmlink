import React, { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  category: string // e.g. farm name or type
}

interface Props {
  label: string
  selected: number[]
  onChange: (ids: number[]) => void
  fetchUrl: string
}

export default function GroupedAsyncMultiSelect({ label, selected, onChange, fetchUrl }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [fetchUrl])

  const grouped = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || []
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  const toggle = (id: number) => {
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id])
  }

  const filtered = (group: Product[]) =>
    group.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mt-1 mb-2 w-full rounded border-gray-300 shadow-sm"
      />
      <div className="border rounded p-2 max-h-64 overflow-y-auto space-y-2">
        {Object.entries(grouped).map(([category, group]) => {
          const visible = filtered(group)
          if (visible.length === 0) return null
          return (
            <div key={category}>
              <div className="font-semibold text-gray-600 mb-1">{category}</div>
              {visible.map(product => (
                <div key={product.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={() => toggle(product.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
