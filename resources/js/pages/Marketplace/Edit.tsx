import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';
import toast from 'react-hot-toast';

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
  flash?: { success?: string };
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
    put(`/marketplace/${item.id}`, {
      onSuccess: () => {
        toast.success('Marketplace item updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update item. Please check the form.');
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Marketplace Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">⚠ {errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">⚠ {errors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-gray-700">Price (KES)</label>
          <input
            type="number"
            value={data.price}
            onChange={e => setData('price', parseFloat(e.target.value))}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">⚠ {errors.price}</p>}
        </div>

        {/* Farm Select */}
        <div>
          <label className="block font-medium text-gray-700">Farm</label>
          <select
            value={data.farm_id}
            onChange={e => setData('farm_id', parseInt(e.target.value))}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.farm_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {farms.map(farm => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
          {errors.farm_id && <p className="text-red-600 text-sm mt-1">⚠ {errors.farm_id}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className={`bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {processing ? 'Updating...' : 'Update Item'}
        </button>
      </form>
    </div>
  );
}

Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;
