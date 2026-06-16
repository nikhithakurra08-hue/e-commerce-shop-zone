import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { formatCurrency, formatDate, getStatusColor } from '../../utils/format'

const STATUS_OPTIONS = ['all', 'placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned']

export default function AdminOrders() {
  const { orders } = useAppSelector(s => s.orders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.userId.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

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

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['Order ID', 'User', 'Items', 'Total', 'Payment', 'Order Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
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
                      <Link to={`/orders/${order.id}`} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-800 inline-flex">
                        <Eye size={15} />
                      </Link>
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
    </>
  )
}
