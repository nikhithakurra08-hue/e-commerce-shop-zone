import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { removeFromWishlist } from '../store/slices/wishlistSlice'
import { addToCart } from '../store/slices/cartSlice'
import StarRating from '../components/common/StarRating'
import { formatCurrency } from '../utils/format'

export default function WishlistPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(s => s.wishlist)

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Heart size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
        <Link to="/products" className="btn-primary text-base px-8 py-3 inline-flex">Browse Products</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Wishlist — ShopZone</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Wishlist ({items.length})</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map(item => (
            <div key={item.product.id} className="card overflow-hidden group">
              <Link to={`/products/${item.product.slug}`} className="block relative">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                {item.product.discount > 0 && (
                  <span className="absolute top-2 left-2 badge bg-red-500 text-white">-{item.product.discount}%</span>
                )}
              </Link>
              <div className="p-3">
                <p className="text-xs text-gray-400">{item.product.brand}</p>
                <Link to={`/products/${item.product.slug}`} className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:text-amazon-600">{item.product.name}</Link>
                <StarRating rating={item.product.rating} size={12} />
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(item.product.price)}</span>
                  {item.product.originalPrice > item.product.price && (
                    <span className="text-xs text-gray-400 line-through">{formatCurrency(item.product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => { dispatch(addToCart(item.product)); toast.success('Added to cart') }}
                    className="flex-1 flex items-center justify-center gap-1 btn-primary text-xs py-1.5"
                    disabled={item.product.stock === 0}
                  >
                    <ShoppingCart size={12} /> Add
                  </button>
                  <button
                    onClick={() => { dispatch(removeFromWishlist(item.product.id)); toast.success('Removed') }}
                    className="p-1.5 btn-outline text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
