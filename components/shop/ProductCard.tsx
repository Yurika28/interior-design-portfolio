"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cartStore'
import { useAuth } from '@/lib/hooks/useAuth'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { user } = useAuth()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth/login?callbackUrl=/shop')
      return
    }
    addItem(product)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-400">No Image</span>
            </div>
          )}
        </div>
      </Link>
      <h3 className="text-lg text-zinc-100 font-semibold mb-2">{product.name}</h3>
      <p className="text-zinc-400 mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-white text-black py-2 rounded-full hover:bg-zinc-200 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  )
}
