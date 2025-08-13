import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Farm {
  id: number;
  name: string;
  location: string;
  description: string;
}

interface EditPageProps extends PageProps {
  farm: Farm;
  [key: string]: unknown;
}

export default function Edit() {
  const { farm } = usePage<EditPageProps>().props;

  const { data, setData, put, processing, errors } = useForm<{
    name: string;
    location: string;
    description: string;
  }>({
    name: farm.name,
    location: farm.location,
    description: farm.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/farms/${farm.id}`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Farm</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Farm Name</label>
          <input
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={e => setData('location', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
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

        <button
          type="submit"
          disabled={processing}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Farm
        </button>
      </form>
    </div>
  );
}

Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;
