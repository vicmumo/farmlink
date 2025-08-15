import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';
import Tooltip from '@/components/Tooltip';
import SectionCard from '@/components/SectionCard';

import type { SubscriptionPageProps } from '@/types/page-props';

export default function Index() {
  const { subscriptions } = usePage<SubscriptionPageProps>().props;

  return (
    <Layout title="Subscriptions">
      <Head title="Subscriptions" />

      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Subscriptions</h1>

        <SectionCard title="Active Subscriptions">
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Frequency</th>
                  <th className="px-4 py-2">Next Delivery</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-t text-sm">
                    <td className="px-4 py-2">{sub.product.name}</td>
                    <td className="px-4 py-2 capitalize">{sub.frequency}</td>
                    <td className="px-4 py-2">
                      {sub.next_delivery_date ?? '—'}
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="px-4 py-2">
                      <Tooltip content="Edit Subscription">
                        <a
                          href={route('subscriptions.edit', sub.id)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </a>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </Layout>
  );
}
