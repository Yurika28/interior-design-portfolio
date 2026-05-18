"use client"

import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selected: number | null
  onSelect: (id: number | null) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-lg ${selected === null ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-white'}`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-lg ${selected === category.id ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-white'}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}