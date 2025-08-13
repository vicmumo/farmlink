import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Farm {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  farm_id: number;
}

interface EditPageProps extends PageProps {
  product: Product;
  farms: Farm[];
  [key: string]: unknown;
}

export default function Edit() {
  const { product, farms } = usePage<EditPageProps>().props;

  const { data, setData, put, processing, errors } = useForm<{
    name: string;
    category: string;
    price: number;
    stock: number;
    farm_id: number;
  }>({
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    farm_id: product.farm_id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/products/${product.id}`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={data.category}
            onChange={e => setData('category', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
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
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            value={data.stock}
            onChange={e => setData('stock', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
          {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>}
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
          Update Product
        </button>
      </form>
    </div>
  );
}

Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;
