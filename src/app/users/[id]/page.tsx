'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserDetails } from '@/features/users/hooks/use-user-details'
import { ErrorState } from '@/components/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { getAvatarColor, getInitials } from '@/lib/utils'
import {
  ArrowLeft, Mail, Phone, Globe, MapPin, Building2,
  FileText, CheckCircle, Clock, ChevronDown, ChevronUp,
  ExternalLink, Quote
} from 'lucide-react'
import { useState } from 'react'
import { Todo } from '@/features/users/types/user.types'

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-8 h-8 w-32" />
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function InfoItem({ icon, label, value, href }: InfoItemProps) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5 transition-all hover:border-[var(--color-border-strong)]">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-[var(--shadow-sm)] text-[var(--color-accent)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
      </div>
      {href && <ExternalLink className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]" />}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }
  return content
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[var(--color-border)] last:border-0">
      <div
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
          todo.completed
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-[var(--color-border-strong)] bg-white'
        }`}
      >
        {todo.completed && <CheckCircle className="h-3 w-3 text-emerald-500" />}
      </div>
      <p
        className={`text-sm leading-snug ${
          todo.completed
            ? 'line-through text-[var(--color-text-muted)]'
            : 'text-[var(--color-text-primary)]'
        }`}
      >
        {todo.title}
      </p>
    </div>
  )
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [showAllTodos, setShowAllTodos] = useState(false)

  const { user, posts, todos, isLoading, isError, isPostsLoading, isTodosLoading } =
    useUserDetails(id)

  if (isLoading) return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <DetailSkeleton />
    </div>
  )

  if (isError || !user) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <ErrorState
            title={!user ? 'User not found' : 'Failed to load user'}
            message={!user ? `No user with ID "${id}" exists.` : undefined}
            onRetry={() => router.back()}
          />
          <Link
            href="/users"
            className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Link>
        </div>
      </div>
    )
  }

  const initials = getInitials(user.name)
  const avatarColor = getAvatarColor(user.id)
  const completedTodos = todos.filter((t) => t.completed)
  const pendingTodos = todos.filter((t) => !t.completed)
  const visiblePosts = showAllPosts ? posts : posts.slice(0, 3)
  const visibleTodos = showAllTodos ? todos : todos.slice(0, 5)

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-3">
            <Link
              href="/users"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)] transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to list</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6 animate-slide-up">

        {/* Profile card */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-md)]">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
            <div
              className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${avatarColor} text-xl font-bold text-white shadow-lg`}
            >
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{user.name}</h1>
              <p className="text-[var(--color-text-muted)] text-sm mt-0.5">@{user.username}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge bg-sky-50 text-sky-700">ID #{user.id}</span>
                <span className="badge bg-purple-50 text-purple-700">{user.company.name}</span>
              </div>
            </div>
          </div>

          {/* Contact grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem icon={<Mail className="h-4 w-4" />} label="Email" value={user.email} href={`mailto:${user.email}`} />
            <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone" value={user.phone} href={`tel:${user.phone}`} />
            <InfoItem icon={<Globe className="h-4 w-4" />} label="Website" value={user.website} href={`https://${user.website}`} />
            <InfoItem
              icon={<MapPin className="h-4 w-4" />}
              label="Address"
              value={`${user.address.street}, ${user.address.city} ${user.address.zipcode}`}
            />
          </div>
        </div>

        {/* Company card */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
            <h2 className="font-semibold text-[var(--color-text-primary)]">Company</h2>
          </div>
          <p className="font-semibold text-lg text-[var(--color-text-primary)]">{user.company.name}</p>
          <div className="mt-2 flex items-start gap-2">
            <Quote className="h-3.5 w-3.5 text-[var(--color-text-muted)] mt-0.5 flex-shrink-0" />
            <p className="text-sm italic text-[var(--color-text-secondary)]">{user.company.catchPhrase}</p>
          </div>
        </div>

        {/* Activity summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Posts', value: posts.length, icon: FileText, color: 'text-sky-600 bg-sky-50' },
            { label: 'Done', value: completedTodos.length, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Pending', value: pendingTodos.length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-sm)] text-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
            </div>
          ))}
        </div>

        {/* Posts section */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[var(--color-accent)]" />
              <h2 className="font-semibold text-[var(--color-text-primary)]">Posts</h2>
              <span className="badge bg-[var(--color-surface-2)] text-[var(--color-text-muted)]">{posts.length}</span>
            </div>
          </div>

          {isPostsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] py-4">No posts yet.</p>
          ) : (
            <>
              <div className="space-y-3">
                {visiblePosts.map((post) => (
                  <div key={post.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
                    <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug capitalize">{post.title}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] line-clamp-2">{post.body}</p>
                  </div>
                ))}
              </div>
              {posts.length > 3 && (
                <button
                  onClick={() => setShowAllPosts((v) => !v)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  {showAllPosts ? (
                    <><ChevronUp className="h-4 w-4" /> Show less</>
                  ) : (
                    <><ChevronDown className="h-4 w-4" /> Show all {posts.length} posts</>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Todos section */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[var(--color-accent)]" />
              <h2 className="font-semibold text-[var(--color-text-primary)]">Todos</h2>
              <span className="badge bg-emerald-50 text-emerald-700">{completedTodos.length} done</span>
              <span className="badge bg-amber-50 text-amber-700">{pendingTodos.length} pending</span>
            </div>
          </div>

          {isTodosLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : todos.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] py-4">No todos yet.</p>
          ) : (
            <>
              <div>
                {visibleTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
              {todos.length > 5 && (
                <button
                  onClick={() => setShowAllTodos((v) => !v)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  {showAllTodos ? (
                    <><ChevronUp className="h-4 w-4" /> Show less</>
                  ) : (
                    <><ChevronDown className="h-4 w-4" /> Show all {todos.length} todos</>
                  )}
                </button>
              )}
            </>
          )}
        </div>

      </main>
    </div>
  )
}
