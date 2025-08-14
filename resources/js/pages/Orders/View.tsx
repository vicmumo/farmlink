import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';

interface Order {
  id: number;
  quantity: number;
  total_price: string;
  status: string;
  payment_status: string;
  delivery_date?: string;
  notes?: string;
  created_at: string;
  product: {
    name: string;
    price: number;
  };
  farm?: {
    name: string;
    location?: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function View() {
  const { order } = usePage<{ order: Order }>().props;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* Product Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Product</h2>
            <p className="text-sm text-gray-600">{order.product.name}</p>
            <p className="text-sm text-gray-600">Unit Price: KSh {order.product.price}</p>
          </div>

          {/* Farm Info */}
          {order.farm && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Farm</h2>
              <p className="text-sm text-gray-600">{order.farm.name}</p>
              {order.farm.location && (
                <p className="text-sm text-gray-600">Location: {order.farm.location}</p>
              )}
            </div>
          )}

          {/* Consumer Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Consumer</h2>
            <p className="text-sm text-gray-600">{order.user.name}</p>
            <p className="text-sm text-gray-600">{order.user.email}</p>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Quantity</h2>
              <p className="text-sm text-gray-800">{order.quantity}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-700">Total Price</h2>
              <p className="text-sm text-green-700 font-bold">KSh {order.total_price}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-700">Status</h2>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-700">Payment</h2>
              <StatusBadge status={order.payment_status} type="payment" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-700">Delivery Date</h2>
              <p className="text-sm text-gray-800">
                {order.delivery_date ?? '—'}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-700">Created At</h2>
              <p className="text-sm text-gray-800">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h2 className="text-sm font-medium text-gray-700">Notes</h2>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
