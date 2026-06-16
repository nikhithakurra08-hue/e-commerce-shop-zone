import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../../types'
import { mockOrders } from '../../data/mockData'

interface OrderState {
  orders: Order[]
}

const load = () => {
  try {
    const stored = localStorage.getItem('orders')
    return stored ? JSON.parse(stored) : mockOrders
  } catch { return mockOrders }
}

const orderSlice = createSlice({
  name: 'orders',
  initialState: { orders: load() } as OrderState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    cancelOrder(state, action: PayloadAction<string>) {
      const order = state.orders.find(o => o.id === action.payload)
      if (order) {
        order.orderStatus = 'cancelled'
        order.cancelledAt = new Date().toISOString()
        order.updatedAt = new Date().toISOString()
        localStorage.setItem('orders', JSON.stringify(state.orders))
      }
    },
    returnOrder(state, action: PayloadAction<string>) {
      const order = state.orders.find(o => o.id === action.payload)
      if (order) {
        order.orderStatus = 'returned'
        order.updatedAt = new Date().toISOString()
        localStorage.setItem('orders', JSON.stringify(state.orders))
      }
    },
  },
})

export const { placeOrder, cancelOrder, returnOrder } = orderSlice.actions
export default orderSlice.reducer
