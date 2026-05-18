"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ProductGrid from './ProductGrid'
import { Product } from '@/types'
import api from '@/lib/api'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ShopSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?limit=4') // Fetch a few products for display
        setProducts(res.data.data)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!headingRef.current) return

    const heading = headingRef.current
    const text = heading.textContent || ''
    const words = text.split(' ')
    heading.innerHTML = words.map(word => `<span class="inline-block">${word}</span>`).join(' ')

    const tween = gsap.fromTo(
      heading.querySelectorAll('span'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          once: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="py-16 bg-[url('/marble-bg.jpg')] bg-cover bg-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 
            ref={headingRef}
            className="text-3xl font-bold text-white text-center uppercase"
          >
            Shop Furniture and Home Decors
          </h2>
        </div>
        <div className="flex justify-end">
          <Link
            href="/shop"
            className="p-4 text-amber-50 hover:underline transition-colors"
          >
            View All
          </Link>
        </div>
        <ProductGrid products={products} loading={loading} />
        
      </div>
    </section>
  )
}