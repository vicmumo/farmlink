import React, { useState } from 'react'
import { usePage } from '@inertiajs/react'
import { Subscription } from '@/types'
import SubscriptionTable from '@/components/subscriptions/SubscriptionTable'
import EmptyState from '@/components/subscriptions/EmptyState'
import SubscriptionFilter from '@/components/subscriptions/SubscriptionFilter'
import Pagination from '@/components/shared/Pagination'

export default function SubscriptionList() {
  const { subscriptions, meta, links, auth } = usePage().props as unknown as {
    subscriptions: Subscription[]
    meta: any
    links: any
    auth: { user: { role: string } }
  }

  const [filter, setFilter] = useState<string>('all')

  const handleFilterChange = (value: string) => {
    setFilter(value)
    // Optionally trigger Inertia visit or local filtering
  }

  const filteredSubscriptions = filter === 'all'
    ? subscriptions
    : subscriptions.filter(sub => sub.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Your Subscriptions</h1>

        {auth.user.role === 'admin' && (
          <a
            href="/subscriptions/create"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            + New Subscription
          </a>
        )}
      </div>

      <SubscriptionFilter value={filter} onChange={handleFilterChange} />

      {filteredSubscriptions.length > 0 ? (
        <>
          <SubscriptionTable subscriptions={filteredSubscriptions} />
          <Pagination meta={meta} links={links} />
        </>
      ) : (
        <EmptyState
          title="No subscriptions found"
          description="Try adjusting your filters or browse available plans."
          actionLabel="Browse Plans"
          actionUrl="/marketplace"
        />
      )}
    </div>
  )
}
