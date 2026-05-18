'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUsers } from '@/features/users/hooks/use-users'
import { FilterType, SortDirection, SortField } from '@/features/users/types/user.types'
import { filterUsers } from '@/features/users/utils/filter-users'
import { sortUsers } from '@/features/users/utils/sort-users'
import { UsersTable } from '@/features/users/components/users-table'
import { UserCard } from '@/features/users/components/user-card'
import { SearchBar } from '@/features/users/components/search-bar'
import { FilterBar } from '@/features/users/components/filter-bar'
import { UsersTableSkeleton } from '@/features/users/components/users-skeleton'
import { ErrorState } from '@/components/error-state'
import { EmptyState } from '@/components/empty-state'
import { Users, TrendingUp, CheckSquare, Clock } from 'lucide-react'

export default function UsersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [filterType, setFilterType] = useState<FilterType>(
    (searchParams.get('filter') as FilterType) ?? 'all'
  )
  const [sortField, setSortField] = useState<SortField>(
    (searchParams.get('sort') as SortField) ?? 'name'
  )
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    (searchParams.get('dir') as SortDirection) ?? 'asc'
  )

  const { data: users, isLoading, isError, refetch } = useUsers()

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (filterType !== 'all') params.set('filter', filterType)
    if (sortField !== 'name') params.set('sort', sortField)
    if (sortDirection !== 'asc') params.set('dir', sortDirection)
    router.replace(`/users${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }, [search, filterType, sortField, sortDirection, router])

  const handleSortChange = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    },
    [sortField]
  )

  const filtered = users ? filterUsers(users, search, filterType) : []
  const sorted = sortUsers(filtered, sortField, sortDirection)

  // Summary stats
  const totalPosts = users?.reduce((a, u) => a + u.postsCount, 0) ?? 0
  const totalCompleted = users?.reduce((a, u) => a + u.completedTodos, 0) ?? 0
  const totalPending = users?.reduce((a, u) => a + u.pendingTodos, 0) ?? 0

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Top header bar */}
      <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">Users Dashboard</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            Team Members
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {users ? `${users.length} users · ${totalPosts} posts · ${totalCompleted + totalPending} todos` : 'Loading…'}
          </p>
        </div>

        {/* Stats cards */}
        {users && (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up stagger-2">
            {[
              { label: 'Total Users', value: users.length, icon: Users, color: 'text-sky-600 bg-sky-50' },
              { label: 'Total Posts', value: totalPosts, icon: TrendingUp, color: 'text-violet-600 bg-violet-50' },
              { label: 'Completed', value: totalCompleted, icon: CheckSquare, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Pending', value: totalPending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-sm)]"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[var(--color-text-primary)] leading-none">{value}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search + Filter */}
        <div className="mb-4 space-y-3 animate-slide-up stagger-3">
          <SearchBar value={search} onChange={setSearch} />
          {users && (
            <FilterBar
              filterType={filterType}
              onFilterChange={setFilterType}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          )}
        </div>

        {/* Results count */}
        {!isLoading && !isError && users && (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs text-[var(--color-text-muted)]">
              {sorted.length === users.length
                ? `Showing all ${users.length} users`
                : `Showing ${sorted.length} of ${users.length} users`}
            </p>
          </div>
        )}

        {/* Content */}
        {isLoading && <UsersTableSkeleton />}

        {isError && (
          <ErrorState
            title="Failed to load users"
            message="We couldn't fetch the users list. Check your connection and try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && sorted.length === 0 && (
          <EmptyState
            title={search || filterType !== 'all' ? 'No matching users' : 'No users found'}
            message={
              search || filterType !== 'all'
                ? 'Try different search terms or clear your filters.'
                : 'No users are available right now.'
            }
          />
        )}

        {!isLoading && !isError && sorted.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block animate-slide-up stagger-4">
              <UsersTable
                users={sorted}
                sortField={sortField}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
              {sorted.map((user, i) => (
                <UserCard key={user.id} user={user} index={i} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
