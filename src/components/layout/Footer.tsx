import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">ShopZone</h3>
          <p className="text-sm leading-relaxed mb-4">Your one-stop destination for everything you need, delivered fast and reliably.</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-amazon-400 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="hover:text-amazon-400 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-amazon-400 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="hover:text-amazon-400 transition-colors"><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amazon-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-amazon-400 transition-colors">Products</Link></li>
            <li><Link to="/cart" className="hover:text-amazon-400 transition-colors">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-amazon-400 transition-colors">My Orders</Link></li>
            <li><Link to="/profile" className="hover:text-amazon-400 transition-colors">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-amazon-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-amazon-400 transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-amazon-400 transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-amazon-400 transition-colors">Shipping Info</a></li>
            <li><a href="#" className="hover:text-amazon-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 flex-shrink-0 text-amazon-400" /><span>123, MG Road, Bangalore, Karnataka 560001</span></li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-amazon-400" /><span>1800-XXX-XXXX (Toll Free)</span></li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-amazon-400" /><span>support@shopzone.com</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-600 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2024 ShopZone. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
