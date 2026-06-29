import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Zap, BadgeCheck, Truck } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlist } from '../../store/slices/wishlistSlice'
import { formatCurrency } from '../../utils/format'
import type { Product } from '../../types'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

interface Props {
  product: Product
  dealPrice?: number
}

export default function ProductCard({ product, dealPrice }: Props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const wishlistItems = useAppSelector(s => s.wishlist.items)
const wishlistIds = wishlistItems.map(i => i.product.id)
  const isWishlisted = wishlistIds.includes(product.id)
  const displayPrice = dealPrice ?? product.price
  const discountPct = dealPrice ? Math.round((1 - dealPrice / product.originalPrice) * 100) : product.discount

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success('Added to cart!')
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <Link to={`/products/${product.slug}`} className="card group hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col relative">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount badge */}
        {discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
            -{discountPct}%
          </span>
        )}

        {/* New badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}

        {/* Best Seller badge */}
        {product.isBestSeller && !product.isNew && (
          <span className="absolute bottom-2 left-2 bg-amazon-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            #1 Best Seller
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={clsx(
            'absolute top-2 right-2 p-1.5 rounded-full transition-all shadow-sm',
            isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
          )}
          aria-label="Wishlist"
        >
          <Heart size={14} className={isWishlisted ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-1.5 flex-1 leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.rating} <Star size={9} className="fill-white" />
          </span>
          <span className="text-[10px] text-gray-400">({product.reviewCount >= 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})</span>
          {product.isAssured && (
            <span className="flex items-center gap-0.5 text-blue-600 text-[10px] font-semibold ml-auto">
              <BadgeCheck size={11} /> Assured
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(displayPrice)}</span>
          {product.originalPrice > displayPrice && (
            <span className="text-[11px] text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Free delivery */}
        {product.freeDelivery && (
          <div className="flex items-center gap-1 mb-2">
            <Truck size={10} className="text-green-600" />
            <span className="text-[10px] text-green-600 font-medium">Free Delivery</span>
          </div>
        )}

        {/* EMI */}
        {product.hasEMI && (
          <p className="text-[10px] text-gray-400 mb-2">No-cost EMI available</p>
        )}

        {product.stock === 0 ? (
          <p className="text-xs text-red-500 font-medium mt-auto pt-2">Out of Stock</p>
        ) : (
          <div className="flex gap-1.5 mt-auto pt-1">
            <button onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1 btn-primary text-[11px] py-1.5 rounded-lg">
              <ShoppingCart size={11} /> Add to Cart
            </button>
            <button
  onClick={e => { e.preventDefault(); navigate(`/products/${product.slug}`) }}
  className="flex items-center justify-center gap-1 btn-secondary text-[11px] py-1.5 px-2 rounded-lg"
>
  <Zap size={11} />
</button>
          </div>
        )}
      </div>
    </Link>
  )
}
