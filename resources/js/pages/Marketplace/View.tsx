import React from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Farm {
  name: string;
  location?: string;
}

interface User {
  name: string;
}

interface MarketplaceItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  farm: Farm;
  user: User;
}

interface ViewPageProps extends PageProps {
  item: MarketplaceItem;
  [key: string]: unknown;
}

export default function View() {
  const { item } = usePage<ViewPageProps>().props;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{item.title}</h1>
      {item.description && <p className="text-gray-700">{item.description}</p>}
      <p className="text-sm text-gray-600">
        Farm: {item.farm.name}
        {item.farm.location && ` (${item.farm.location})`}
      </p>
      <p className="text-sm text-gray-600">Seller: {item.user.name}</p>
      <p className="text-lg font-bold text-green-700">KES {item.price}</p>
    </div>
  );
}

View.layout = (page: React.ReactNode) => <MainLayout children={page} />;
