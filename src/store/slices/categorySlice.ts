import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Category } from '../../types'
import { categories as initialCategories } from '../../data/mockData'

const loadCategories = (): Category[] => {
  try {
    const stored = localStorage.getItem('categories')
    return stored ? JSON.parse(stored) : initialCategories
  } catch {
    return initialCategories
  }
}

const persistCategories = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories))
}

interface CategoryState {
  items: Category[]
}

const categorySlice = createSlice({
  name: 'categories',
  initialState: { items: loadCategories() } as CategoryState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      state.items.push(action.payload)
      persistCategories(state.items)
    },
    updateCategory(state, action: PayloadAction<Category>) {
      const idx = state.items.findIndex(c => c.id === action.payload.id)
      if (idx >= 0) {
        state.items[idx] = action.payload
        persistCategories(state.items)
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.items = state.items.filter(c => c.id !== action.payload)
      persistCategories(state.items)
    },
  },
})

export const { addCategory, updateCategory, removeCategory } = categorySlice.actions
export default categorySlice.reducer
