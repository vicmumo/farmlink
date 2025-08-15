export interface Subscription {
  id: number
  plan: string
  frequency: string
  start_date: string
  status: 'active' | 'paused' | 'cancelled'
  products: string[]
}
