import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { formatCurrency } from '../../utils/format'

export default function CartPreview() {
  const items = useAppSelector(s => s.cart.items)

  if (items.length === 0) return (
    <div className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
      <p className="text-sm text-gray-500">Your cart is empty</p>
      <Link to="/products" className="mt-3 inline-block btn-primary">Shop now</Link>
    </div>
  )

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3">
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((i, index) => (
  <li key={`${i.product.id}-${index}`} className="flex items-center gap-3 py-2">
            <img src={i.product.images[0]} alt={i.product.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{i.product.name}</div>
              <div className="text-[11px] text-gray-500">{i.quantity} × {formatCurrency(i.product.price)}</div>
            </div>
            <div className="text-sm font-semibold">{formatCurrency(i.product.price * i.quantity)}</div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Subtotal</div>
        <div className="text-lg font-bold">{formatCurrency(subtotal)}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <Link to="/cart" className="flex-1 btn-secondary text-center">View Cart</Link>
        <Link to="/checkout" className="flex-1 btn-primary text-center">Checkout</Link>
      </div>
    </div>
  )
}
