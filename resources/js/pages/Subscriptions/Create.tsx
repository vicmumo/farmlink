import { useForm } from '@inertiajs/react'
import Layout from '@/layouts/MainLayout'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import MultiSelect from '@/components/form/MultiSelect'
import DatePicker from '@/components/form/DatePicker'
import FormField from '@/components/form/FormField'
import Button from '@/components/Button'
import { toast } from 'react-hot-toast'

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm<{
    plan: string
    start_date: string
    frequency: string
    products: string[]
    }>({
    plan: '',
    start_date: '',
    frequency: 'monthly',
    products: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('subscriptions.store'), {
      onSuccess: () => {
        toast.success('Subscription created successfully')
        reset()
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    })
  }

  return (
    <Layout title="Create Subscription">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <FormField label="Plan Name" error={errors.plan} required>
          <Input
            label='Plan Name'
            value={data.plan}
            onChange={e => setData('plan', e.target.value)}
          />
        </FormField>

        <FormField label="Start Date" error={errors.start_date} required>
          <DatePicker
            value={data.start_date}
            onChange={date => setData('start_date', date)}
          />
        </FormField>

        <FormField label="Frequency" error={errors.frequency} required>
          <Select
          label='Data Frequency'
            value={data.frequency}
            onChange={value => setData('frequency', String(value))}
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Quarterly', value: 'quarterly' },
              { label: 'Annually', value: 'annually' },
            ]}
          />
        </FormField>

        <FormField label="Linked Products" error={errors.products}>
          <MultiSelect
            options={[
              { label: 'Tomatoes', value: 'tomatoes' },
              { label: 'Spinach', value: 'spinach' },
              { label: 'Maize', value: 'maize' },
            ]}
            selected={data.products}
            onChange={selected => setData('products', selected)}
          />
        </FormField>

        <Button type="submit" disabled={processing}>
          Create Subscription
        </Button>
      </form>
    </Layout>
  )
}
