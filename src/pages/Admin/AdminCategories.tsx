import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { categories as initialCats } from '../../data/mockData'
import type { Category } from '../../types'

export default function AdminCategories() {
  const [cats, setCats] = useState<Category[]>(initialCats)
  const [showForm, setShowForm] = useState(false)
  const [editCat, setEditCat] = useState<Category | null>(null)
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' })

  const handleDelete = (id: string) => {
    if (window.confirm('Delete category?')) {
      setCats(c => c.filter(x => x.id !== id))
      toast.success('Category deleted')
    }
  }

  const handleEdit = (cat: Category) => {
    setEditCat(cat)
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '' })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!formData.name) { toast.error('Name is required'); return }
    if (editCat) {
      setCats(cs => cs.map(c => c.id === editCat.id ? { ...c, ...formData } : c))
      toast.success('Category updated')
    } else {
      const newCat: Category = { id: 'c_' + Date.now(), image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', ...formData }
      setCats(c => [...c, newCat])
      toast.success('Category added')
    }
    setShowForm(false)
    setEditCat(null)
  }

  return (
    <>
      <Helmet><title>Categories — Admin — ShopZone</title></Helmet>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h1>
            <p className="text-sm text-gray-500">{cats.length} categories</p>
          </div>
          <button onClick={() => { setEditCat(null); setFormData({ name: '', slug: '', description: '' }); setShowForm(true) }} className="btn-primary flex items-center gap-2 text-sm py-2">
            <Plus size={16} /> Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cats.map(cat => (
            <div key={cat.id} className="card p-4 flex items-center gap-4">
              <img src={cat.image} alt={cat.name} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">{cat.name}</p>
                <p className="text-xs text-gray-500 truncate">{cat.description}</p>
                <p className="text-xs text-amazon-500 mt-0.5">/{cat.slug}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(cat)} className="p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500"><Edit size={14} /></button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{editCat ? 'Edit Category' : 'Add Category'}</h2>
              <div className="space-y-3">
                <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') }))} placeholder="Category Name *" className="input text-sm" />
                <input value={formData.slug} onChange={e => setFormData(f => ({ ...f, slug: e.target.value }))} placeholder="Slug (auto-generated)" className="input text-sm" />
                <textarea value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="Description" className="input text-sm h-20 resize-none" />
              </div>
              <div className="flex gap-3 mt-4">
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
