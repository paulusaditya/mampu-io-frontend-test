'use client'

import { cn } from '@/lib/utils'
import { FilterType, SortDirection, SortField } from '../types/user.types'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

interface FilterBarProps {
  filterType: FilterType
  onFilterChange: (f: FilterType) => void
  sortField: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
}

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: 'All Users', value: 'all' },
  { label: 'Has Pending', value: 'hasPending' },
  { label: 'No Completed', value: 'noCompleted' },
  { label: 'Most Active', value: 'mostActive' },
]

const SORT_OPTIONS: { label: string; value: SortField }[] = [
  { label: 'Name', value: 'name' },
  { label: 'Posts', value: 'postsCount' },
  { label: 'Pending', value: 'pendingTodos' },
  { label: 'Done', value: 'completedTodos' },
]

export function FilterBar({
  filterType,
  onFilterChange,
  sortField,
  sortDirection,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter users">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
              filterType === opt.value
                ? 'bg-[var(--color-accent)] text-white shadow-sm'
                : 'bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]'
            )}
            aria-pressed={filterType === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort select */}
      <div className="ml-auto flex items-center gap-2">
        <ArrowUpDown className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
        <span className="text-xs text-[var(--color-text-muted)]">Sort by</span>
        <div className="relative">
          <select
            value={sortField}
            onChange={(e) => onSortChange(e.target.value as SortField)}
            className="appearance-none rounded-lg border border-[var(--color-border)] bg-white py-1.5 pl-3 pr-7 text-xs font-medium text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none cursor-pointer"
            aria-label="Sort by field"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--color-text-muted)]" />
        </div>
        <button
          onClick={() => onSortChange(sortField)}
          className="rounded-lg border border-[var(--color-border)] bg-white p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          aria-label={`Sort direction: ${sortDirection}`}
          title={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
        >
          <span className="text-xs font-mono">{sortDirection === 'asc' ? '↑' : '↓'}</span>
        </button>
      </div>
    </div>
  )
}
