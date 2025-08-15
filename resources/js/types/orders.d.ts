export interface Order {
  id: number
  order_number: string
  status: 'pending' | 'fulfilled' | 'cancelled'
  total: number
  created_at: string
  items: {
    product_id: number
    quantity: number
    price: number
  }[]
}
