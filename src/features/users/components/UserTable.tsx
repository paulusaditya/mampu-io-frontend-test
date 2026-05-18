import { EnrichedUser, SortDirection, SortField } from '../types/user.types'
import { UserRow } from './UserRow'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UsersTableProps {
  users: EnrichedUser[]
  sortField: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
}

interface ThProps {
  label: string
  field?: SortField
  sortField: SortField
  sortDirection: SortDirection
  onSort?: (f: SortField) => void
  className?: string
}

function Th({ label, field, sortField, sortDirection, onSort, className }: ThProps) {
  const active = field && sortField === field
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]',
        field && 'cursor-pointer select-none hover:text-[var(--color-text-primary)] transition-colors',
        className
      )}
      onClick={field && onSort ? () => onSort(field) : undefined}
      aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      <div className="flex items-center gap-1">
        {label}
        {field && (
          <span className={cn('transition-opacity', active ? 'opacity-100' : 'opacity-30')}>
            {active && sortDirection === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronUp className="h-3 w-3" />
            )}
          </span>
        )}
      </div>
    </th>
  )
}

export function UsersTable({ users, sortField, sortDirection, onSortChange }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]">
      <div className="overflow-x-auto">
        <table className="w-full" aria-label="Users list">
          <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <tr>
              <Th
                label="User"
                field="name"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="pl-6"
              />
              <Th
                label="Email"
                field={undefined}
                sortField={sortField}
                sortDirection={sortDirection}
                className="hidden sm:table-cell"
              />
              <Th
                label="Website"
                field={undefined}
                sortField={sortField}
                sortDirection={sortDirection}
                className="hidden md:table-cell"
              />
              <Th
                label="Posts"
                field="postsCount"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="hidden lg:table-cell"
              />
              <Th
                label="Todos"
                field="pendingTodos"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="hidden xl:table-cell"
              />
              <th className="px-4 py-3.5" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <UserRow key={user.id} user={user} index={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
