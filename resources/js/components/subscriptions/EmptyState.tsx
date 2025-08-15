import React from 'react'
import { router } from '@inertiajs/react'

interface Props {
  title: string
  description?: string
  actionLabel?: string
  actionUrl?: string
}

export default function EmptyState({ title, description, actionLabel, actionUrl }: Props) {
  return (
    <div className="text-center py-12 text-gray-500">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-2 text-sm">{description}</p>}
      {actionLabel && actionUrl && (
        <button
          onClick={() => router.get(actionUrl)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
