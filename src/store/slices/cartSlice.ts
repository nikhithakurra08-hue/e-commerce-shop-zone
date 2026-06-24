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
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number; selectedVariants?: Record<string, string>; price?: number }>) {
      const { product, quantity = 2, selectedVariants, price } = action.payload
      const existing = state.items.find(i => i.product.id === product.id && JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {}))
      if (existing) existing.quantity += quantity
      else state.items.push({ product, quantity, selectedVariants, price })
      persist(state)
    },
    removeFromCart(state, action: PayloadAction<{ id: string; selectedVariants?: Record<string, string> }>) {
      const { id, selectedVariants } = action.payload
      if (selectedVariants) {
        state.items = state.items.filter(i => !(i.product.id === id && JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {})))
      } else {
        state.items = state.items.filter(i => i.product.id !== id)
      }
      persist(state)
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number; selectedVariants?: Record<string, string> }>) {
      const { id, qty, selectedVariants } = action.payload
      const item = selectedVariants
        ? state.items.find(i => i.product.id === id && JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {}))
        : state.items.find(i => i.product.id === id)
      if (item) item.quantity = qty
      persist(state)
    },
    saveForLater(state, action: PayloadAction<{ id: string; selectedVariants?: Record<string, string> }>) {
      const { id, selectedVariants } = action.payload
      const idx = state.items.findIndex(i => i.product.id === id && (!selectedVariants || JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {})))
      if (idx >= 0) {
        const [item] = state.items.splice(idx, 1)
        state.savedForLater.push(item)
        persist(state)
      }
    },
    moveToCart(state, action: PayloadAction<{ id: string; selectedVariants?: Record<string, string> }>) {
      const { id, selectedVariants } = action.payload
      const idx = state.savedForLater.findIndex(i => i.product.id === id && (!selectedVariants || JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {})))
      if (idx >= 0) {
        const [item] = state.savedForLater.splice(idx, 1)
        state.items.push(item)
        persist(state)
      }
    },
    removeSaved(state, action: PayloadAction<{ id: string; selectedVariants?: Record<string, string> }>) {
      const { id, selectedVariants } = action.payload
      state.savedForLater = state.savedForLater.filter(i => !(i.product.id === id && (!selectedVariants || JSON.stringify(i.selectedVariants || {}) === JSON.stringify(selectedVariants || {}))))
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
