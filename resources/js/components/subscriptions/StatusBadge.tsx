import React from 'react'

interface Props {
  status: 'active' | 'paused' | 'cancelled'
}

const styles = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}
