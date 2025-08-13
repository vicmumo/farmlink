import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import MainLayout from '@/layouts/MainLayout';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  farm: {
    name: string;
  };
}

interface ProductsPageProps extends PageProps {
  products: Product[];
  [key: string]: unknown;
}

export default function Index() {
  const { products } = usePage<ProductsPageProps>().props;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link
          href="/products/create"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">You haven’t added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">Farm: {product.farm.name}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Price: KES {product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <Link
                href={`/products/${product.id}/edit`}
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
