import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Trash2, Plus, Minus, ShoppingBag, Heart, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { removeFromCart, updateQuantity, saveForLater, moveToCart, removeSaved } from '../store/slices/cartSlice'
import { toggleWishlist } from '../store/slices/wishlistSlice'
import { formatCurrency, calculateTax, calculateShipping } from '../utils/format'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, savedForLater } = useAppSelector(s => s.cart)
  const { isAuthenticated } = useAppSelector(s => s.auth)

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items to your cart to see them here.</p>
        <Link to="/products" className="btn-primary text-base px-8 py-3 inline-flex">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Cart — ShopZone</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shopping Cart ({items.length} items)</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="card p-4 flex gap-4">
                <Link to={`/products/${item.product.slug}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.product.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-amazon-600 line-clamp-2 text-sm">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">{item.product.brand}</p>
                  <p className="text-green-600 text-xs mt-0.5">In Stock</p>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button onClick={() => { if (item.quantity <= 1) { dispatch(removeFromCart(item.product.id)); toast.success('Removed') } else dispatch(updateQuantity({ id: item.product.id, qty: item.quantity - 1 })) }} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.product.id, qty: Math.min(item.product.stock, item.quantity + 1) }))} className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => { dispatch(saveForLater(item.product.id)); toast.success('Saved for later') }} className="text-xs text-amazon-600 hover:underline">Save for Later</button>
                    <button onClick={() => { dispatch(toggleWishlist(item.product)); toast.success('Moved to wishlist') }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                      <Heart size={12} /> Wishlist
                    </button>
                    <button onClick={() => { dispatch(removeFromCart(item.product.id)); toast.success('Removed') }} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600">
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Saved for later */}
            {savedForLater.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Saved for Later ({savedForLater.length})</h2>
                {savedForLater.map(item => (
                  <div key={item.product.id} className="card p-4 flex gap-4 opacity-80">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{item.product.name}</p>
                      <p className="text-sm font-bold mt-1">{formatCurrency(item.product.price)}</p>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => { dispatch(moveToCart(item.product.id)); toast.success('Moved to cart') }} className="text-xs text-amazon-600 hover:underline">Move to Cart</button>
                        <button onClick={() => dispatch(removeSaved(item.product.id))} className="text-xs text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="card p-5 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (9%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                {shipping === 0 && <p className="text-green-600 text-xs">🎉 You saved on delivery!</p>}
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} disabled={items.length === 0} className="w-full btn-primary mt-5 py-3 text-base flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <Link to="/products" className="block text-center text-sm text-amazon-600 hover:underline mt-3">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
