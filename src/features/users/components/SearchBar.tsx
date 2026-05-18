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
              ? 'text-slate-700'
              : 'text-slate-400 group-focus-within:text-slate-600'
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
          'w-full rounded-xl border bg-white',
          'pl-9 pr-9 py-2.5',
          'text-sm text-slate-900 placeholder:text-slate-400',
          'border-slate-200',
          'focus:border-slate-400 focus:outline-none focus:ring-0',
          'transition-all duration-200',
          'font-[450] tracking-[-0.01em]',
          // Subtle bottom-border-only underline effect on focus
          'focus:shadow-[0_1px_0_0_rgba(0,0,0,0.15)]'
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
          className="flex h-5 w-5 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-150"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}