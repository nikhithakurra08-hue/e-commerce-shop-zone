import { useState } from 'react'
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'
import { useAppSelector } from '../../hooks/useAppDispatch'

interface Filters {
  categories: string[]
  brands: string[]
  priceMin: number
  priceMax: number
  minRating: number
  inStock: boolean
}

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
}

export default function ProductFilters({ filters, onChange }: Props) {
  const categories = useAppSelector(s => s.categories.items)
  const products = useAppSelector(s => s.products.items)
  const brands = [...new Set(products.map(p => p.brand))]
  const [expanded, setExpanded] = useState({ cat: true, brand: true, price: true, rating: true })
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (key: keyof typeof expanded) =>
    setExpanded(p => ({ ...p, [key]: !p[key] }))

  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug]
    onChange({ ...filters, categories: next })
  }

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand]
    onChange({ ...filters, brands: next })
  }

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Categories */}
      <div>
        <button onClick={() => toggle('cat')} className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Category {expanded.cat ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.cat && (
          <div className="space-y-1.5">
            {categories.map(cat => {
              const count = products.filter(p => p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === cat.slug || p.categoryId === cat.id).length
              return (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={filters.categories.includes(cat.slug)} onChange={() => toggleCategory(cat.slug)} className="accent-amazon-500 w-4 h-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{cat.name}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{count}</span>
                </label>
              )
            })}
          </div>
        )}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Brands */}
      <div>
        <button onClick={() => toggle('brand')} className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Brand {expanded.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.brand && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {brands.map(brand => {
              const count = products.filter(p => p.brand === brand).length
              return (
                <label key={brand} className="flex items-center gap-2 cursor-pointer justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-amazon-500 w-4 h-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{brand}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{count}</span>
                </label>
              )
            })}
          </div>
        )}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Price */}
      <div>
        <button onClick={() => toggle('price')} className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Price Range {expanded.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.price && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input type="number" placeholder="Min" value={filters.priceMin || ''} onChange={e => onChange({ ...filters, priceMin: Number(e.target.value) })} className="input text-xs py-1.5" />
              <input type="number" placeholder="Max" value={filters.priceMax || ''} onChange={e => onChange({ ...filters, priceMax: Number(e.target.value) })} className="input text-xs py-1.5" />
            </div>
            <div className="space-y-1 text-xs">
              {[{ label: 'Under ₹500', min: 0, max: 500 }, { label: '₹500 – ₹2,000', min: 500, max: 2000 }, { label: '₹2,000 – ₹10,000', min: 2000, max: 10000 }, { label: 'Above ₹10,000', min: 10000, max: 999999 }].map(r => (
                <button key={r.label} onClick={() => onChange({ ...filters, priceMin: r.min, priceMax: r.max })} className="block w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">{r.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Rating */}
      <div>
        <button onClick={() => toggle('rating')} className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Min Rating {expanded.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.rating && (
          <div className="space-y-1">
            {[4, 3, 2].map(r => (
              <button key={r} onClick={() => onChange({ ...filters, minRating: r })} className={`flex items-center gap-1 text-sm w-full px-2 py-1 rounded transition-colors ${filters.minRating === r ? 'bg-amazon-50 dark:bg-amazon-900/20 text-amazon-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} & above
              </button>
            ))}
            {filters.minRating > 0 && (
              <button onClick={() => onChange({ ...filters, minRating: 0 })} className="text-xs text-amazon-500 hover:underline mt-1">Clear</button>
            )}
          </div>
        )}
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* In Stock */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={filters.inStock} onChange={e => onChange({ ...filters, inStock: e.target.checked })} className="accent-amazon-500 w-4 h-4" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock Only</span>
      </label>

      <button onClick={() => onChange({ categories: [], brands: [], priceMin: 0, priceMax: 0, minRating: 0, inStock: false })} className="w-full btn-outline text-sm py-1.5">
        Clear All Filters
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setMobileOpen(true)} className="md:hidden flex items-center gap-2 btn-outline text-sm mb-4">
        <SlidersHorizontal size={16} /> Filters
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 p-5 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <FilterContent />
      </div>
    </>
  )
}
