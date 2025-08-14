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
  isNew?: boolean;
  isOrganic?: boolean;
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Marketplace Listings</h1>
        <Link
          href="/marketplace/create"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + List Item
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by title or farm..."
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
      />

      {/* Listings */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-200"
            >
              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">Farm: {item.farm.name}</p>
                <p className="text-sm text-gray-500">Seller: {item.user.name}</p>
                <p className="text-md font-bold text-green-600">KES {item.price}</p>
                <p className="text-sm text-gray-700">{item.description}</p>

                {/* Badges */}
                <div className="flex gap-2 mt-2">
                  {item.isNew && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">New</span>
                  )}
                  {item.isOrganic && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Organic</span>
                  )}
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                <Link
                  href={`/marketplace/${item.id}/edit`}
                  className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs hover:bg-blue-200"
                >
                  Edit
                </Link>
                <Link
                  href={`/marketplace/${item.id}`}
                  className="bg-gray-100 text-gray-800 rounded px-2 py-1 text-xs hover:bg-gray-200"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
