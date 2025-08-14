import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '@/layouts/MainLayout';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import SelectInput from '@/components/SelectInput';
import TextArea from '@/components/TextArea';
import PrimaryButton from '@/components/PrimaryButton';
import DatePicker from '@/components/DatePicker';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  products: Product[];
}

export default function Create({ products }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    product_id: '',
    quantity: '',
    delivery_date: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('orders.store'));
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Place New Order</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* Product Selection */}
          <div>
            <InputLabel htmlFor="product_id" value="Product" />
            <SelectInput
              id="product_id"
              value={data.product_id}
              onChange={e => setData('product_id', e.target.value)}
              options={products.map(p => ({
                value: p.id,
                label: `${p.name} (KSh ${p.price})`,
              }))}
              error={errors.product_id}
            />
          </div>

          {/* Quantity */}
          <div>
            <InputLabel htmlFor="quantity" value="Quantity" />
            <TextInput
              id="quantity"
              type="number"
              min={1}
              value={data.quantity}
              onChange={e => setData('quantity', e.target.value)}
              error={errors.quantity}
              required
            />
          </div>

          {/* Delivery Date */}
          <div>
            <InputLabel htmlFor="delivery_date" value="Delivery Date" />
            <DatePicker
              id="delivery_date"
              value={data.delivery_date}
              onChange={date => setData('delivery_date', date)}
              error={errors.delivery_date}
            />
          </div>

          {/* Notes */}
          <div>
            <InputLabel htmlFor="notes" value="Notes (optional)" />
            <TextArea
              id="notes"
              value={data.notes}
              onChange={e => setData('notes', e.target.value)}
              error={errors.notes}
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <PrimaryButton disabled={processing}>Submit Order</PrimaryButton>
          </div>
        </form>
      </div>
    </Layout>
  );
}
