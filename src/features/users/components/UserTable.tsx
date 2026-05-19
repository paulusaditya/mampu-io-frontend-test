import { EnrichedUser, SortDirection, SortField } from '../types/user.types'
import { UserRow } from './UserRow'
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

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        'transition-all duration-200 flex-shrink-0',
        active ? 'opacity-100' : 'opacity-25',
        active && dir === 'desc' && 'rotate-180'
      )}
    >
      <path d="M12 5v14M5 12l7-7 7 7" />
    </svg>
  )
}

function Th({ label, field, sortField, sortDirection, onSort, className }: ThProps) {
  const active = Boolean(field && sortField === field)
  const sortable = Boolean(field && onSort)

  return (
    <th
      scope="col"
      onClick={sortable ? () => onSort!(field!) : undefined}
      aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
      className={cn(
        'py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em]',
        'transition-colors duration-150',
        sortable
          ? 'cursor-pointer select-none text-slate-400 hover:text-slate-700'
          : 'text-slate-400',
        active && 'text-slate-900',
        className
      )}
    >
      <div className="flex items-center gap-1.5">
        {label}
        {sortable && <SortIcon active={active} dir={sortDirection} />}
      </div>
    </th>
  )
}

export function UsersTable({ users, sortField, sortDirection, onSortChange }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
        >
          <caption className="sr-only">
            Users list with name, email, website, posts, and todos activity
          </caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <Th
                label="User"
                field="name"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="pl-6 pr-4"
              />
              <Th
                label="Email"
                field={undefined}
                sortField={sortField}
                sortDirection={sortDirection}
                className="hidden px-4 sm:table-cell"
              />
              <Th
                label="Website"
                field={undefined}
                sortField={sortField}
                sortDirection={sortDirection}
                className="hidden px-4 md:table-cell"
              />
              <Th
                label="Posts"
                field="postsCount"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="hidden px-4 lg:table-cell"
              />
              <Th
                label="Todos"
                field="pendingTodos"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSortChange}
                className="hidden px-4 xl:table-cell"
              />
              <th className="py-3 px-4" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-sm text-slate-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <UserRow key={user.id} user={user} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer — row count */}
      {users.length > 0 && (
        <div className="border-t border-slate-200 px-6 py-2.5">
          <p className="text-[11px] text-slate-500 font-medium">
            {users.length} {users.length === 1 ? 'user' : 'users'}
          </p>
        </div>
      )}
    </div>
  )
}