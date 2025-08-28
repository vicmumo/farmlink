import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';

type Order = {
  id: number;
  quantity: number;
  total_price: number;
  delivery_date?: string;
  status?: string;
  product: {
    name: string;
    price: number;
  };
  farm?: {
    name: string;
  };
};

interface Props {
  orders: Order[];
}

export default function Index({ orders }: Props) {
  return (
    <>
      <Head title="Orders" />
      <Layout children={undefined} title={''}>
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Farm</th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Delivery</th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-t">
                      <td className="px-4 py-2 text-sm text-gray-800">{order.product.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{order.farm?.name ?? '—'}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{order.quantity}</td>
                      <td className="px-4 py-2 text-sm text-green-700 font-semibold">KSh {order.total_price}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{order.delivery_date ?? '—'}</td>
                      <td className="px-4 py-2">
                        {order.status ? <StatusBadge status={order.status} /> : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
