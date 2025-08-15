import React, { useEffect } from 'react'
import { useForm, usePage, router } from '@inertiajs/react'
import { toast } from 'react-hot-toast'
import GroupedAsyncMultiSelect from '@/components/subscriptions/GroupedAsyncMultiSelect'

export default function SubscriptionForm() {
  const { auth, flash, subscription, selectedProducts = [] } = usePage().props as unknown as {
    auth: { user: { role: string } }
    flash?: { success?: string; error?: string }
    subscription?: { id: number; plan: string; frequency: string; start_date: string; status: string }
    selectedProducts?: number[]
  }

  const isEdit = !!subscription

  const { data, setData, post, put, processing, errors } = useForm({
    plan: subscription?.plan ?? (auth.user.role === 'admin' ? 'Admin Plan' : 'Standard Plan'),
    frequency: subscription?.frequency ?? 'monthly',
    start_date: subscription?.start_date ?? new Date().toISOString().split('T')[0],
    status: subscription?.status ?? 'active',
    product_ids: selectedProducts ?? [],
  })

  useEffect(() => {
    if (flash?.success) toast.success(flash.success)
    if (flash?.error) toast.error(flash.error)
  }, [flash])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const url = isEdit ? `/subscriptions/${subscription!.id}` : '/subscriptions'
    const method = isEdit ? put : post

    method(url, {
      onSuccess: () => {
        toast.success(isEdit ? 'Subscription updated successfully' : 'Subscription created successfully')
        router.visit('/subscriptions')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        {isEdit ? 'Edit Subscription' : 'Create Subscription'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Plan</label>
          <input
            type="text"
            value={data.plan}
            onChange={e => setData('plan', e.target.value)}
            className="mt-1 w-full rounded border-gray-300 shadow-sm"
          />
          {errors.plan && <p className="text-sm text-red-600 mt-1">{errors.plan}</p>}
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Frequency</label>
          <select
            value={data.frequency}
            onChange={e => setData('frequency', e.target.value)}
            className="mt-1 w-full rounded border-gray-300 shadow-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          {errors.frequency && <p className="text-sm text-red-600 mt-1">{errors.frequency}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={data.start_date}
            onChange={e => setData('start_date', e.target.value)}
            className="mt-1 w-full rounded border-gray-300 shadow-sm"
          />
          {errors.start_date && <p className="text-sm text-red-600 mt-1">{errors.start_date}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={data.status}
            onChange={e => setData('status', e.target.value)}
            className="mt-1 w-full rounded border-gray-300 shadow-sm"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
        </div>

        {/* Linked Products */}
        <GroupedAsyncMultiSelect
          label="Linked Products"
          selected={data.product_ids}
          onChange={ids => setData('product_ids', ids)}
          fetchUrl="/api/products"
        />
        {errors.product_ids && <p className="text-sm text-red-600 mt-1">{errors.product_ids}</p>}

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {processing ? 'Saving...' : isEdit ? 'Update Subscription' : 'Create Subscription'}
          </button>
        </div>
      </form>
    </div>
  )
}
