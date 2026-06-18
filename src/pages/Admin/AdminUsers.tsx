import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2, Shield, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { addUser, removeUser, updateUser } from '../../store/slices/userSlice'
import { formatDate } from '../../utils/format'
import type { User as UserType } from '../../types'

export default function AdminUsers() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(s => s.users.items)
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'user' as UserType['role'] })

  const stats = useMemo(() => ({
    admins: users.filter(u => u.role === 'admin').length,
    customers: users.filter(u => u.role === 'user').length,
  }), [users])

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this user?')) {
      dispatch(removeUser(id))
      toast.success('User removed')
    }
  }

  const handleEdit = (user: UserType) => {
    setEditUser(user)
    setFormData({ name: user.name, email: user.email, phone: user.phone || '', role: user.role })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required')
      return
    }

    const payload: UserType = {
      id: editUser ? editUser.id : 'u_' + Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role,
      addresses: editUser?.addresses || [],
      createdAt: editUser?.createdAt || new Date().toISOString(),
    }

    if (editUser) {
      dispatch(updateUser(payload))
      toast.success('User updated')
    } else {
      dispatch(addUser(payload))
      toast.success('User added')
    }

    setShowForm(false)
    setEditUser(null)
    setFormData({ name: '', email: '', phone: '', role: 'user' })
  }

  return (
    <>
      <Helmet><title>Users — Admin — ShopZone</title></Helmet>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Users</h1>
            <p className="text-sm text-gray-500">{users.length} registered users</p>
          </div>
          <button onClick={() => { setEditUser(null); setFormData({ name: '', email: '', phone: '', role: 'user' }); setShowForm(true) }} className="btn-primary flex items-center gap-2 text-sm py-2">
            <Plus size={16} /> Add User
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.admins}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Customers</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.customers}</p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
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
                    <td className="px-4 py-3 flex gap-1">
                      <button onClick={() => handleEdit(u)} className="p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <div className="p-8 text-center text-gray-400">No users available.</div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{editUser ? 'Edit User' : 'Add User'}</h2>
              <div className="space-y-3">
                <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="Full name *" className="input text-sm" />
                <input value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} placeholder="Email *" type="email" className="input text-sm" />
                <input value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" className="input text-sm" />
                <select value={formData.role} onChange={e => setFormData(f => ({ ...f, role: e.target.value as UserType['role'] }))} className="input text-sm">
                  <option value="user">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleSave} className="flex-1 btn-primary py-2.5">Save</button>
                <button onClick={() => setShowForm(false)} className="flex-1 btn-outline py-2.5">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
