import { Helmet } from 'react-helmet-async'
import { ShoppingBag, Users, Package, TrendingUp, DollarSign, Star } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { salesData } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

export default function AdminDashboard() {
  const { orders } = useAppSelector(s => s.orders)
  const products = useAppSelector(s => s.products.items)

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((a, o) => a + o.total, 0)
  const totalOrders = orders.length
  const activeProducts = products.filter(p => p.stock > 0).length
  const avgRating = products.length ? (products.reduce((a, p) => a + p.rating, 0) / products.length).toFixed(1) : '0.0'

  const stats = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'bg-green-100 text-green-600 dark:bg-green-900/30', change: '+12%' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30', change: '+8%' },
    { label: 'Active Products', value: activeProducts, icon: Package, color: 'bg-amazon-100 text-amazon-600 dark:bg-amazon-900/30', change: '+3%' },
    { label: 'Avg Rating', value: avgRating + '★', icon: Star, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30', change: '+0.2' },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <>
      <Helmet><title>Admin Dashboard — ShopZone</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}><stat.icon size={20} /></div>
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => '₹' + (v / 1000) + 'k'} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="revenue" fill="#ff9900" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Orders Trend</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#131921" strokeWidth={2} dot={{ fill: '#ff9900' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['Order ID', 'Items', 'Status', 'Payment', 'Total', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 font-medium text-amazon-600">{order.id}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{order.items.length} item(s)</td>
                    <td className="px-4 py-3">
                      <span className={`badge capitalize text-xs px-2 py-0.5 rounded-full ${
                        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                        order.orderStatus === 'shipped' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{order.orderStatus}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
