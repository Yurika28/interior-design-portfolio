"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import api from '@/lib/api'
import { Product, Category } from '@/types'
import ProductGrid from '@/components/shop/ProductGrid'
import CategoryFilter from '@/components/shop/CategoryFilter'
import SearchBar from '@/components/shop/SearchBar'
import Navbar from '@/app/components/Navbar'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [search, selectedCategory, page])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (selectedCategory) params.append('categoryId', selectedCategory.toString())
      params.append('page', page.toString())
      params.append('limit', '12')
      const res = await api.get(`/products?${params}`)
      setProducts(res.data.data)
      setTotalPages(res.data.pagination.totalPages)
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 pt-24 pb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center">Shop Furniture & Home Decor</h1>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        <ProductGrid products={products} loading={loading} />
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 mx-1 rounded ${p === page ? 'bg-amber-400 text-black' : 'bg-zinc-800'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}