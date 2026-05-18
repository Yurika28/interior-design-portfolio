"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import api from '@/lib/api'
import { Product } from '@/types'
import { useAuth } from '@/lib/hooks/useAuth'
import Navbar from '@/app/components/Navbar'

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading, logout } = useAuth()
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

    const fetchProducts = async () => {
      try {
        const res = await api.get('/products')
        setProducts(res.data.data)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [authLoading, router, user])

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`)
        setProducts(products.filter(p => p.id !== id))
      } catch (error) {
        console.error('Failed to delete product', error)
      }
    }
  }
  

  if (authLoading || loading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    </>
  )

  if (!user) return null


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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/admin/products/new" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200">
              Add Product
            </Link>
            <button
              onClick={() => { logout(); router.push('/auth/login') }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t border-zinc-800">
                  <td className="px-4 py-3">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-zinc-800 rounded"></div>
                    )}
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-amber-400 hover:underline mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}