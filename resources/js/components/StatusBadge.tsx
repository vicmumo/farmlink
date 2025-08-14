import React from 'react';
import clsx from 'clsx';

interface Props {
  status: string;
  type?: 'order' | 'payment' | 'subscription';
}

const statusColors: Record<string, string> = {
  // Order statuses
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',

  // Payment statuses
  unpaid: 'bg-gray-100 text-gray-800',
  paid: 'bg-green-100 text-green-800',
  refunded: 'bg-purple-100 text-purple-800',

  // Subscription statuses
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  trial: 'bg-yellow-100 text-yellow-800',
};

const statusTooltips: Record<string, string> = {
  pending: 'Awaiting confirmation',
  confirmed: 'Order confirmed by farm',
  shipped: 'Out for delivery',
  delivered: 'Delivered to consumer',
  cancelled: 'Order was cancelled',
  unpaid: 'Payment not received',
  paid: 'Payment completed',
  refunded: 'Payment refunded',
  active: 'Subscription is active',
  expired: 'Subscription has expired',
  trial: 'Trial period in progress',
};

export default function StatusBadge({ status, type = 'order' }: Props) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';
  const tooltipText = statusTooltips[status] || 'Unknown status';

  return (
    <div className="relative group inline-block">
      <span
        className={clsx(
          'px-2 py-1 rounded-full text-xs font-semibold capitalize cursor-default',
          colorClass
        )}
      >
        {status}
      </span>
      <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 mt-1 whitespace-nowrap left-1/2 -translate-x-1/2">
        {tooltipText}
      </div>
    </div>
  );
}
