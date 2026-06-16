import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowUpDown } from 'lucide-react'
import { products } from '../data/mockData'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import { ProductCardSkeleton } from '../components/common/Skeleton'

interface Filters {
  categories: string[]
  brands: string[]
  priceMin: number
  priceMax: number
  minRating: number
  inStock: boolean
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'discount', label: 'Best Discount' },
]

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')
  const [filters, setFilters] = useState<Filters>({ categories: [], brands: [], priceMin: 0, priceMax: 0, minRating: 0, inStock: false })

  const query = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''
  const featuredParam = searchParams.get('featured') === 'true'
  const sortParam = searchParams.get('sort') || ''

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [query, categoryParam])

  useEffect(() => {
    if (categoryParam) setFilters(f => ({ ...f, categories: [categoryParam] }))
    if (sortParam) setSortBy(sortParam)
  }, [categoryParam, sortParam])

  const filtered = useMemo(() => {
    let list = [...products]

    if (query) {
      const q = query.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.category.toLowerCase().includes(q))
    }

    if (featuredParam) list = list.filter(p => p.isFeatured)

    if (filters.categories.length) list = list.filter(p => filters.categories.some(c => p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === c || p.categoryId === c))

    if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand))

    if (filters.priceMin > 0) list = list.filter(p => p.price >= filters.priceMin)
    if (filters.priceMax > 0) list = list.filter(p => p.price <= filters.priceMax)

    if (filters.minRating > 0) list = list.filter(p => p.rating >= filters.minRating)

    if (filters.inStock) list = list.filter(p => p.stock > 0)

    switch (sortBy) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break
      case 'price-high': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      case 'newest': list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
      case 'discount': list.sort((a, b) => b.discount - a.discount); break
    }

    return list
  }, [query, featuredParam, filters, sortBy])

  const title = query ? `Results for "${query}"` : categoryParam ? categoryParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'All Products'

  return (
    <>
      <Helmet>
        <title>{title} — ShopZone</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {!loading && <p className="text-sm text-gray-500">{filtered.length} results found</p>}
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-gray-400" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input py-1.5 text-sm w-auto">
              {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <div className="card p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                Filters
              </h3>
              <ProductFilters filters={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                <button onClick={() => setFilters({ categories: [], brands: [], priceMin: 0, priceMax: 0, minRating: 0, inStock: false })} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
