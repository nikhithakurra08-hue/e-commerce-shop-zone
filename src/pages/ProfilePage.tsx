import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { User, MapPin, Package, Heart, Lock, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { updateProfile } from '../store/slices/authSlice'
import { formatDate } from '../utils/format'
import type { Address } from '../types'

type Tab = 'profile' | 'addresses' | 'security'

interface ProfileForm { name: string; phone: string }
interface AddressForm { name: string; phone: string; line1: string; line2?: string; city: string; state: string; pincode: string }

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(s => s.auth)
  const orderCount = useAppSelector(s => s.orders.orders.filter(o => o.userId === user?.id).length)
  const wishlistCount = useAppSelector(s => s.wishlist.items.length)
  const [tab, setTab] = useState<Tab>('profile')
  const [addingAddress, setAddingAddress] = useState(false)

  const { register: regProfile, handleSubmit: hsProfile, formState: { isDirty } } = useForm<ProfileForm>({
    defaultValues: { name: user?.name || '', phone: user?.phone || '' }
  })
  const { register: regAddr, handleSubmit: hsAddr, reset: resetAddr } = useForm<AddressForm>()

  const saveProfile = hsProfile(data => {
    dispatch(updateProfile(data))
    toast.success('Profile updated')
  })

  const saveAddress = hsAddr(data => {
    const addr: Address = { ...data, id: 'a_' + Date.now(), isDefault: false, country: 'India', line2: data.line2 || '' }
    dispatch(updateProfile({ addresses: [...(user?.addresses || []), addr] }))
    resetAddr()
    setAddingAddress(false)
    toast.success('Address added')
  })

  const deleteAddress = (id: string) => {
    dispatch(updateProfile({ addresses: user?.addresses.filter(a => a.id !== id) || [] }))
    toast.success('Address removed')
  }

  const setDefault = (id: string) => {
    dispatch(updateProfile({ addresses: user?.addresses.map(a => ({ ...a, isDefault: a.id === id })) || [] }))
    toast.success('Default address updated')
  }

  const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'security', label: 'Security', icon: Lock },
  ] as const

  return (
    <>
      <Helmet><title>My Profile — ShopZone</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile header */}
        <div className="card p-6 mb-6 flex flex-wrap items-center gap-5">
          <div className="w-16 h-16 bg-amazon-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Member since {formatDate(user?.createdAt || '')}</p>
          </div>
          <div className="flex gap-5 text-center">
            <div><p className="text-2xl font-bold text-amazon-600">{orderCount}</p><p className="text-xs text-gray-500">Orders</p></div>
            <div><p className="text-2xl font-bold text-amazon-600">{wishlistCount}</p><p className="text-xs text-gray-500">Wishlist</p></div>
            <div><p className="text-2xl font-bold text-amazon-600">{user?.addresses.length || 0}</p><p className="text-xs text-gray-500">Addresses</p></div>
          </div>
        </div>

        <div className="flex gap-1 mb-5 border-b border-gray-200 dark:border-gray-700">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.id ? 'border-amazon-500 text-amazon-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'profile' && (
          <div className="card p-6 max-w-lg">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
            <form onSubmit={saveProfile} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Full Name</label>
                <input {...regProfile('name', { required: true })} className="input" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Email</label>
                <input value={user?.email} disabled className="input opacity-60 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Phone</label>
                <input {...regProfile('phone')} className="input" placeholder="+91 XXXXXXXXXX" />
              </div>
              <button type="submit" className="btn-primary py-2.5 px-6" disabled={!isDirty}>
                Save Changes
              </button>
            </form>
          </div>
        )}

        {tab === 'addresses' && (
          <div className="space-y-4 max-w-2xl">
            {user?.addresses.map(addr => (
              <div key={addr.id} className="card p-4">
                <div className="flex justify-between items-start">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 dark:text-white">{addr.name} <span className="text-gray-400 font-normal">{addr.phone}</span></p>
                    <p className="text-gray-600 dark:text-gray-400 mt-0.5">{addr.line1}{addr.line2 ? ', ' + addr.line2 : ''}</p>
                    <p className="text-gray-600 dark:text-gray-400">{addr.city}, {addr.state} — {addr.pincode}</p>
                    {addr.isDefault && <span className="badge bg-amazon-100 text-amazon-700 mt-1">Default</span>}
                  </div>
                  <div className="flex gap-2">
                    {!addr.isDefault && <button onClick={() => setDefault(addr.id)} className="text-xs text-amazon-600 hover:underline">Set Default</button>}
                    <button onClick={() => deleteAddress(addr.id)} className="text-red-500 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))}

            {!addingAddress ? (
              <button onClick={() => setAddingAddress(true)} className="flex items-center gap-2 btn-outline text-sm py-2 px-4">
                <Plus size={16} /> Add New Address
              </button>
            ) : (
              <div className="card p-5">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">New Address</h3>
                <form onSubmit={saveAddress} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input {...regAddr('name', { required: true })} className="input text-sm" placeholder="Name *" />
                    <input {...regAddr('phone', { required: true })} className="input text-sm" placeholder="Phone *" />
                  </div>
                  <input {...regAddr('line1', { required: true })} className="input text-sm" placeholder="Address Line 1 *" />
                  <input {...regAddr('line2')} className="input text-sm" placeholder="Address Line 2 (optional)" />
                  <div className="grid grid-cols-3 gap-3">
                    <input {...regAddr('city', { required: true })} className="input text-sm" placeholder="City *" />
                    <input {...regAddr('state', { required: true })} className="input text-sm" placeholder="State *" />
                    <input {...regAddr('pincode', { required: true })} className="input text-sm" placeholder="Pincode *" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary text-sm py-2 px-4">Save</button>
                    <button type="button" onClick={() => setAddingAddress(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {tab === 'security' && (
          <div className="card p-6 max-w-lg">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Current Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">New Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Confirm New Password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>
              <button onClick={() => toast.success('Password updated (demo mode)')} className="btn-primary py-2.5 px-6">Update Password</button>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account.</p>
              <button onClick={() => toast('2FA setup coming soon!', { icon: '🔐' })} className="btn-outline text-sm py-2 px-4">Enable 2FA</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
