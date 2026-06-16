import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Package } from 'lucide-react'
import { useAppSelector } from '../hooks/useAppDispatch'
import { formatCurrency, formatDate, getStatusColor } from '../utils/format'

export default function OrdersPage() {
  const { orders } = useAppSelector(s => s.orders)
  const { user } = useAppSelector(s => s.auth)
  const userOrders = orders.filter(o => o.userId === user?.id)

  if (userOrders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Package size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Your orders will appear here once you make a purchase.</p>
        <Link to="/products" className="btn-primary text-base px-8 py-3 inline-flex">Start Shopping</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>My Orders — ShopZone</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
        <div className="space-y-4">
          {userOrders.map(order => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Placed on</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`badge ${getStatusColor(order.orderStatus)} capitalize`}>{order.orderStatus}</span>
                  <span className={`badge ${getStatusColor(order.paymentStatus)} capitalize`}>{order.paymentStatus}</span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg bg-gray-50 dark:bg-gray-800 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} · {formatCurrency(item.price)}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-sm text-gray-500">Total: </span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.total)}</span>
                  <span className="text-xs text-gray-400 ml-2 capitalize">via {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</span>
                </div>
                <Link to={`/orders/${order.id}`} className="text-sm text-amazon-600 hover:text-amazon-700 font-medium hover:underline">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
