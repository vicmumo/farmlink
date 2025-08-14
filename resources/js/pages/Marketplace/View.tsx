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
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>

        {item.description && (
          <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-gray-700">Farm:</span> {item.farm.name}
            {item.farm.location && ` (${item.farm.location})`}
          </p>
          <p>
            <span className="font-medium text-gray-700">Seller:</span> {item.user.name}
          </p>
        </div>

        <p className="text-lg font-bold text-green-700">KES {item.price}</p>
      </div>
    </div>
  );
}

View.layout = (page: React.ReactNode) => <MainLayout children={page} />;
