import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Farm {
  id: number;
  name: string;
}

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: number;
  farm_id: number;
}

interface EditPageProps extends PageProps {
  item: MarketplaceItem;
  farms: Farm[];
  [key: string]: unknown;
}

export default function Edit() {
  const { item, farms } = usePage<EditPageProps>().props;

  const { data, setData, put, processing, errors } = useForm<{
    title: string;
    description: string;
    price: number;
    farm_id: number;
  }>({
    title: item.title,
    description: item.description || '',
    price: item.price,
    farm_id: item.farm_id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/marketplace/${item.id}`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Marketplace Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block font-medium">Price (KES)</label>
          <input
            type="number"
            value={data.price}
            onChange={e => setData('price', parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
        </div>

        <div>
          <label className="block font-medium">Farm</label>
          <select
            value={data.farm_id}
            onChange={e => setData('farm_id', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {farms.map(farm => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
          {errors.farm_id && <p className="text-red-600 text-sm">{errors.farm_id}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;
