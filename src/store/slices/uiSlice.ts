import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  darkMode: boolean
  searchQuery: string
  recentlyViewed: string[]
}

const initialState: UIState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  searchQuery: '',
  recentlyViewed: JSON.parse(localStorage.getItem('recentlyViewed') || '[]'),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', String(state.darkMode))
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    addRecentlyViewed(state, action: PayloadAction<string>) {
      state.recentlyViewed = [action.payload, ...state.recentlyViewed.filter(id => id !== action.payload)].slice(0, 10)
      localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed))
    },
  },
})

export const { toggleDarkMode, setSearchQuery, addRecentlyViewed } = uiSlice.actions
export default uiSlice.reducer
