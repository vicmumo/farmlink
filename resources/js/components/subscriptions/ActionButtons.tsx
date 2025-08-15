import React from 'react'
import { router } from '@inertiajs/react'

interface Props {
  id: number
}

export default function ActionButtons({ id }: Props) {
  const handleEdit = () => router.get(`/subscriptions/${id}/edit`)
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      router.delete(`/subscriptions/${id}`)
    }
  }

  return (
    <div className="flex space-x-2">
      <button onClick={handleEdit} className="text-indigo-600 hover:underline text-sm">
        Edit
      </button>
      <button onClick={handleDelete} className="text-red-600 hover:underline text-sm">
        Delete
      </button>
    </div>
  )
}
