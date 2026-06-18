import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Zap, Clock, Tag, Star, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { flashDeals } from '../data/mockData'
import { useAppSelector } from '../hooks/useAppDispatch'
import ProductCard from '../components/product/ProductCard'

function useCountdown(targetTime: string) {
  const calc = useCallback(() => {
    const diff = new Date(targetTime).getTime() - Date.now()
    if (diff <= 0) return { h: 0, m: 0, s: 0 }
    return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }
  }, [targetTime])
  const [t, setT] = useState(calc)
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [calc])
  return t
}

function TimerBox({ n }: { n: number }) {
  return <span className="bg-gray-900 text-white text-lg font-bold px-3 py-1.5 rounded-lg min-w-[44px] text-center">{String(n).padStart(2, '0')}</span>
}

const categoryTemplates = [
  { slug: 'electronics', discount: '40%', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', bg: 'from-blue-600 to-indigo-700' },
  { slug: 'fashion', discount: '50%', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', bg: 'from-pink-600 to-rose-700' },
  { slug: 'home-kitchen', discount: '35%', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', bg: 'from-green-600 to-teal-700' },
  { slug: 'beauty', discount: '45%', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', bg: 'from-purple-600 to-violet-700' },
]

export default function DealsPage() {
  const products = useAppSelector(s => s.products.items)
  const categories = useAppSelector(s => s.categories.items)
  const dealItems = flashDeals.map(d => ({ deal: d, product: products.find(p => p.id === d.productId)! })).filter(x => x.product)
  const endTime = dealItems[0]?.deal.endsAt ?? new Date(Date.now() + 6 * 3600 * 1000).toISOString()
  const { h, m, s } = useCountdown(endTime)

  const topDiscountProducts = [...products].sort((a, b) => b.discount - a.discount).slice(0, 12)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8)
  const underN = (max: number) => products.filter(p => p.price <= max).slice(0, 6)

  return (
    <>
      <Helmet>
        <title>Today's Deals — ShopZone | Best Offers & Discounts</title>
        <meta name="description" content="Shop the best deals of the day. Huge discounts on electronics, fashion, home and more." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap size={28} className="text-amazon-500 fill-amazon-500" /> Today's Deals
            </h1>
            <p className="text-gray-500 mt-1">Handpicked deals, refreshed daily</p>
          </div>
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-5 py-3">
            <Clock size={18} className="text-red-600" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">Ends in:</span>
            <div className="flex items-center gap-1.5">
              <TimerBox n={h} />
              <span className="text-red-700 font-bold text-lg">:</span>
              <TimerBox n={m} />
              <span className="text-red-700 font-bold text-lg">:</span>
              <TimerBox n={s} />
            </div>
          </div>
        </div>

        {/* Category Deals */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryTemplates.map(({ slug, discount, img, bg }) => {
            const cat = categories.find(c => c.slug === slug)
            if (!cat) return null
            return (
              <Link key={cat.id} to={`/products?category=${cat.slug}`}
                className={`bg-gradient-to-br ${bg} rounded-2xl overflow-hidden text-white group relative h-36 flex flex-col justify-end p-4 hover:shadow-xl transition-shadow`}>
                <img src={img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity" />
                <div className="relative z-10">
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">Up to {discount} OFF</span>
                  <h3 className="font-bold text-base mt-1">{cat.name}</h3>
                  <span className="text-xs text-white/80 flex items-center gap-1">Shop Now <ChevronRight size={12} /></span>
                </div>
              </Link>
            )
          })}
          </div>
        </section>

        {/* Flash Deals */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Zap size={22} className="text-yellow-300 fill-yellow-300" />
            <h2 className="text-xl font-bold text-white">Flash Sale Deals</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dealItems.map(({ deal, product }) => {
              const pct = Math.round((1 - deal.dealPrice / product.originalPrice) * 100)
              return (
                <Link key={product.id} to={`/products/${product.slug}`}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">-{pct}%</span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 font-medium leading-snug">{product.name}</p>
                    <p className="text-sm font-bold text-red-600 mt-1">₹{deal.dealPrice.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(90, 60 + Math.random() * 30)}%` }} />
                    </div>
                    <p className="text-[9px] text-orange-600 font-medium mt-0.5">Selling fast!</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Price-based sections */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={18} className="text-amazon-500" /> Under ₹999
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {underN(999).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={18} className="text-amazon-500" /> Under ₹4,999
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {underN(4999).filter(p => p.price > 999).slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Highest discount */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Star size={18} className="text-amazon-500 fill-amazon-500" /> Biggest Discounts
            </h2>
            <Link to="/products?sort=discount" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {topDiscountProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Best Sellers on Deal */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Best Sellers on Sale</h2>
            <Link to="/products?sort=rating" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </>
  )
}
