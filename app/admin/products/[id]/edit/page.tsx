"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/lib/api'
import { Product, Category } from '@/types'
import { useAuth } from '@/lib/hooks/useAuth'

export default function EditProductPage() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/auth/login')
      return
    }

    if (user.role !== 'admin') {
      router.push('/shop')
      return
    }

    const fetchData = async () => {
      setFetchLoading(true)
      try {
        // Fetch product
        if (id) {
          const productRes = await api.get(`/products/${id}`)
          const product: Product = productRes.data.data
          setName(product.name)
          setPrice(product.price.toString())
          setStock(product.stock.toString())
          setCategoryId(product.categoryId?.toString() || '')
        }

        // Fetch categories
        const categoriesRes = await api.get('/categories')
        setCategories(categoriesRes.data.data)
      } catch (error) {
        console.error('Failed to fetch data', error)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchData()
  }, [authLoading, router, user, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const productData = {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId: categoryId ? parseInt(categoryId) : null,
      }
      await api.patch(`/products/${id}`, productData)
      if (image) {
        const formData = new FormData()
        formData.append('image', image)
        await api.post(`/products/${id}/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      router.push('/admin')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || fetchLoading) return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-3"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  )
}