import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Plus, Minus,
  MapPin, CheckCircle, XCircle, Zap, Star, ThumbsUp, MessageSquare, Package, BadgeCheck,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { addToCart, updateQuantity } from '../store/slices/cartSlice'
import { toggleWishlist } from '../store/slices/wishlistSlice'
import { addRecentlyViewed } from '../store/slices/uiSlice'
import StarRating from '../components/common/StarRating'
import ProductCard from '../components/product/ProductCard'
import { formatCurrency, formatDate } from '../utils/format'
import { ProductDetailSkeleton } from '../components/common/Skeleton'

const PINCODES: Record<string, { city: string; days: number }> = {
  '560001': { city: 'Bangalore', days: 2 },
  '400001': { city: 'Mumbai', days: 2 },
  '110001': { city: 'Delhi', days: 1 },
  '600001': { city: 'Chennai', days: 3 },
  '700001': { city: 'Kolkata', days: 3 },
  '500001': { city: 'Hyderabad', days: 2 },
  '380001': { city: 'Ahmedabad', days: 3 },
  '411001': { city: 'Pune', days: 2 },
}

function getDeliveryDate(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loginLink = `/login?next=${encodeURIComponent(location.pathname + location.search)}`
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'qna'>('desc')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState<null | { valid: boolean; city?: string; days?: number }>()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' })
  const [newQuestion, setNewQuestion] = useState('')
  const [showQnAForm, setShowQnAForm] = useState(false)
  const [imgZoom, setImgZoom] = useState(false)

  const products = useAppSelector(s => s.products.items)
  const product = products.find(p => p.slug === slug)
  const cartItems = useAppSelector(s => s.cart.items)
  const wishlistIds = useAppSelector(s => s.wishlist.items.map(i => i.product.id))
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const inCart = product ? cartItems.some(i => i.product.id === product.id) : false
  const isWishlisted = product ? wishlistIds.includes(product.id) : false

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [slug])

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product.id))
      if (product.variants) {
        const defaults: Record<string, string> = {}
        product.variants.forEach(v => { defaults[v.type] = v.options[0] })
        setSelectedVariants(defaults)
      }
    }
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

  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 6)
  const frequentlyBought = products.filter(p => p.categoryId !== product.categoryId && p.isBestSeller).slice(0, 3)

  const handleAddToCart = () => {
    const computedPrice = getVariantPrice(product, selectedVariants)
    dispatch(addToCart({ product, quantity: qty, selectedVariants: selectedVariants, price: computedPrice }))
    toast.success('Added to cart!')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  function getVariantPrice(product: typeof products[number], selected: Record<string, string>) {
    let price = product.price
    // Simple adjustments for storage/ram variants
    const storage = selected.storage || ''
    if (storage.includes('512')) price += 10000
    if (storage.includes('1TB') || storage.includes('2TB')) price += 30000
    const ram = selected.ram || ''
    if (ram.includes('16GB')) price += 5000
    if (ram.includes('24GB')) price += 10000
    return price
  }

  const handlePincodeCheck = () => {
    const result = PINCODES[pincode.trim()]
    if (result) {
      setPincodeResult({ valid: true, ...result })
    } else if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeResult({ valid: true, city: 'your location', days: 5 })
    } else {
      setPincodeResult({ valid: false })
    }
  }

  const avgRating = product.reviews.length
    ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    : product.rating

  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: product.reviews.filter(r => Math.round(r.rating) === star).length,
    pct: product.reviews.length ? (product.reviews.filter(r => Math.round(r.rating) === star).length / product.reviews.length) * 100 : 0,
  }))

  return (
    <>
      <Helmet>
        <title>{product.name} — ShopZone</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 flex-wrap">
          <Link to="/" className="hover:text-amazon-600">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-amazon-600">Products</Link>
          <ChevronRight size={12} />
          <Link to={`/products?category=${product.categoryId}`} className="hover:text-amazon-600">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-6">
          {/* ── Images (left) ── */}
          <div className="md:col-span-5 space-y-3">
            <div
              className="card overflow-hidden bg-white dark:bg-gray-900 aspect-square flex items-center justify-center p-4 cursor-zoom-in relative"
              onClick={() => setImgZoom(v => !v)}
            >
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className={`max-h-96 w-full object-contain transition-transform duration-300 ${imgZoom ? 'scale-150' : 'scale-100'}`}
              />
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">NEW</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => { setSelectedImg(i); setImgZoom(false) }}
                    className={`card p-1.5 w-16 h-16 flex items-center justify-center transition-all flex-shrink-0 ${selectedImg === i ? 'ring-2 ring-amazon-500' : 'hover:ring-1 ring-gray-300'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 text-center">Click image to zoom</p>
          </div>

          {/* ── Details (center) ── */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-amazon-600 font-semibold">{product.brand}</p>
                {product.isAssured && (
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    <BadgeCheck size={11} /> Assured
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  <span>{avgRating.toFixed(1)}</span>
                  <Star size={11} className="fill-white" />
                </div>
                <span className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} ratings & reviews</span>
                {product.isBestSeller && <span className="bg-amazon-100 text-amazon-700 text-xs font-bold px-2 py-0.5 rounded">#1 Best Seller</span>}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                    <span className="text-green-600 font-semibold text-sm">{product.discount}% off</span>
                  </>
                )}
              </div>
              {product.hasEMI && (
                <p className="text-sm text-gray-500 mt-1">
                  EMI from <span className="text-amazon-600 font-medium">₹{Math.round(product.price / 12).toLocaleString()}/month</span>
                  <span className="text-xs"> (No-cost EMI available)</span>
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                {product.stock > 0 ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle size={14} /> In Stock
                    {product.stock <= 10 && <span className="text-orange-500 ml-1">— Only {product.stock} left!</span>}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 text-sm font-medium"><XCircle size={14} /> Out of Stock</span>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.map(variant => (
              <div key={variant.type}>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {variant.type}: <span className="text-gray-900 dark:text-white">{selectedVariants[variant.type]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants(v => ({ ...v, [variant.type]: opt }))}
                      className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariants[variant.type] === opt
                          ? 'border-amazon-500 bg-amazon-50 dark:bg-amazon-900/20 text-amazon-700 dark:text-amazon-400 shadow-sm'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Minus size={14} /></button>
                <span className="px-4 py-2 font-semibold text-sm min-w-[40px] text-center border-x border-gray-300 dark:border-gray-600">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Plus size={14} /></button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all shadow-sm ${
                  product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                  inCart ? 'bg-green-500 hover:bg-green-600 text-white' : 'btn-primary'
                }`}>
                <ShoppingCart size={18} />
                {inCart ? 'Go to Cart' : 'Add to Cart'}
              </button>
              <button onClick={handleBuyNow} disabled={product.stock === 0}
                className="flex-1 bg-amazon-400 hover:bg-amazon-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <Zap size={18} />
                Buy Now
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { dispatch(toggleWishlist(product)); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist') }}
                className="flex items-center gap-2 btn-outline text-sm py-2 flex-1 justify-center">
                <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }}
                className="flex items-center gap-2 btn-outline text-sm py-2 px-4">
                <Share2 size={15} /> Share
              </button>
            </div>
          </div>

          {/* ── Buy Box (right) ── */}
          <div className="md:col-span-2 space-y-4">
            <div className="card p-4 space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</p>
                {product.freeDelivery ? (
                  <p className="text-sm text-green-600 font-medium mt-1">FREE Delivery</p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">₹49 Delivery</p>
                )}
              </div>

              {/* Delivery estimate */}
              <div className="text-sm space-y-1">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Delivers by:</span>{' '}
                  <span className="text-green-700 dark:text-green-400 font-medium">{getDeliveryDate(product.deliveryDays ?? 5)}</span>
                </p>
                <p className="text-gray-500 text-xs">Order within 2 hours for fastest delivery</p>
              </div>

              {/* Pincode checker */}
              <div>
                <div className="flex gap-1.5">
                  <div className="flex-1 flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm">
                    <MapPin size={13} className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setPincodeResult(null) }}
                      placeholder="Enter pincode"
                      className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 text-xs"
                    />
                  </div>
                  <button onClick={handlePincodeCheck} disabled={pincode.length < 6}
                    className="bg-amazon-500 hover:bg-amazon-600 text-white text-xs font-semibold px-3 rounded-lg transition-colors disabled:opacity-50">
                    Check
                  </button>
                </div>
                {pincodeResult && (
                  <div className={`mt-1.5 text-xs px-2 py-1.5 rounded flex items-center gap-1.5 ${pincodeResult.valid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                    {pincodeResult.valid ? (
                      <><CheckCircle size={11} /> Delivery to {pincodeResult.city} in <strong>{pincodeResult.days} days</strong></>
                    ) : (
                      <><XCircle size={11} /> Invalid pincode</>
                    )}
                  </div>
                )}
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <Truck size={14} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800 dark:text-gray-200">Free Delivery</strong> on orders above ₹499</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield size={14} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800 dark:text-gray-200">Secure Payment</strong> 100% safe & encrypted</span>
                </div>
                <div className="flex items-start gap-2">
                  <RefreshCw size={14} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800 dark:text-gray-200">Easy Returns</strong> 30-day hassle-free returns</span>
                </div>
                <div className="flex items-start gap-2">
                  <Package size={14} className="text-amazon-500 flex-shrink-0 mt-0.5" />
                  <span>SKU: <span className="font-mono">{product.sku}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Frequently Bought Together ── */}
        {frequentlyBought.length > 0 && (
          <section className="mt-8 card p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Frequently Bought Together</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-center">
                  <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 bg-white dark:bg-gray-800 mx-auto" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 w-24">{product.name}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</p>
                </div>
                {frequentlyBought.map(fp => (
                  <div key={fp.id} className="flex items-center gap-3">
                    <span className="text-2xl text-gray-400 font-light">+</span>
                    <div className="text-center">
                      <Link to={`/products/${fp.slug}`}>
                        <img src={fp.images[0]} alt={fp.name} className="w-24 h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 bg-white dark:bg-gray-800 mx-auto hover:opacity-80 transition-opacity" />
                      </Link>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1 w-24">{fp.name}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(fp.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total price:</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.price + frequentlyBought.reduce((s, p) => s + p.price, 0))}
                </p>
                <button className="mt-2 btn-primary text-sm py-2 px-5">Add All to Cart</button>
              </div>
            </div>
          </section>
        )}

        {/* ── Tabs ── */}
        <div className="mt-8">
          <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
            {([
              ['desc', 'Description'],
              ['specs', 'Specifications'],
              ['reviews', `Reviews (${product.reviewCount.toLocaleString()})`],
              ['qna', `Q&A (${product.qna?.length ?? 0})`],
            ] as const).map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab ? 'border-amazon-500 text-amazon-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === 'desc' && (
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="text-base">{product.description}</p>
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 not-prose">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Specs */}
          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-2">
              {Object.entries(product.specifications).map(([k, v], i) => (
                <div key={k} className={`flex items-start gap-3 p-3 text-sm rounded-lg ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'}`}>
                  <span className="font-medium text-gray-500 dark:text-gray-400 w-36 flex-shrink-0">{k}</span>
                  <span className="text-gray-900 dark:text-white">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              {/* Rating summary */}
              <div className="flex items-center gap-8 p-5 card">
                <div className="text-center">
                  <p className="text-5xl font-bold text-gray-900 dark:text-white">{avgRating.toFixed(1)}</p>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(avgRating) ? 'text-amazon-500 fill-amazon-500' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{product.reviewCount.toLocaleString()} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingDist.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-10 text-right text-gray-500">{star} ★</span>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amazon-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write review button */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
                {isAuthenticated ? (
                  <button onClick={() => setShowReviewForm(v => !v)} className="btn-outline text-sm py-2 flex items-center gap-2">
                    <Star size={14} /> Write a Review
                  </button>
                ) : (
                  <Link to={loginLink} className="btn-outline text-sm py-2 flex items-center gap-2">
                    <Star size={14} /> Sign in to Review
                  </Link>
                )}
              </div>

              {/* Review form */}
              {showReviewForm && (
                <div className="card p-5 space-y-4 border-2 border-amazon-200 dark:border-amazon-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Your Review</h4>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} onClick={() => setNewReview(r => ({ ...r, rating: s }))}>
                          <Star size={24} className={s <= newReview.rating ? 'text-amazon-500 fill-amazon-500' : 'text-gray-300 hover:text-amazon-400'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Review Title</label>
                    <input value={newReview.title} onChange={e => setNewReview(r => ({ ...r, title: e.target.value }))}
                      placeholder="Sum up your experience" className="input w-full" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Your Review</label>
                    <textarea value={newReview.comment} onChange={e => setNewReview(r => ({ ...r, comment: e.target.value }))}
                      placeholder="What did you like or dislike? How did you use it?" rows={4} className="input w-full resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { toast.success('Review submitted!'); setShowReviewForm(false); setNewReview({ rating: 5, title: '', comment: '' }) }}
                      disabled={!newReview.title || !newReview.comment}
                      className="btn-primary px-6 py-2 text-sm disabled:opacity-50">
                      Submit Review
                    </button>
                    <button onClick={() => setShowReviewForm(false)} className="btn-outline px-5 py-2 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              {/* Review list */}
              {product.reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Star size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                product.reviews.map(review => (
                  <div key={review.id} className="card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amazon-100 dark:bg-amazon-900/30 flex items-center justify-center text-amazon-600 font-bold text-sm flex-shrink-0">
                          {review.userName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.userName}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={11} className={i < Math.floor(review.rating) ? 'text-amazon-500 fill-amazon-500' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{review.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-amazon-600 transition-colors">
                        <ThumbsUp size={12} /> Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Q&A */}
          {activeTab === 'qna' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Questions & Answers</h3>
                {isAuthenticated ? (
                  <button onClick={() => setShowQnAForm(v => !v)} className="btn-outline text-sm py-2 flex items-center gap-2">
                    <MessageSquare size={14} /> Ask a Question
                  </button>
                ) : (
                  <Link to={loginLink} className="btn-outline text-sm py-2 flex items-center gap-2">
                    <MessageSquare size={14} /> Sign in to Ask
                  </Link>
                )}
              </div>

              {showQnAForm && (
                <div className="card p-5 space-y-3 border-2 border-amazon-200 dark:border-amazon-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Your Question</h4>
                  <textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)}
                    placeholder="Ask something about this product..." rows={3} className="input w-full resize-none text-sm" />
                  <div className="flex gap-3">
                    <button onClick={() => { toast.success('Question submitted!'); setShowQnAForm(false); setNewQuestion('') }}
                      disabled={!newQuestion.trim()} className="btn-primary px-5 py-2 text-sm disabled:opacity-50">
                      Submit
                    </button>
                    <button onClick={() => setShowQnAForm(false)} className="btn-outline px-4 py-2 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              {(!product.qna || product.qna.length === 0) ? (
                <div className="text-center py-10 text-gray-500">
                  <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No questions yet. Ask the first question!</p>
                </div>
              ) : (
                product.qna.map(item => (
                  <div key={item.id} className="card p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">Q</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.question}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Asked by {item.askedBy}</p>
                      </div>
                    </div>
                    {item.answer && (
                      <div className="flex items-start gap-3 ml-4 pl-4 border-l-2 border-green-200 dark:border-green-800">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">A</span>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{item.answer}</p>
                          {item.answeredBy && <p className="text-xs text-gray-400 mt-0.5">By {item.answeredBy}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Products</h2>
              <Link to={`/products?category=${product.categoryId}`} className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
