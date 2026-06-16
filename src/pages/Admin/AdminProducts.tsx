import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { products as initialProducts } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'
import StarRating from '../../components/common/StarRating'
import type { Product } from '../../types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({ name: '', brand: '', price: '', originalPrice: '', stock: '', category: '' })

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(p => p.filter(x => x.id !== id))
      toast.success('Product deleted')
    }
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setFormData({ name: product.name, brand: product.brand, price: String(product.price), originalPrice: String(product.originalPrice), stock: String(product.stock), category: product.category })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.price) { toast.error('Name and price are required'); return }
    if (editProduct) {
      setProducts(ps => ps.map(p => p.id === editProduct.id ? {
        ...p, name: formData.name, brand: formData.brand,
        price: Number(formData.price), originalPrice: Number(formData.originalPrice),
        stock: Number(formData.stock), category: formData.category,
      } : p))
      toast.success('Product updated')
    } else {
      toast.success('Product added (demo — mock data only)')
    }
    setShowForm(false)
    setEditProduct(null)
  }

  return (
    <>
      <Helmet><title>Products — Admin — ShopZone</title></Helmet>
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Products</h1>
            <p className="text-sm text-gray-500">{products.length} total products</p>
          </div>
          <button onClick={() => { setEditProduct(null); setFormData({ name: '', brand: '', price: '', originalPrice: '', stock: '', category: '' }); setShowForm(true) }} className="btn-primary flex items-center gap-2 text-sm py-2">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" className="input pl-9 max-w-sm" />
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['Product', 'Brand', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                        <span className="font-medium text-gray-900 dark:text-white max-w-[180px] truncate">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.brand}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.category}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock > 0 ? p.stock : 'Out'}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StarRating rating={p.rating} size={12} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <a href={`/products/${p.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-800" title="View"><Eye size={15} /></a>
                        <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500" title="Edit"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
              <div className="space-y-3">
                <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="Product Name *" className="input text-sm" />
                <input value={formData.brand} onChange={e => setFormData(f => ({ ...f, brand: e.target.value }))} placeholder="Brand" className="input text-sm" />
                <input value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value }))} placeholder="Category" className="input text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" value={formData.price} onChange={e => setFormData(f => ({ ...f, price: e.target.value }))} placeholder="Selling Price *" className="input text-sm" />
                  <input type="number" value={formData.originalPrice} onChange={e => setFormData(f => ({ ...f, originalPrice: e.target.value }))} placeholder="Original Price" className="input text-sm" />
                </div>
                <input type="number" value={formData.stock} onChange={e => setFormData(f => ({ ...f, stock: e.target.value }))} placeholder="Stock Quantity" className="input text-sm" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleSave} className="flex-1 btn-primary py-2.5">Save</button>
                <button onClick={() => setShowForm(false)} className="flex-1 btn-outline py-2.5">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
