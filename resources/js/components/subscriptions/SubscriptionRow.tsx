import React from 'react'
import { Subscription } from '@/types'
import StatusBadge from './StatusBadge'
import ActionButtons from './ActionButtons'

interface Props {
  subscription: Subscription
}

export default function SubscriptionRow({ subscription }: Props) {
  return (
    <tr className="border-b text-sm text-gray-700">
      <td className="px-4 py-2">{subscription.plan}</td>
      <td className="px-4 py-2 capitalize">{subscription.frequency}</td>
      <td className="px-4 py-2">{subscription.start_date}</td>
      <td className="px-4 py-2">
        <StatusBadge status={subscription.status} />
      </td>
      <td className="px-4 py-2">
        <ActionButtons id={subscription.id} />
      </td>
    </tr>
  )
}
