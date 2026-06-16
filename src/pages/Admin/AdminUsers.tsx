import { Helmet } from 'react-helmet-async'
import { mockUser, mockAdmin } from '../../data/mockData'
import { formatDate } from '../../utils/format'
import { Shield, User } from 'lucide-react'

const users = [mockAdmin, mockUser, { ...mockUser, id: 'u2', name: 'Priya Sharma', email: 'priya@example.com', createdAt: '2024-01-15', role: 'user' as const }, { ...mockUser, id: 'u3', name: 'Rahul Verma', email: 'rahul@example.com', createdAt: '2024-02-20', role: 'user' as const }]

export default function AdminUsers() {
  return (
    <>
      <Helmet><title>Users — Admin — ShopZone</title></Helmet>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-sm text-gray-500">{users.length} registered users</p>
        </div>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['User', 'Email', 'Role', 'Joined', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amazon-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {u.name[0]}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`badge flex items-center gap-1 w-fit ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                        {u.role === 'admin' ? <Shield size={11} /> : <User size={11} />} {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3"><span className="badge bg-green-100 text-green-700">Active</span></td>
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
