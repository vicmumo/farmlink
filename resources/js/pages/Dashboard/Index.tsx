import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

import { ReactNode } from 'react';
import MainLayout from '@/layouts/MainLayout';

Index.layout = (page: ReactNode) => <MainLayout children={page} />;

import {
  ChartBarIcon,
  ShoppingBagIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'farmer' | 'consumer' | 'admin';
}

interface DashboardProps extends PageProps {
  user: User;
  data: Record<string, number | string>;
  [key: string]: unknown;
}

type StatLabel =
  | 'Farms'
  | 'Products'
  | 'Orders'
  | 'Users'
  | 'Subscription Status';

interface StatCardProps {
  label: StatLabel;
  value: number | string;
}

const icons: Record<StatLabel, React.ComponentType<{ className?: string }>> = {
  Farms: HomeIcon,
  Products: ShoppingBagIcon,
  Orders: ChartBarIcon,
  Users: UsersIcon,
  'Subscription Status': ChartBarIcon,
};

export default function Index() {
  const { user, data } = usePage<DashboardProps>().props;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
        <p className="text-green-800 font-medium">
          Hello <span className="font-bold">{user.name}</span>, welcome back to FarmLink!
        </p>
      </div>

      {/* Role Display */}
      <p className="text-gray-600">Role: {user.role}</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {user.role === 'farmer' && (
          <>
            <StatCard label="Farms" value={data.farmCount} />
            <StatCard label="Products" value={data.productCount} />
            <StatCard label="Orders" value={data.orderCount} />
          </>
        )}

        {user.role === 'consumer' && (
          <>
            <StatCard label="Subscription Status" value={data.subscriptionStatus} />
            <StatCard label="Orders" value={data.orderCount} />
          </>
        )}

        {user.role === 'admin' && (
          <>
            <StatCard label="Users" value={data.userCount} />
            <StatCard label="Farms" value={data.farmCount} />
            <StatCard label="Products" value={data.productCount} />
          </>
        )}
      </div>

      {/* Quick Actions */}
      {user.role === 'farmer' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/farms/create"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
          >
            + Add Farm
          </Link>
          <Link
            href="/products/create"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
          >
            + Add Product
          </Link>
          <Link
            href="/orders"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
          >
            View Orders
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: StatCardProps) {
  const Icon = icons[label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded shadow flex items-center space-x-4"
    >
      <Icon className="h-8 w-8 text-green-700" />
      <div>
        <h2 className="text-lg font-semibold">{label}</h2>
        <p className="text-2xl font-bold text-green-700">{value}</p>
      </div>
    </motion.div>
  );
}