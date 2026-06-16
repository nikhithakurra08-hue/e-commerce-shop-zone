import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'
import { products } from '../data/mockData'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { addToCart, updateQuantity } from '../store/slices/cartSlice'
import { toggleWishlist } from '../store/slices/wishlistSlice'
import { addRecentlyViewed } from '../store/slices/uiSlice'
import StarRating from '../components/common/StarRating'
import ProductCard from '../components/product/ProductCard'
import { formatCurrency, formatDate } from '../utils/format'
import { ProductDetailSkeleton } from '../components/common/Skeleton'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc')

  const product = products.find(p => p.slug === slug)
  const cartItems = useAppSelector(s => s.cart.items)
  const wishlistIds = useAppSelector(s => s.wishlist.items.map(i => i.product.id))
  const inCart = product ? cartItems.some(i => i.product.id === product.id) : false
  const isWishlisted = product ? wishlistIds.includes(product.id) : false

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [slug])

  useEffect(() => {
    if (product) dispatch(addRecentlyViewed(product.id))
  }, [product, dispatch])

  if (loading) return <ProductDetailSkeleton />
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Product not found</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 5)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    if (qty > 1) dispatch(updateQuantity({ id: product.id, qty }))
    toast.success('Added to cart!')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  const avgRating = product.reviews.length
    ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    : product.rating

  return (
    <>
      <Helmet>
        <title>{product.name} — ShopZone</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 flex-wrap">
          <Link to="/" className="hover:text-amazon-600">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-amazon-600">Products</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-amazon-600">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="card overflow-hidden bg-white dark:bg-gray-900 aspect-square flex items-center justify-center p-4">
              <img src={product.images[selectedImg]} alt={product.name} className="max-h-80 w-full object-contain" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)} className={`card p-1.5 w-16 h-16 flex items-center justify-center transition-all ${selectedImg === i ? 'ring-2 ring-amazon-500' : 'hover:ring-1 ring-gray-300'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-amazon-600 font-medium">{product.brand}</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 leading-snug">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={avgRating} size={16} showCount count={product.reviewCount} />
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                  <span className="badge bg-green-100 text-green-700">Save {product.discount}%</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <>
                  <span className="badge bg-green-100 text-green-700">In Stock</span>
                  <span className="text-gray-500">({product.stock} left)</span>
                </>
              ) : (
                <span className="badge bg-red-100 text-red-700">Out of Stock</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Minus size={14} /></button>
                <span className="px-4 py-2 font-medium text-sm min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Plus size={14} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={product.stock === 0} className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-colors ${inCart ? 'bg-green-500 hover:bg-green-600 text-white' : 'btn-primary'}`}>
                <ShoppingCart size={18} />
                {inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button onClick={handleBuyNow} disabled={product.stock === 0} className="flex-1 bg-amazon-400 hover:bg-amazon-500 text-white font-semibold py-3 rounded-lg transition-colors">
                Buy Now
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { dispatch(toggleWishlist(product)); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist') }} className="flex items-center gap-2 btn-outline text-sm py-2">
                <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }} className="flex items-center gap-2 btn-outline text-sm py-2">
                <Share2 size={15} /> Share
              </button>
            </div>

            {/* Delivery info */}
            <div className="card p-4 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <Truck size={18} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-gray-800 dark:text-gray-200">Free Delivery</p><p>On orders above ₹499. Estimated 3-5 business days.</p></div>
              </div>
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <Shield size={18} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-gray-800 dark:text-gray-200">Secure Payment</p><p>100% secure via Razorpay, Stripe or COD.</p></div>
              </div>
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <RefreshCw size={18} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                <div><p className="font-medium text-gray-800 dark:text-gray-200">Easy Returns</p><p>30-day hassle-free return policy.</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
            {(['desc', 'specs', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-amazon-500 text-amazon-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : `Reviews (${product.reviews.length})`}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-2">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  <span className="font-medium text-gray-600 dark:text-gray-400 w-32 flex-shrink-0">{k}</span>
                  <span className="text-gray-900 dark:text-white">{v}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-5">
              <div className="flex items-center gap-6 p-5 card">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
                  <StarRating rating={avgRating} size={18} />
                  <p className="text-sm text-gray-500 mt-1">{product.reviewCount.toLocaleString()} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => {
                    const count = product.reviews.filter(r => Math.round(r.rating) === star).length
                    const pct = product.reviews.length ? (count / product.reviews.length) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-right">{star}</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amazon-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-6 text-gray-500">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {product.reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
              ) : (
                product.reviews.map(review => (
                  <div key={review.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{review.userName}</p>
                        <StarRating rating={review.rating} size={13} />
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">{review.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{review.helpful} people found this helpful</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
