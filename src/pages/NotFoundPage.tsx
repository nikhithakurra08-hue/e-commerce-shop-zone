import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 — Page Not Found — ShopZone</title></Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl font-black text-amazon-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Oops! Page not found</h2>
        <p className="text-gray-500 max-w-md mb-8">The page you're looking for doesn't exist or has been moved. But don't worry — there's plenty more to explore!</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link to="/" className="btn-primary flex items-center gap-2 px-6 py-3"><Home size={18} /> Go Home</Link>
          <Link to="/products" className="btn-outline flex items-center gap-2 px-6 py-3"><Search size={18} /> Browse Products</Link>
        </div>
      </div>
    </>
  )
}
