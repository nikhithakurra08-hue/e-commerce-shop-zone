import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../../types'

interface CartState {
  items: CartItem[]
  savedForLater: CartItem[]
}

const load = (key: string) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

const initialState: CartState = {
  items: load('cart'),
  savedForLater: load('savedForLater'),
}

const persist = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state.items))
  localStorage.setItem('savedForLater', JSON.stringify(state.savedForLater))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(i => i.product.id === action.payload.id)
      if (existing) existing.quantity += 1
      else state.items.push({ product: action.payload, quantity: 1 })
      persist(state)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.product.id !== action.payload)
      persist(state)
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items.find(i => i.product.id === action.payload.id)
      if (item) item.quantity = action.payload.qty
      persist(state)
    },
    saveForLater(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.product.id === action.payload)
      if (item) {
        state.savedForLater.push(item)
        state.items = state.items.filter(i => i.product.id !== action.payload)
        persist(state)
      }
    },
    moveToCart(state, action: PayloadAction<string>) {
      const item = state.savedForLater.find(i => i.product.id === action.payload)
      if (item) {
        state.items.push(item)
        state.savedForLater = state.savedForLater.filter(i => i.product.id !== action.payload)
        persist(state)
      }
    },
    removeSaved(state, action: PayloadAction<string>) {
      state.savedForLater = state.savedForLater.filter(i => i.product.id !== action.payload)
      persist(state)
    },
    clearCart(state) {
      state.items = []
      persist(state)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, saveForLater, moveToCart, removeSaved, clearCart } = cartSlice.actions
export default cartSlice.reducer
