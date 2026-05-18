import Link from 'next/link'
import { EnrichedUser } from '../types/user.types'
import { getAvatarColor, getInitials } from '@/lib/utils'
import { Mail, Globe, ChevronRight, FileText, CheckCircle, Clock } from 'lucide-react'

interface UserCardProps {
  user: EnrichedUser
  index: number
}

export function UserCard({ user, index }: UserCardProps) {
  const initials = getInitials(user.name)
  const avatarColor = getAvatarColor(user.id)

  return (
    <Link
      href={`/users/${user.id}`}
      className="block animate-slide-up"
      style={{ animationDelay: `${index * 0.06}s`, opacity: 0 }}
    >
      <div className="card-hover rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-sm)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${avatarColor} text-sm font-semibold text-white`}
            >
              {initials}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)] leading-tight">
                {user.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">@{user.username}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] mt-1" />
        </div>

        {/* Contact */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <Mail className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-accent)]">
            <Globe className="h-3.5 w-3.5" />
            <span>{user.website}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1.5 badge bg-sky-50 text-sky-700">
            <FileText className="h-3 w-3" />
            {user.postsCount} posts
          </div>
          <div className="flex items-center gap-1.5 badge bg-emerald-50 text-emerald-700">
            <CheckCircle className="h-3 w-3" />
            {user.completedTodos}
          </div>
          <div className="flex items-center gap-1.5 badge bg-amber-50 text-amber-700">
            <Clock className="h-3 w-3" />
            {user.pendingTodos}
          </div>
        </div>
      </div>
    </Link>
  )
}
