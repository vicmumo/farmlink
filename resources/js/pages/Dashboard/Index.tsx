import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';
import {
  ChartBarIcon,
  ShoppingBagIcon,
  HomeIcon,
  UsersIcon,
  PlusIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;

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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded shadow-sm">
        <p className="text-green-800 font-medium">
          Hello <span className="font-bold">{user.name}</span>, welcome back to FarmLink!
        </p>
        <p className="text-sm text-gray-600 mt-1">Role: {user.role}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <QuickAction href="/farms/create" label="Add Farm" />
          <QuickAction href="/products/create" label="Add Product" />
          <QuickAction href="/orders" label="View Orders" icon={ArrowRightIcon} />
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
      className="bg-white p-4 rounded shadow flex items-center space-x-4 hover:shadow-md transition"
    >
      <Icon className="h-8 w-8 text-green-700" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
        <p className="text-2xl font-bold text-green-700">{value}</p>
      </div>
    </motion.div>
  );
}

function QuickAction({
  href,
  label,
  icon: Icon = PlusIcon,
}: {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm font-medium shadow"
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
