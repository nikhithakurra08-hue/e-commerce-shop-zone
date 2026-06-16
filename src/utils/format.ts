export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export const truncate = (text: string, length = 60): string =>
  text.length > length ? text.slice(0, length) + '…' : text

export const getDiscountedPrice = (price: number, discount: number): number =>
  Math.round(price - (price * discount) / 100)

export const calculateTax = (amount: number, rate = 0.09): number =>
  Math.round(amount * rate)

export const calculateShipping = (subtotal: number): number =>
  subtotal >= 499 ? 0 : 99

export const generateOrderId = (): string =>
  'ORD' + Date.now().toString().slice(-9)

export const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    placed: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-indigo-100 text-indigo-800',
    packed: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    returned: 'bg-gray-100 text-gray-800',
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800',
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}
