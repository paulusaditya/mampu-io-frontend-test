'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search users…' }: SearchBarProps) {
  return (
    <div className="relative group">
      {/* Search icon */}
      <div
        className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center"
        aria-hidden="true"
      >
        <Search
          className={cn(
            'h-3.5 w-3.5 transition-colors duration-200',
            value
              ? 'text-stone-700 dark:text-stone-200'
              : 'text-stone-400 dark:text-stone-500 group-focus-within:text-stone-600 dark:group-focus-within:text-stone-300'
          )}
        />
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search users"
        className={cn(
          'w-full rounded-xl border bg-white dark:bg-stone-900',
          'pl-9 pr-9 py-2.5',
          'text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600',
          'border-stone-200 dark:border-stone-700',
          'focus:border-stone-400 dark:focus:border-stone-500 focus:outline-none focus:ring-0',
          'transition-all duration-200',
          'font-[450] tracking-[-0.01em]',
          // Subtle bottom-border-only underline effect on focus
          'focus:shadow-[0_1px_0_0_rgba(0,0,0,0.15)] dark:focus:shadow-[0_1px_0_0_rgba(255,255,255,0.15)]'
        )}
      />

      {/* Clear button — slides in when there's a value */}
      <div
        className={cn(
          'absolute inset-y-0 right-2 flex items-center transition-all duration-150',
          value ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1 pointer-events-none'
        )}
      >
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="flex h-5 w-5 items-center justify-center rounded-md text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-150"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}