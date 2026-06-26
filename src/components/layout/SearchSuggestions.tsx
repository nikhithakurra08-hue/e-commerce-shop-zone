import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppDispatch'

interface Props {
  query: string
  onSelect?: () => void
}

export default function SearchSuggestions({ query, onSelect }: Props) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const products = useAppSelector(s => s.products.items)

  useEffect(() => {
    setVisible(!!query && query.trim().length > 0)
  }, [query])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setVisible(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

 const results = useMemo(() => {
  if (query.trim() === '') {
    return
  }

  const q = query.toLowerCase()

  return products
    .filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
    .slice(0, 6)
}, [query])

  if (!visible || results.length === 0) return null

  return (
    <div ref={ref} className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
      <ul>
        {results.map(p => (
          <li key={p.id} className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Link to={`/products/${p.slug}`} onClick={onSelect} className="flex items-center gap-3">
              <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</div>
                <div className="text-[11px] text-gray-500">{p.brand} • {p.category}</div>
              </div>
              <div className="text-sm font-semibold">₹{p.price}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
