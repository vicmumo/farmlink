import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/MainLayout';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Textarea from '@/components/form/Textarea';
import StatusBadge from '@/components/StatusBadge';
import Toast from '@/components/feedback/Toast';

interface Props {
  listing: {
    id: number;
    name: string;
    description: string;
    price: number;
    status: string;
    product_id: number;
    farm_id: number;
  };
  products: Array<{ id: number; name: string }>;
  farms: Array<{ id: number; name: string }>;
  auth: {
    user: {
      role: string;
    };
  };
}

export default function Edit({ listing, products, farms, auth }: Props) {
  const { data, setData, put, processing, errors, wasSuccessful } = useForm({
    name: listing.name,
    description: listing.description,
    price: listing.price,
    status: listing.status,
    product_id: listing.product_id,
    farm_id: listing.farm_id,
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (wasSuccessful) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [wasSuccessful]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('marketplace.update', listing.id));
  };

  const isAdmin = auth.user.role === 'admin';

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">{`Edit Listing: ${listing.name}`}</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Listing Details</h2>
          <StatusBadge status={data.status} />
        </div>

        <Input
          label="Name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={errors.name}
          required
        />

        <Textarea
          label="Description"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          error={errors.description}
          required
        />

        <Input
          label="Price"
          type="number"
          value={data.price}
          onChange={e => setData('price', parseFloat(e.target.value))}
          error={errors.price}
          required
        />

        <Select
          label="Product"
          options={products.map(p => ({ value: p.id, label: p.name }))}
          value={data.product_id}
          onChange={value => setData('product_id', Number(value))}
          error={errors.product_id}
          required
        />

        {isAdmin && (
          <Select
            label="Farm"
            options={farms.map(f => ({ value: f.id, label: f.name }))}
            value={data.farm_id}
            onChange={value => setData('farm_id', Number(value))}
            error={errors.farm_id}
            required
          />
        )}

        <Select
          label="Status"
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          value={data.status}
          onChange={value => setData('status', String(value))}
          error={errors.status}
          required
        />

        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>

      {showToast && (
        <Toast message="Listing updated successfully!" type="success" />
      )}
    </AuthLayout>
  );
}
