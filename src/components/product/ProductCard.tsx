import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Zap } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlist } from '../../store/slices/wishlistSlice'
import StarRating from '../common/StarRating'
import { formatCurrency } from '../../utils/format'
import type { Product } from '../../types'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch()
  const wishlistIds = useAppSelector(s => s.wishlist.items.map(i => i.product.id))
  const isWishlisted = wishlistIds.includes(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart(product))
    toast.success(`${product.name.slice(0, 30)}... added to cart`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <Link to={`/products/${product.slug}`} className="card group hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 badge bg-red-500 text-white">-{product.discount}%</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 right-10 badge bg-amazon-500 text-white text-[10px]">Best Seller</span>
        )}
        <button
          onClick={handleWishlist}
          className={clsx('absolute top-2 right-2 p-1.5 rounded-full transition-colors', isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500')}
          aria-label="Wishlist"
        >
          <Heart size={15} className={isWishlisted ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-1 flex-1">
          {product.name}
        </h3>
        <StarRating rating={product.rating} showCount count={product.reviewCount} />
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {product.stock === 0 ? (
          <p className="text-xs text-red-500 font-medium mt-2">Out of Stock</p>
        ) : (
          <div className="flex gap-2 mt-3">
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-1.5 btn-primary text-xs py-1.5">
              <ShoppingCart size={13} /> Add to Cart
            </button>
            <Link
              to={`/products/${product.slug}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-1 btn-secondary text-xs py-1.5 px-2.5"
            >
              <Zap size={13} />
            </Link>
          </div>
        )}
      </div>
    </Link>
  )
}
