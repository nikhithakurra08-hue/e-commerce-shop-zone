import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck, RefreshCw, ChevronUp } from 'lucide-react'

const footerLinks = {
  'About ShopZone': [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Investor Relations', href: '#' },
    { label: 'ShopZone Science', href: '#' },
  ],
  'Get to Know Us': [
    { label: 'Sell on ShopZone', href: '#' },
    { label: 'Advertise Products', href: '#' },
    { label: 'ShopZone Business', href: '#' },
    { label: 'ShopZone Pay', href: '#' },
    { label: 'Become an Affiliate', href: '#' },
  ],
  'Customer Service': [
    { label: 'Help Center', href: '#' },
    { label: 'Track Your Order', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Shipping Policies', href: '#' },
    { label: 'Report a Product', href: '#' },
  ],
  'Let Us Help You': [
    { label: 'Your Account', to: '/profile' },
    { label: 'Your Orders', to: '/orders' },
    { label: 'Your Wishlist', to: '/wishlist' },
    { label: 'Your Cart', to: '/cart' },
    { label: 'Contact Us', href: '#' },
  ],
}

const paymentMethods = ['VISA', 'MC', 'AMEX', 'RuPay', 'UPI', 'COD', 'EMI', 'PayTM']

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-navy-800 text-gray-300 mt-12">
      {/* Back to top */}
      <button onClick={scrollToTop} className="w-full bg-navy-600 hover:bg-navy-500 text-white text-sm py-3 transition-colors flex items-center justify-center gap-2 font-medium">
        <ChevronUp size={16} /> Back to top
      </button>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="text-white font-bold mb-4 text-sm">{section}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  {'to' in link ? (
                    <Link to={link.to!} className="text-sm hover:text-amazon-400 transition-colors">{link.label}</Link>
                  ) : (
                    <a href={link.href} className="text-sm hover:text-amazon-400 transition-colors">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-navy-600 max-w-7xl mx-auto" />

      {/* Brand & trust strip */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & social */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="text-2xl font-bold text-amazon-500 tracking-tight">ShopZone</Link>
            <p className="text-xs text-center md:text-left max-w-xs">India's most trusted online shopping destination. 50 million+ happy customers.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amazon-400 transition-colors"><Facebook size={17} /></a>
              <a href="#" className="hover:text-amazon-400 transition-colors"><Twitter size={17} /></a>
              <a href="#" className="hover:text-amazon-400 transition-colors"><Instagram size={17} /></a>
              <a href="#" className="hover:text-amazon-400 transition-colors"><Youtube size={17} /></a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day policy' },
              { icon: CreditCard, title: 'No-Cost EMI', desc: 'On select products' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-1">
                <div className="p-2 bg-amazon-500/20 rounded-lg"><item.icon size={18} className="text-amazon-400" /></div>
                <p className="text-white text-xs font-semibold">{item.title}</p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><MapPin size={13} className="text-amazon-400 flex-shrink-0" /><span>123, MG Road, Bangalore 560001</span></div>
            <div className="flex items-center gap-2"><Phone size={13} className="text-amazon-400" /><span>1800-XXX-XXXX (Toll Free)</span></div>
            <div className="flex items-center gap-2"><Mail size={13} className="text-amazon-400" /><span>support@shopzone.com</span></div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-6 pt-6 border-t border-navy-600">
          <p className="text-xs text-gray-400 mb-3 text-center md:text-left">Secure payment methods accepted:</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {paymentMethods.map(pm => (
              <span key={pm} className="bg-white text-navy-800 text-[10px] font-bold px-2 py-1 rounded">{pm}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-600 py-4 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 ShopZone Online Shopping Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Policy</a>
            <a href="#" className="hover:text-gray-300">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
