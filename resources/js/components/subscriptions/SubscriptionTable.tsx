import React from 'react'
import { Subscription } from '@/types'
import SubscriptionRow from './SubscriptionRow'

interface Props {
  subscriptions: Subscription[]
}

export default function SubscriptionTable({ subscriptions }: Props) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="px-4 py-2">Plan</th>
          <th className="px-4 py-2">Frequency</th>
          <th className="px-4 py-2">Start Date</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map(sub => (
          <SubscriptionRow key={sub.id} subscription={sub} />
        ))}
      </tbody>
    </table>
  )
}
