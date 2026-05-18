"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types'
import api from '@/lib/api'
import { useCartStore } from '@/lib/store/cartStore'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/products/${id}`)
      setProduct(res.data.data)
    } catch (error) {
      console.error('Failed to fetch product', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading...</div>
  }

  if (!product) {
    return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Product not found</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-400">No Image</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-zinc-400 mb-4">${product.price}</p>
            <p className="text-zinc-400 mb-4">Stock: {product.stock}</p>
            {product.category && (
              <p className="text-zinc-400 mb-4">Category: {product.category.name}</p>
            )}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-white">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="bg-zinc-900 border border-zinc-700 text-white rounded px-3 py-2 w-20"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}