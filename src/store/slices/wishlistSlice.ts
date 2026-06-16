import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product, WishlistItem } from '../../types'

interface WishlistState {
  items: WishlistItem[]
}

const load = () => {
  try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: load() } as WishlistState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex(i => i.product.id === action.payload.id)
      if (idx >= 0) state.items.splice(idx, 1)
      else state.items.push({ product: action.payload, addedAt: new Date().toISOString() })
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.product.id !== action.payload)
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
