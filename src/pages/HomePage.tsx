import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Truck, Shield, RefreshCw, Headphones } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { categories, products } from '../data/mockData'
import ProductCard from '../components/product/ProductCard'

const banners = [
  { id: 1, title: 'Up to 40% OFF on Electronics', subtitle: 'Grab the latest gadgets at unbeatable prices', cta: 'Shop Now', category: 'electronics', bg: 'from-navy-800 to-navy-600', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800' },
  { id: 2, title: 'Summer Fashion Sale', subtitle: 'New arrivals every week — stay ahead of the trend', cta: 'Explore', category: 'fashion', bg: 'from-purple-800 to-pink-600', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' },
  { id: 3, title: 'Home & Kitchen Essentials', subtitle: 'Everything for your home at the best prices', cta: 'Shop Now', category: 'home-kitchen', bg: 'from-green-800 to-teal-600', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' },
]

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: Shield, title: 'Secure Payment', desc: '100% safe transactions' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round the clock help' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const featured = products.filter(p => p.isFeatured)
  const bestSellers = products.filter(p => p.isBestSeller)

  return (
    <>
      <Helmet>
        <title>ShopZone - Online Shopping India</title>
        <meta name="description" content="Shop millions of products at the best prices. Free delivery on orders above ₹499." />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`bg-gradient-to-r ${banners[0].bg} text-white`}>
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-amazon-400 font-semibold uppercase tracking-widest text-sm mb-3">Limited Time Offer</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{banners[0].title}</h1>
              <p className="text-gray-300 text-lg mb-8">{banners[0].subtitle}</p>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => navigate(`/products?category=${banners[0].category}`)} className="bg-amazon-500 hover:bg-amazon-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg">
                  {banners[0].cta}
                </button>
                <button onClick={() => navigate('/products')} className="border border-white/40 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                  Browse All
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={banners[0].img} alt="Electronics" className="rounded-2xl shadow-2xl w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(f => (
            <div key={f.title} className="flex items-center gap-3 py-2">
              <div className="p-2 bg-amazon-50 dark:bg-amazon-900/20 rounded-lg">
                <f.icon size={20} className="text-amazon-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <Link to="/products" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="group flex flex-col items-center gap-2 p-3 card hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <Link to="/products?featured=true" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featured.slice(0, 5).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Banner strip */}
        <section className="grid md:grid-cols-2 gap-4">
          {banners.slice(1).map(b => (
            <div key={b.id} className={`relative bg-gradient-to-r ${b.bg} rounded-2xl overflow-hidden text-white`}>
              <div className="p-8 relative z-10">
                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                <p className="text-white/80 text-sm mb-4">{b.subtitle}</p>
                <button onClick={() => navigate(`/products?category=${b.category}`)} className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                  {b.cta}
                </button>
              </div>
              <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
            </div>
          ))}
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Sellers</h2>
            <Link to="/products?sort=rating" className="flex items-center gap-1 text-amazon-600 hover:text-amazon-700 text-sm font-medium">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {bestSellers.slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-primary text-base px-10 py-3 inline-flex">
              View All Products
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
