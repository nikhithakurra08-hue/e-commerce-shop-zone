import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { CheckCircle, Plus, CreditCard, Banknote, Smartphone, Tag } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch'
import { clearCart } from '../store/slices/cartSlice'
import { placeOrder } from '../store/slices/orderSlice'
import { updateProfile } from '../store/slices/authSlice'
import { formatCurrency, calculateTax, calculateShipping, generateOrderId } from '../utils/format'
import { coupons } from '../data/mockData'
import type { Address, Order } from '../types'

type Step = 'address' | 'payment' | 'review' | 'success'

interface AddressForm {
  name: string; phone: string; line1: string; line2?: string
  city: string; state: string; pincode: string; country: string
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items } = useAppSelector(s => s.cart)
  const { user } = useAppSelector(s => s.auth)

  const [step, setStep] = useState<Step>('address')
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user?.addresses[0] || null)
  const [addingAddress, setAddingAddress] = useState(!user?.addresses.length)
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe' | 'cod'>('cod')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null)
  const [orderId, setOrderId] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>()

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const couponDiscount = appliedCoupon ? (appliedCoupon.type === 'percentage' ? Math.min(Math.round(subtotal * appliedCoupon.value / 100), appliedCoupon.maxDiscount || Infinity) : appliedCoupon.value) : 0
  const total = subtotal + shipping + tax - couponDiscount

  const applyCoupon = () => {
    const c = coupons.find(c => c.code === couponCode.toUpperCase() && c.isActive)
    if (!c) { toast.error('Invalid coupon code'); return }
    if (subtotal < c.minOrder) { toast.error(`Minimum order ₹${c.minOrder} required`); return }
    setAppliedCoupon(c)
    toast.success(`Coupon applied! You saved ${c.type === 'percentage' ? c.value + '%' : '₹' + c.value}`)
  }

  const saveAddress = handleSubmit(data => {
    const addr: Address = { ...data, id: 'a_' + Date.now(), isDefault: false, line2: data.line2 || '' }
    dispatch(updateProfile({ addresses: [...(user?.addresses || []), addr] }))
    setSelectedAddress(addr)
    setAddingAddress(false)
    toast.success('Address saved')
  })

  const placeOrderFn = () => {
    if (!selectedAddress) { toast.error('Please select an address'); return }
    const id = generateOrderId()
    const order: Order = {
      id, userId: user!.id,
      items: items.map(i => ({ product: i.product, quantity: i.quantity, price: i.product.price })),
      address: selectedAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'placed',
      subtotal, discount: 0,
      couponCode: appliedCoupon?.code,
      couponDiscount, shipping, tax, total,
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch(placeOrder(order))
    dispatch(clearCart())
    setOrderId(id)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle size={72} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-2">Thank you for shopping with ShopZone</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">Order ID: <span className="text-amazon-600">{orderId}</span></p>
        <p className="text-sm text-gray-500 mb-8">You'll receive a confirmation email shortly. Expected delivery in 3-5 business days.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/orders')} className="btn-primary px-8 py-3">View Order</button>
          <button onClick={() => navigate('/')} className="btn-outline px-8 py-3">Continue Shopping</button>
        </div>
      </div>
    )
  }

  const steps = ['address', 'payment', 'review'] as const
  const stepIdx = steps.indexOf(step as typeof steps[number])

  return (
    <>
      <Helmet><title>Checkout — ShopZone</title></Helmet>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {['Address', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= stepIdx ? 'bg-amazon-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {i < stepIdx ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === stepIdx ? 'text-amazon-600' : 'text-gray-500'}`}>{s}</span>
              {i < 2 && <div className={`h-px w-8 ${i < stepIdx ? 'bg-amazon-500' : 'bg-gray-300 dark:bg-gray-600'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Step: Address */}
            {step === 'address' && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h2>

                {/* Existing addresses */}
                {user?.addresses.map(addr => (
                  <label key={addr.id} className={`flex gap-3 p-4 border-2 rounded-xl cursor-pointer mb-3 transition-colors ${selectedAddress?.id === addr.id ? 'border-amazon-500 bg-amazon-50 dark:bg-amazon-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                    <input type="radio" name="address" checked={selectedAddress?.id === addr.id} onChange={() => { setSelectedAddress(addr); setAddingAddress(false) }} className="mt-1 accent-amazon-500" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 dark:text-white">{addr.name} <span className="text-gray-400 font-normal ml-2">{addr.phone}</span></p>
                      <p className="text-gray-600 dark:text-gray-400">{addr.line1}{addr.line2 ? ', ' + addr.line2 : ''}</p>
                      <p className="text-gray-600 dark:text-gray-400">{addr.city}, {addr.state} — {addr.pincode}</p>
                      {addr.isDefault && <span className="badge bg-green-100 text-green-700 mt-1">Default</span>}
                    </div>
                  </label>
                ))}

                {/* Add new */}
                {!addingAddress ? (
                  <button onClick={() => setAddingAddress(true)} className="flex items-center gap-2 text-sm text-amazon-600 hover:underline mt-2">
                    <Plus size={16} /> Add New Address
                  </button>
                ) : (
                  <form onSubmit={saveAddress} className="space-y-3 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Full Name *</label>
                        <input {...register('name', { required: true })} className="input text-sm" placeholder="Full Name" />
                        {errors.name && <p className="text-xs text-red-500 mt-0.5">Required</p>}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Phone *</label>
                        <input {...register('phone', { required: true })} className="input text-sm" placeholder="+91 XXXXXXXXXX" />
                        {errors.phone && <p className="text-xs text-red-500 mt-0.5">Required</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Address Line 1 *</label>
                      <input {...register('line1', { required: true })} className="input text-sm" placeholder="House No., Street, Area" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Address Line 2</label>
                      <input {...register('line2')} className="input text-sm" placeholder="Landmark (optional)" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">City *</label>
                        <input {...register('city', { required: true })} className="input text-sm" placeholder="City" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">State *</label>
                        <input {...register('state', { required: true })} className="input text-sm" placeholder="State" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Pincode *</label>
                        <input {...register('pincode', { required: true, pattern: /^\d{6}$/ })} className="input text-sm" placeholder="6-digit" />
                      </div>
                    </div>
                    <input {...register('country')} type="hidden" value="India" />
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary text-sm py-2 px-4">Save Address</button>
                      {user?.addresses.length ? <button type="button" onClick={() => setAddingAddress(false)} className="btn-outline text-sm py-2 px-4">Cancel</button> : null}
                    </div>
                  </form>
                )}

                <button onClick={() => { if (!selectedAddress) { toast.error('Select an address first'); return } setStep('payment') }} className="w-full btn-primary mt-6 py-3">
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step: Payment */}
            {step === 'payment' && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'razorpay', label: 'Razorpay', desc: 'UPI, Cards, Net Banking & more', icon: Smartphone },
                    { value: 'stripe', label: 'Stripe', desc: 'Credit & Debit Cards', icon: CreditCard },
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: Banknote },
                  ].map(opt => (
                    <label key={opt.value} className={`flex gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === opt.value ? 'border-amazon-500 bg-amazon-50 dark:bg-amazon-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value as typeof paymentMethod)} className="mt-1 accent-amazon-500" />
                      <opt.icon size={20} className="text-amazon-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mt-5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2"><Tag size={16} />Have a coupon?</label>
                  <div className="flex gap-2">
                    <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Enter coupon code" className="input text-sm flex-1" />
                    <button onClick={applyCoupon} className="btn-primary text-sm px-4 py-2">Apply</button>
                  </div>
                  {appliedCoupon && <p className="text-green-600 text-sm mt-1.5">✓ {appliedCoupon.code} applied — You saved {formatCurrency(couponDiscount)}</p>}
                  <p className="text-xs text-gray-400 mt-1">Try: SAVE10, FLAT200, NEWUSER, WELCOME50</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('address')} className="btn-outline py-3 px-6 text-sm">Back</button>
                  <button onClick={() => setStep('review')} className="btn-primary py-3 flex-1">Review Order</button>
                </div>
              </div>
            )}

            {/* Step: Review */}
            {step === 'review' && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review Your Order</h2>
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg bg-gray-50 dark:bg-gray-800" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 text-sm mb-4">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">Delivery to:</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAddress?.name} · {selectedAddress?.phone}</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAddress?.line1}, {selectedAddress?.city}, {selectedAddress?.state} — {selectedAddress?.pincode}</p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">Payment: <span className="font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</span></p>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('payment')} className="btn-outline py-3 px-6 text-sm">Back</button>
                  <button onClick={placeOrderFn} className="btn-primary py-3 flex-1 font-semibold">Place Order ({formatCurrency(total)})</button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="card p-5 sticky top-20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Price Details</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between"><span>Price ({items.reduce((a, i) => a + i.quantity, 0)} items)</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Coupon ({appliedCoupon?.code})</span><span>-{formatCurrency(couponDiscount)}</span></div>}
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
                {couponDiscount > 0 && <p className="text-green-600 text-xs">You save {formatCurrency(couponDiscount)} with coupon!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
