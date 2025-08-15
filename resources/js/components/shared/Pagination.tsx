import React from 'react'
import { router } from '@inertiajs/react'

interface Link {
  url: string | null
  label: string
  active: boolean
}

interface Props {
  meta: {
    current_page: number
    last_page: number
    total: number
  }
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}


export default function Pagination({ links }: Props) {
  if (!links || links.length <= 3) return null // Skip if no pagination needed

  return (
    <nav className="flex justify-center mt-6 text-sm text-gray-600">
      <ul className="inline-flex space-x-1">
        {links.map((link, i) => (
          <li key={i}>
            <button
              disabled={!link.url}
              onClick={() => link.url && router.visit(link.url)}
              className={`px-3 py-1 rounded ${
                link.active
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}
