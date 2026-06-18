import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Truck, Shield, RefreshCw, Headphones, Clock, Zap, Star, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { flashDeals, topBrands } from '../data/mockData'
import { useAppSelector } from '../hooks/useAppDispatch'
import ProductCard from '../components/product/ProductCard'

const banners = [
  { id: 1, title: 'Up to 40% OFF on Electronics', subtitle: 'Grab the latest gadgets at unbeatable prices', cta: 'Shop Electronics', category: 'electronics', bg: 'from-navy-800 to-navy-600', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900', accent: '#FF9900' },
  { id: 2, title: 'Summer Fashion Sale', subtitle: 'New arrivals every week — stay ahead of the trend', cta: 'Explore Fashion', category: 'fashion', bg: 'from-purple-900 to-pink-700', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900', accent: '#EC4899' },
  { id: 3, title: 'Home & Kitchen Essentials', subtitle: 'Everything for your home at the best prices', cta: 'Shop Now', category: 'home-kitchen', bg: 'from-green-900 to-teal-700', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900', accent: '#10B981' },
  { id: 4, title: 'Fitness & Sports Gear', subtitle: 'Level up your workout with top brands', cta: 'Shop Sports', category: 'sports', bg: 'from-orange-900 to-red-700', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900', accent: '#F97316' },
]

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: Shield, title: 'Secure Payment', desc: '100% safe transactions' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round the clock help' },
]

function useCountdown(targetTime: string) {
  const calcTime = useCallback(() => {
    const diff = new Date(targetTime).getTime() - Date.now()
    if (diff <= 0) return { h: 0, m: 0, s: 0 }
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    }
  }, [targetTime])

  const [time, setTime] = useState(calcTime)
  useEffect(() => {
    const t = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(t)
  }, [calcTime])
  return time
}

function CountdownTimer({ targetTime }: { targetTime: string }) {
  const { h, m, s } = useCountdown(targetTime)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="flex items-center gap-1.5">
      {[pad(h), pad(m), pad(s)].map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-gray-900 text-white text-sm font-bold px-2 py-1 rounded min-w-[32px] text-center">{v}</span>
          {i < 2 && <span className="text-gray-900 font-bold text-sm">:</span>}
        </span>
      ))}
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [activeBanner, setActiveBanner] = useState(0)
  const products = useAppSelector(s => s.products.items)
  const categories = useAppSelector(s => s.categories.items)
  const recentlyViewed = useAppSelector(s => s.ui.recentlyViewed)
  const recentProducts = products.filter(p => recentlyViewed.includes(p.id)).slice(0, 6)

  const featured = products.filter(p => p.isFeatured)
  const bestSellers = products.filter(p => p.isBestSeller)
  const newArrivals = products.filter(p => p.isNew)
  const dealProducts = flashDeals.map(d => ({ deal: d, product: products.find(p => p.id === d.productId)! })).filter(x => x.product)

  useEffect(() => {
    const t = setInterval(() => setActiveBanner(b => (b + 1) % banners.length), 5000)
    return () => clearInterval(t)
  }, [])

  const b = banners[activeBanner]

  return (
    <>
      <Helmet>
        <title>ShopZone - Online Shopping India | Best Deals & Offers</title>
        <meta name="description" content="Shop millions of products at the best prices. Free delivery on orders above ₹499. Electronics, Fashion, Home, Sports and more." />
      </Helmet>

      {/* ── Hero Carousel ── */}
      <section className="relative overflow-hidden select-none">
        <div className={`bg-gradient-to-r ${b.bg} text-white transition-all duration-700`}>
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-amazon-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">Limited Time Offer</span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{b.title}</h1>
              <p className="text-gray-300 text-lg mb-8">{b.subtitle}</p>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => navigate(`/products?category=${b.category}`)} className="bg-amazon-500 hover:bg-amazon-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base shadow-lg">
                  {b.cta}
                </button>
                <button onClick={() => navigate('/deals')} className="border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                  Today's Deals
                </button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img src={b.img} alt={b.title} className="rounded-2xl shadow-2xl w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button onClick={() => setActiveBanner(b => (b - 1 + banners.length) % banners.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setActiveBanner(b => (b + 1) % banners.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeBanner ? 'bg-amazon-500 w-6' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-2">
          {features.map(f => (
            <div key={f.title} className="flex items-center gap-3 py-2">
              <div className="p-2 bg-amazon-50 dark:bg-amazon-900/20 rounded-lg">
                <f.icon size={18} className="text-amazon-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">

        {/* ── Categories ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <Link to="/products" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">View All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="group flex flex-col items-center gap-2 p-2.5 card hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Flash Sale / Deals ── */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap size={22} className="text-yellow-300 fill-yellow-300" />
              <h2 className="text-xl font-bold text-white">Flash Sale</h2>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
                <Clock size={14} className="text-white" />
                <span className="text-white text-xs font-medium mr-1">Ends in:</span>
                <CountdownTimer targetTime={dealProducts[0]?.deal.endsAt ?? new Date(Date.now() + 6 * 3600 * 1000).toISOString()} />
              </div>
            </div>
            <Link to="/deals" className="flex items-center gap-1 text-white text-sm font-medium hover:underline">
              View All Deals <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {dealProducts.map(({ deal, product }) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                    -{Math.round((1 - deal.dealPrice / product.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1 font-medium">{product.name}</p>
                  <p className="text-sm font-bold text-red-600 mt-0.5">₹{deal.dealPrice.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Deal of the Day ── */}
        {dealProducts.length > 0 && (() => {
          const { product, deal } = dealProducts[0]
          const savePct = Math.round((1 - deal.dealPrice / product.originalPrice) * 100)
          return (
            <section className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <Tag size={20} className="text-amazon-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Deal of the Day</h2>
                <span className="ml-2 text-sm text-gray-500">Hurry, limited stock!</span>
                <div className="ml-auto flex items-center gap-2">
                  <Clock size={14} className="text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Ends in:</span>
                  <CountdownTimer targetTime={deal.endsAt} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <Link to={`/products/${product.slug}`} className="flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-56 h-56 object-contain rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 hover:scale-105 transition-transform" />
                </Link>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-amazon-600 font-medium">{product.brand}</p>
                  <Link to={`/products/${product.slug}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-amazon-600 transition-colors line-clamp-2">{product.name}</Link>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amazon-500 fill-amazon-500' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-red-600">₹{deal.dealPrice.toLocaleString()}</span>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded">Save {savePct}%</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
                  {/* Stock bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>🔥 {Math.round(product.stock * 0.4)} sold in last 24h</span>
                      <span>{product.stock} left</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(80, 100 - (product.stock / 200) * 100)}%` }} />
                    </div>
                  </div>
                  <button onClick={() => navigate(`/products/${product.slug}`)} className="btn-primary px-8 py-2.5 text-sm">
                    Shop Now
                  </button>
                </div>
              </div>
            </section>
          )
        })()}

        {/* ── Featured Products ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <Link to="/products?featured=true" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featured.slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* ── Promo Banner Strip ── */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-600 rounded-2xl overflow-hidden text-white relative group cursor-pointer" onClick={() => navigate('/products?category=electronics')}>
            <div className="p-6 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">Best Deals</p>
              <h3 className="text-lg font-bold mb-1">Electronics Sale</h3>
              <p className="text-white/80 text-sm mb-3">Up to 40% off on top brands</p>
              <span className="inline-flex items-center gap-1 bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">Shop Now <ChevronRight size={12} /></span>
            </div>
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" alt="" className="absolute right-0 top-0 h-full w-2/5 object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
          </div>
          <div className="bg-gradient-to-br from-pink-700 to-rose-500 rounded-2xl overflow-hidden text-white relative group cursor-pointer" onClick={() => navigate('/products?category=beauty')}>
            <div className="p-6 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-pink-200 mb-1">New Arrivals</p>
              <h3 className="text-lg font-bold mb-1">Beauty & Skincare</h3>
              <p className="text-white/80 text-sm mb-3">Glow up with top brands</p>
              <span className="inline-flex items-center gap-1 bg-white text-pink-700 text-xs font-bold px-3 py-1.5 rounded-full">Explore <ChevronRight size={12} /></span>
            </div>
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" alt="" className="absolute right-0 top-0 h-full w-2/5 object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
          </div>
          <div className="bg-gradient-to-br from-green-700 to-teal-600 rounded-2xl overflow-hidden text-white relative group cursor-pointer" onClick={() => navigate('/products?category=home-kitchen')}>
            <div className="p-6 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-200 mb-1">Home Essentials</p>
              <h3 className="text-lg font-bold mb-1">Kitchen & Appliances</h3>
              <p className="text-white/80 text-sm mb-3">Upgrade your home</p>
              <span className="inline-flex items-center gap-1 bg-white text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">Shop Now <ChevronRight size={12} /></span>
            </div>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400" alt="" className="absolute right-0 top-0 h-full w-2/5 object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
          </div>
        </section>

        {/* ── Best Sellers ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Best Sellers</h2>
            <Link to="/products?sort=rating" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {bestSellers.slice(0, 12).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* ── Top Brands ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Brands</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {topBrands.map(brand => (
              <Link key={brand.slug} to={`/products?brand=${brand.name}`} className="card p-3 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{brand.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── New Arrivals ── */}
        {newArrivals.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Arrivals</h2>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
              </div>
              <Link to="/products?sort=newest" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">See All <ChevronRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {newArrivals.slice(0, 5).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* ── Recently Viewed ── */}
        {recentProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* ── All Products ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Products</h2>
            <Link to="/products" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">View All <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.slice(0, 18).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-primary text-base px-12 py-3 inline-flex items-center gap-2">
              View All {products.length}+ Products <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
