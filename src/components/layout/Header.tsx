import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X, User, Package, LogOut, Settings, ChevronDown, MapPin, Zap } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { toggleDarkMode, setSearchQuery } from '../../store/slices/uiSlice'
import { logout } from '../../store/slices/authSlice'
import SearchSuggestions from './SearchSuggestions'
import CartPreview from './CartPreview'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { darkMode, searchQuery } = useAppSelector(s => s.ui)
  const { user, isAuthenticated } = useAppSelector(s => s.auth)
  const cartCount = useAppSelector(s => s.cart.items.reduce((acc, i) => acc + i.quantity, 0))
  const wishlistCount = useAppSelector(s => s.wishlist.items.length)
  const categories = useAppSelector(s => s.categories.items)

  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [catDropdown, setCatDropdown] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const location = useLocation()
  const currentPath = location.pathname + location.search
  const redirectPath = ['/login', '/signup', '/forgot-password'].includes(location.pathname) ? '/' : currentPath
  const nextPath = encodeURIComponent(redirectPath)
  const loginLink = `/login?next=${nextPath}`
  const signupLink = `/signup?next=${nextPath}`
  const dropRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setSearchQuery(localSearch))
    navigate(`/products?q=${encodeURIComponent(localSearch)}`)
  }

  const handleLogout = () => {
    dispatch(logout())
    setUserDropdown(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-navy-800 text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-2">
            <span className="text-2xl font-bold text-amazon-500 tracking-tight">ShopZone</span>
            <span className="hidden lg:block text-[10px] text-gray-300 -mt-1 text-center">.in</span>
          </Link>

          {/* Deliver to */}
          <div className="hidden lg:flex flex-col cursor-pointer hover:bg-navy-600 px-2 py-1 rounded mr-2 flex-shrink-0">
            <span className="text-[10px] text-gray-300">Deliver to</span>
            <span className="text-xs font-semibold text-white flex items-center gap-1"><MapPin size={11} className="text-amazon-400" />India</span>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl">
            <div className="relative flex flex-1 bg-white rounded-l-md overflow-hidden">
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Search products, brands and more..."
                className="flex-1 px-4 py-2 text-gray-900 text-sm outline-none"
              />
              <SearchSuggestions query={localSearch} onSelect={() => setLocalSearch('')} />
            </div>
            <button type="submit" className="bg-amazon-500 hover:bg-amazon-600 px-4 rounded-r-md transition-colors">
              <Search size={18} />
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-3">
            {/* Dark mode */}
            <button onClick={() => dispatch(toggleDarkMode())} className="p-2 hover:bg-navy-600 rounded-lg transition-colors" title="Toggle theme">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setUserDropdown(v => !v)}
                className="flex items-center gap-1 p-2 hover:bg-navy-600 rounded-lg transition-colors text-sm"
              >
                <User size={18} />
                <span className="hidden md:block max-w-[80px] truncate">{isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}</span>
                <ChevronDown size={14} />
              </button>
              {userDropdown && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-down z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <Settings size={15} /> My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <Package size={15} /> My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-amazon-600 font-medium">
                          <Settings size={15} /> Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-red-600">
                        <LogOut size={15} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={loginLink} onClick={() => setUserDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-amazon-600">Sign In</Link>
                      <Link to={signupLink} onClick={() => setUserDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-navy-600 rounded-lg transition-colors">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amazon-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* Cart */}
            <div ref={cartRef} className="relative">
              <button onClick={() => setCartOpen(v => !v)} className="relative p-2 hover:bg-navy-600 rounded-lg transition-colors">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amazon-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
              {cartOpen && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <CartPreview />
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 hover:bg-navy-600 rounded-lg">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-navy-600 text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1.5 overflow-x-auto">
          <div className="relative" onMouseEnter={() => setCatDropdown(true)} onMouseLeave={() => setCatDropdown(false)}>
            <button className="flex items-center gap-1 px-3 py-1 hover:bg-navy-500 rounded font-medium whitespace-nowrap">
              <Menu size={14} /> All Categories
            </button>
            {catDropdown && (
              <div className="absolute top-full left-0 w-56 bg-white dark:bg-gray-900 shadow-xl rounded-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                    onClick={() => setCatDropdown(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {categories.slice(0, 6).map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} className="px-3 py-1 hover:bg-navy-500 rounded whitespace-nowrap">
              {cat.name}
            </Link>
          ))}
          <Link to="/deals" className="px-3 py-1 hover:bg-navy-500 rounded whitespace-nowrap text-amazon-400 font-medium flex items-center gap-1">
            <Zap size={13} className="fill-amazon-400" /> Today's Deals
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-700 text-white px-4 py-3 flex flex-col gap-2">
          {categories.map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} className="py-1.5 text-sm hover:text-amazon-400">
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
