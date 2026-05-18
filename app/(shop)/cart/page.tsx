"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import Navbar from '@/app/components/Navbar'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-24 pb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 self-start"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <Link href="/shop" className="bg-white text-black px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                {item.product.imageUrl ? (
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-zinc-400">${item.product.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-zinc-800 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-zinc-800 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
              <p className="text-white font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => { if (confirm('Clear all items from your cart?')) clearCart() }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear Cart
          </button>
          <div className="text-right">
            <p className="text-2xl font-bold">Total: ${totalPrice().toFixed(2)}</p>
            <button className="bg-amber-400 text-black px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors mt-4">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
