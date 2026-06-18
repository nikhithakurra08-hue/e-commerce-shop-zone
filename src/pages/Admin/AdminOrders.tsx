import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, Eye, ArrowRight, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { cancelOrder, returnOrder, updateOrderStatus } from '../../store/slices/orderSlice'
import { formatCurrency, formatDate, getStatusColor } from '../../utils/format'
import type { Order } from '../../types'

const STATUS_OPTIONS = ['all', 'placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned']
const PROGRESS_ORDER = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'] as const

const getNextStatus = (status: Order['orderStatus']) => {
  const idx = PROGRESS_ORDER.indexOf(status as typeof PROGRESS_ORDER[number])
  return idx >= 0 && idx < PROGRESS_ORDER.length - 1 ? PROGRESS_ORDER[idx + 1] : null
}

export default function AdminOrders() {
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(s => s.orders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null)

  const filtered = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.userId.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const selectedOrders = orders.filter(o => selectedIds.includes(o.id))
  const visibleSelected = filtered.length > 0 && filtered.every(o => selectedIds.includes(o.id))
  const hasAdvance = selectedOrders.some(o => getNextStatus(o.orderStatus))
  const hasCancel = selectedOrders.some(o => ['placed', 'confirmed', 'packed', 'shipped'].includes(o.orderStatus))
  const hasDeliver = selectedOrders.some(o => o.orderStatus === 'shipped')
  const hasReturn = selectedOrders.some(o => o.orderStatus === 'delivered')

  const toggleSelectAll = () => {
    if (visibleSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map(o => o.id))
    }
  }

  const toggleOrder = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const handleAdvanceSelected = () => {
    selectedOrders.forEach(order => {
      const next = getNextStatus(order.orderStatus)
      if (next) {
        dispatch(updateOrderStatus({ id: order.id, status: next }))
      }
    })
    toast.success('Selected orders advanced')
    setSelectedIds([])
  }

  const handleCancelSelected = () => {
    selectedOrders.forEach(order => {
      if (['placed', 'confirmed', 'packed', 'shipped'].includes(order.orderStatus)) {
        dispatch(cancelOrder(order.id))
      }
    })
    toast.success('Selected orders cancelled')
    setSelectedIds([])
  }

  const handleDeliverSelected = () => {
    selectedOrders.forEach(order => {
      if (order.orderStatus === 'shipped') {
        dispatch(updateOrderStatus({ id: order.id, status: 'delivered' }))
      }
    })
    toast.success('Selected orders marked delivered')
    setSelectedIds([])
  }

  const handleReturnSelected = () => {
    selectedOrders.forEach(order => {
      if (order.orderStatus === 'delivered') {
        dispatch(returnOrder(order.id))
      }
    })
    toast.success('Selected orders returned')
    setSelectedIds([])
  }

  return (
    <>
      <Helmet><title>Orders — Admin — ShopZone</title></Helmet>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} total orders</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID…" className="input pl-9 max-w-xs" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input w-auto text-sm capitalize">
            {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s === 'all' ? 'All Status' : s}</option>)}
          </select>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedIds.length} selected</p>
            <button disabled={!hasAdvance} onClick={handleAdvanceSelected} className={`badge ${hasAdvance ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Advance Selected
            </button>
            <button disabled={!hasDeliver} onClick={handleDeliverSelected} className={`badge ${hasDeliver ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Mark Delivered
            </button>
            <button disabled={!hasCancel} onClick={handleCancelSelected} className={`badge ${hasCancel ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Cancel Selected
            </button>
            <button disabled={!hasReturn} onClick={handleReturnSelected} className={`badge ${hasReturn ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              Return Selected
            </button>
          </div>
        )}

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    <input type="checkbox" checked={visibleSelected} onChange={toggleSelectAll} className="rounded border-gray-300 text-amazon-600 focus:ring-amazon-500" />
                  </th>
                  {['Order ID', 'User', 'Items', 'Total', 'Payment', 'Order Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => toggleOrder(order.id)}
                        className="rounded border-gray-300 text-amazon-600 focus:ring-amazon-500"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-amazon-600">{order.id}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{order.userId}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{order.items.length}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge capitalize text-xs ${getStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge capitalize text-xs ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1">
                        {getNextStatus(order.orderStatus) && (
                          <button
                            onClick={() => {
                              const next = getNextStatus(order.orderStatus)
                              if (next) {
                                dispatch(updateOrderStatus({ id: order.id, status: next }))
                                toast.success(`Order moved to ${next}`)
                              }
                            }}
                            className="badge bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          >
                            <ArrowRight size={12} /> {getNextStatus(order.orderStatus)}
                          </button>
                        )}
                        {['placed', 'confirmed', 'packed'].includes(order.orderStatus) && (
                          <button
                            onClick={() => {
                              dispatch(cancelOrder(order.id))
                              toast.success('Order cancelled')
                            }}
                            className="badge bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          >
                            <XCircle size={12} /> Cancel
                          </button>
                        )}
                        {order.orderStatus === 'shipped' && (
                          <button
                            onClick={() => {
                              dispatch(updateOrderStatus({ id: order.id, status: 'delivered' }))
                              toast.success('Order marked delivered')
                            }}
                            className="badge bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                          >
                            <CheckCircle2 size={12} /> Delivered
                          </button>
                        )}
                        {order.orderStatus === 'delivered' && (
                          <button
                            onClick={() => {
                              dispatch(returnOrder(order.id))
                              toast.success('Order returned')
                            }}
                            className="badge bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                          >
                            <RotateCcw size={12} /> Return
                          </button>
                        )}
                        <button onClick={() => setPreviewOrder(order)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-800 inline-flex">
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No orders found.</div>
          )}
        </div>
      </div>

      {previewOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Preview</h2>
                <p className="text-sm text-gray-500">{previewOrder.id} — {previewOrder.userId}</p>
              </div>
              <button onClick={() => setPreviewOrder(null)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Close</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`badge ${getStatusColor(previewOrder.orderStatus)} capitalize`}>{previewOrder.orderStatus}</span>
                    <span className={`badge ${getStatusColor(previewOrder.paymentStatus)} capitalize`}>{previewOrder.paymentStatus}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Order Date</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{formatDate(previewOrder.createdAt)}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="card p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Delivery Address</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{previewOrder.address.name}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{previewOrder.address.phone}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{previewOrder.address.line1}</p>
                  {previewOrder.address.line2 && <p className="text-sm text-gray-700 dark:text-gray-300">{previewOrder.address.line2}</p>}
                  <p className="text-sm text-gray-700 dark:text-gray-300">{previewOrder.address.city}, {previewOrder.address.state} {previewOrder.address.pincode}</p>
                </div>
                <div className="card p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Payment</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">{previewOrder.paymentMethod}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Total: {formatCurrency(previewOrder.total)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Items</h3>
                <div className="space-y-3">
                  {previewOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
