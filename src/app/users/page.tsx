'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUsers } from '@/features/users/hooks/use-users'
import { FilterType, SortDirection, SortField } from '@/features/users/types/user.types'
import { filterUsers } from '@/features/users/utils/filter-users'
import { sortUsers } from '@/features/users/utils/sort-users'
import { UsersTable } from '@/features/users/components/UserTable'
import { UserCard } from '@/features/users/components/UserCard'
import { SearchBar } from '@/features/users/components/SearchBar'
import { FilterBar } from '@/features/users/components/FilterBar'
import { UsersTableSkeleton, UsersCardSkeleton } from '@/features/users/components/UserSkeleton'
import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '@/components/EmptyState'
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

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (filterType !== 'all') params.set('filter', filterType)
    if (sortField !== 'name') params.set('sort', sortField)
    if (sortDirection !== 'asc') params.set('dir', sortDirection)

    router.replace(`/users${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }, [search, filterType, sortField, sortDirection, router])

  const summary = useMemo(
    () => ({
      userCount: users?.length ?? 0,
      totalPosts: users?.reduce((sum, user) => sum + user.postsCount, 0) ?? 0,
      totalCompleted: users?.reduce((sum, user) => sum + user.completedTodos, 0) ?? 0,
      totalPending: users?.reduce((sum, user) => sum + user.pendingTodos, 0) ?? 0,
    }),
    [users]
  )

  const filtered = useMemo(
    () => (users ? filterUsers(users, search, filterType) : []),
    [users, search, filterType]
  )

  const sorted = useMemo(
    () => sortUsers(filtered, sortField, sortDirection),
    [filtered, sortField, sortDirection]
  )

  const handleSortChange = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    },
    [sortField]
  )

  const resultSummary = useMemo(
    () =>
      search || filterType !== 'all'
        ? `Showing ${sorted.length} of ${summary.userCount} users`
        : `Showing all ${summary.userCount} users`,
    [search, filterType, sorted.length, summary.userCount]
  )

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/20 backdrop-blur-xl transition-colors duration-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-sm shadow-sky-500/20">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Team workspace</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Users dashboard
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-500">
                  Browse your team members with filtered search, activity highlights, and quick stats.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Users', value: summary.userCount, icon: Users, badge: 'bg-sky-50 text-sky-600' },
                { label: 'Posts', value: summary.totalPosts, icon: TrendingUp, badge: 'bg-violet-50 text-violet-600' },
                { label: 'Completed', value: summary.totalCompleted, icon: CheckSquare, badge: 'bg-emerald-50 text-emerald-600' },
                { label: 'Pending', value: summary.totalPending, icon: Clock, badge: 'bg-amber-50 text-amber-600' },
              ].map(({ label, value, icon: Icon, badge }) => (
                <div key={label} className="rounded-3xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${badge}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar
              filterType={filterType}
              onFilterChange={setFilterType}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{resultSummary}</p>
        </section>

        <section className="mt-6 space-y-5">
          {isLoading ? (
            <>
              <div className="hidden lg:block">
                <UsersTableSkeleton />
              </div>
              <div className="lg:hidden">
                <UsersCardSkeleton />
              </div>
            </>
          ) : isError ? (
            <ErrorState
              title="Failed to load users"
              message="We couldn't fetch the user list. Check your connection and try again."
              onRetry={refetch}
            />
          ) : sorted.length === 0 ? (
            <EmptyState isFiltered={Boolean(search || filterType !== 'all')} />
          ) : (
            <>
              <div className="hidden lg:block">
                <UsersTable
                  users={sorted}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
                {sorted.map((user, index) => (
                  <UserCard key={user.id} user={user} index={index} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
