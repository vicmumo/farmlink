import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Farm {
  id: number;
  name: string;
  location: string;
  description: string;
}

interface FarmsPageProps extends PageProps {
  farms: Farm[];
  [key: string]: unknown;
}

export default function Index() {
  const { farms } = usePage<FarmsPageProps>().props;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Farms</h1>
        <Link
          href="/farms/create"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Farm
        </Link>
      </div>

      {farms.length === 0 ? (
        <p className="text-gray-500">You haven’t added any farms yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {farms.map(farm => (
            <div key={farm.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{farm.name}</h2>
              <p className="text-sm text-gray-600">{farm.location}</p>
              <p className="mt-2 text-gray-700">{farm.description}</p>
              <Link
                href={`/farms/${farm.id}/edit`}
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
