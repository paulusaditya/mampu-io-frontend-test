'use client'

import { cn } from '@/lib/utils'
import { FilterType, SortDirection, SortField } from '../types/user.types'

interface FilterBarProps {
  filterType: FilterType
  onFilterChange: (f: FilterType) => void
  sortField: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
}

const FILTER_OPTIONS: { label: string; value: FilterType; count?: number }[] = [
  { label: 'All', value: 'all' },
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
    <div className="flex flex-wrap items-center gap-4 py-1">
      {/* Filter tabs — understated ink underline style */}
      <nav
        className="flex items-center gap-0"
        role="group"
        aria-label="Filter users"
      >
        {FILTER_OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            aria-pressed={filterType === opt.value}
            className={cn(
              'relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200',
              'focus:outline-none',
              i !== 0 && 'border-l border-stone-200/60 dark:border-stone-700/60',
              filterType === opt.value
                ? 'text-stone-900 dark:text-stone-50'
                : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
            )}
          >
            {filterType === opt.value && (
              <span
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-stone-900 dark:bg-stone-100 rounded-full"
                aria-hidden="true"
              />
            )}
            {opt.label}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="hidden sm:block h-5 w-px bg-stone-200 dark:bg-stone-700" aria-hidden="true" />

      {/* Sort — compact inline control */}
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500 font-medium">
          Sort
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-0.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={cn(
                'rounded-md px-2.5 py-1 text-[11px] font-medium tracking-wide transition-all duration-150',
                sortField === opt.value
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Direction toggle */}
        <button
          onClick={() => onSortChange(sortField)}
          aria-label={`Direction: ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          title={`Click to sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-150',
            'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900',
            'text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('transition-transform duration-300', sortDirection === 'desc' && 'rotate-180')}
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}