"use client"

import ProductCard from './ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading: boolean
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-zinc-900 rounded-xl p-4 animate-pulse">
          <div className="h-48 bg-zinc-800 rounded mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded mb-2"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
        <p className="text-lg mb-2">No products found</p>
        <p className="text-sm">Try adjusting your search or filter.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}