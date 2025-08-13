import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: number;
  farm: {
    name: string;
  };
  user: {
    name: string;
  };
}

interface MarketplacePageProps extends PageProps {
  items: MarketplaceItem[];
  [key: string]: unknown;
}

export default function Index() {
  const { items } = usePage<MarketplacePageProps>().props;
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(items);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      items.filter(item =>
        item.title.toLowerCase().includes(value) ||
        item.farm.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace Listings</h1>
        <Link
          href="/marketplace/create"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + List Item
        </Link>
      </div>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by title or farm..."
        className="w-full border rounded px-3 py-2"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">Farm: {item.farm.name}</p>
              <p className="text-sm text-gray-600">Seller: {item.user.name}</p>
              <p className="text-sm text-gray-600">Price: KES {item.price}</p>
              <p className="mt-2 text-gray-700">{item.description}</p>
              <Link
                href={`/marketplace/${item.id}/edit`}
                className="text-green-700 hover:underline mt-4 inline-block"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
