import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types'
import { mockUser, mockAdmin } from '../../data/mockData'

const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem('users')
    return stored ? JSON.parse(stored) : [mockAdmin, mockUser, { ...mockUser, id: 'u2', name: 'Priya Sharma', email: 'priya@example.com', createdAt: '2024-01-15', role: 'user' }, { ...mockUser, id: 'u3', name: 'Rahul Verma', email: 'rahul@example.com', createdAt: '2024-02-20', role: 'user' }]
  } catch {
    return [mockAdmin, mockUser, { ...mockUser, id: 'u2', name: 'Priya Sharma', email: 'priya@example.com', createdAt: '2024-01-15', role: 'user' }, { ...mockUser, id: 'u3', name: 'Rahul Verma', email: 'rahul@example.com', createdAt: '2024-02-20', role: 'user' }]
  }
}

const persistUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}

interface UserState {
  items: User[]
}

const userSlice = createSlice({
  name: 'users',
  initialState: { items: loadUsers() } as UserState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.items.push(action.payload)
      persistUsers(state.items)
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.items.findIndex(u => u.id === action.payload.id)
      if (idx >= 0) {
        state.items[idx] = action.payload
        persistUsers(state.items)
      }
    },
    removeUser(state, action: PayloadAction<string>) {
      state.items = state.items.filter(u => u.id !== action.payload)
      persistUsers(state.items)
    },
  },
})

export const { addUser, updateUser, removeUser } = userSlice.actions
export default userSlice.reducer
