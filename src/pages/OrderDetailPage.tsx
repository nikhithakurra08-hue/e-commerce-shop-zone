import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Package, Truck, CheckCircle, XCircle, ChevronRight, Download, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { cancelOrder, returnOrder } from '../store/slices/orderSlice'
import { formatCurrency, formatDate, getStatusColor } from '../utils/format'

const TRACKING_STEPS = [
  { status: 'placed', label: 'Order Placed', icon: Package },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'packed', label: 'Packed', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
]

const STATUS_ORDER = ['placed', 'confirmed', 'packed', 'shipped', 'delivered']

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const order = useAppSelector(s => s.orders.orders.find(o => o.id === id))

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Package size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3">Order not found</h2>
        <Link to="/orders" className="btn-primary">Back to Orders</Link>
      </div>
    )
  }

  const currentStep = STATUS_ORDER.indexOf(order.orderStatus)
  const isCancellable = ['placed', 'confirmed'].includes(order.orderStatus)
  const isReturnable = order.orderStatus === 'delivered'

  const handleCancel = () => {
    if (window.confirm('Cancel this order?')) {
      dispatch(cancelOrder(order.id))
      toast.success('Order cancelled')
    }
  }

  const handleReturn = () => {
    if (window.confirm('Request a return for this order?')) {
      dispatch(returnOrder(order.id))
      toast.success('Return request submitted')
    }
  }

  return (
    <>
      <Helmet><title>Order {order.id} — ShopZone</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 mb-5 transition-colors">
          <ArrowLeft size={16} /> Back to Orders
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Order {order.id}</h1>
            <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`badge ${getStatusColor(order.orderStatus)} capitalize`}>{order.orderStatus}</span>
            <span className={`badge ${getStatusColor(order.paymentStatus)} capitalize`}>{order.paymentStatus}</span>
            {isCancellable && (
              <button onClick={handleCancel} className="flex items-center gap-1 text-xs text-red-500 border border-red-200 rounded-full px-3 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <XCircle size={12} /> Cancel Order
              </button>
            )}
            {isReturnable && (
              <button onClick={handleReturn} className="text-xs text-amazon-600 border border-amazon-200 rounded-full px-3 py-1 hover:bg-amazon-50 dark:hover:bg-amazon-900/20 transition-colors">
                Request Return
              </button>
            )}
            <button onClick={() => toast.success('Invoice downloaded (mock)')} className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download size={12} /> Invoice
            </button>
          </div>
        </div>

        {/* Tracking */}
        {!['cancelled', 'returned'].includes(order.orderStatus) && (
          <div className="card p-6 mb-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Tracking</h2>
            {order.trackingId && <p className="text-sm text-gray-500 mb-4">Tracking ID: <span className="font-medium text-amazon-600">{order.trackingId}</span></p>}
            <div className="flex items-center gap-0">
              {TRACKING_STEPS.map((s, i) => {
                const done = i <= currentStep
                const active = i === currentStep
                return (
                  <div key={s.status} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${done ? 'bg-amazon-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                        <s.icon size={16} />
                      </div>
                      <p className={`text-xs mt-1.5 text-center ${active ? 'text-amazon-600 font-semibold' : done ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>{s.label}</p>
                    </div>
                    {i < TRACKING_STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 ${i < currentStep ? 'bg-amazon-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                )
              })}
            </div>
            {order.estimatedDelivery && order.orderStatus !== 'delivered' && (
              <p className="text-sm text-gray-500 mt-4">Estimated delivery: <span className="font-medium text-gray-800 dark:text-gray-200">{formatDate(order.estimatedDelivery)}</span></p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {/* Items */}
          <div className="md:col-span-2 card p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <Link to={`/products/${item.product.slug}`}>
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50 dark:bg-gray-800 hover:opacity-80 transition-opacity" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.product.slug}`} className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-amazon-600 line-clamp-2">{item.product.name}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="card p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Price Summary</h3>
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className={order.shipping === 0 ? 'text-green-600' : ''}>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
                {order.couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Coupon ({order.couponCode})</span><span>-{formatCurrency(order.couponDiscount)}</span></div>}
                <hr className="border-gray-100 dark:border-gray-700" />
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-sm"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
              </div>
            </div>

            <div className="card p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Delivery Address</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                <p className="font-medium text-gray-800 dark:text-gray-200">{order.address.name}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>{order.address.city}, {order.address.state} — {order.address.pincode}</p>
              </div>
            </div>

            <div className="card p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">Payment</h3>
              <p className="text-xs text-gray-500 capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
              <span className={`badge ${getStatusColor(order.paymentStatus)} mt-1 capitalize`}>{order.paymentStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
