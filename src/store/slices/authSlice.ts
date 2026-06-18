import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types'
import { mockUser, mockAdmin } from '../../data/mockData'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  remember: boolean
}

const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  loading: false,
  remember: !!localStorage.getItem('remember'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string; remember?: boolean }>) {
      const { email } = action.payload
      let user: User | null = null
      if (email === mockAdmin.email) user = mockAdmin
      else if (email === mockUser.email || email.includes('@')) user = { ...mockUser, email, name: email.split('@')[0] }
      if (user) {
        state.user = user
        state.isAuthenticated = true
        state.remember = !!action.payload.remember
        if (state.remember) {
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('remember', '1')
        }
      }
    },
    signup(state, action: PayloadAction<{ name: string; email: string }>) {
      const user: User = { ...mockUser, id: 'u_' + Date.now(), name: action.payload.name, email: action.payload.email, role: 'user', addresses: [], createdAt: new Date().toISOString() }
      state.user = user
      state.isAuthenticated = true
      // persist signup by default
      state.remember = true
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('remember', '1')
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.remember = false
      localStorage.removeItem('user')
      localStorage.removeItem('remember')
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
})

export const { login, signup, logout, updateProfile } = authSlice.actions
export default authSlice.reducer
