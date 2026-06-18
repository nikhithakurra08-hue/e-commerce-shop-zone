import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types'
import { products as initialProducts } from '../../data/mockData'

const loadProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem('products')
    return stored ? JSON.parse(stored) : initialProducts
  } catch {
    return initialProducts
  }
}

const persistProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products))
}

interface ProductState {
  items: Product[]
}

const productSlice = createSlice({
  name: 'products',
  initialState: { items: loadProducts() } as ProductState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload)
      persistProducts(state.items)
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index >= 0) {
        state.items[index] = action.payload
        persistProducts(state.items)
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload)
      persistProducts(state.items)
    },
  },
})

export const { addProduct, updateProduct, removeProduct } = productSlice.actions
export default productSlice.reducer
