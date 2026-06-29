import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { store } from './store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ 
  v7_startTransition: true,
  v7_relativeSplatPath: true 
}}>
        <HelmetProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '8px', background: '#1a2535', color: '#fff' } }} />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
