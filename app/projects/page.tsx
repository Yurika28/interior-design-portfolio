"use client"

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { projects, toProjectSlug } from '@/app/data/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsPage() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.project-card')

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-6 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold mb-6 text-center uppercase"
          >
            Our Projects
          </h1>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto">
            Explore our latest interior design projects showcasing innovative concepts and elegant executions.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${toProjectSlug(project.title)}`}
                className="project-card group"
              >
                <div className="relative overflow-hidden rounded-lg h-80 bg-zinc-900">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-100 transition-colors line-clamp-2">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your space?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Let us bring your interior design vision to life with our expertise and creativity.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-3 bg-amber-400 text-black font-bold rounded hover:bg-amber-500 transition-colors uppercase"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
