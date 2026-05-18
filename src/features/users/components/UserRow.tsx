import Link from 'next/link'
import { EnrichedUser } from '../types/user.types'
import { getAvatarColor, getInitials, truncate } from '@/lib/utils'
import { ExternalLink, ChevronRight } from 'lucide-react'

interface UserRowProps {
  user: EnrichedUser
  index: number
}

export function UserRow({ user, index }: UserRowProps) {
  const initials = getInitials(user.name)
  const avatarColor = getAvatarColor(user.id)

  return (
    <tr
      className="table-row-hover group border-b border-[var(--color-border)] last:border-0"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {/* Name + Email */}
      <td className="px-6 py-4">
        <Link href={`/users/${user.id}`} className="flex items-center gap-3 focus:outline-none">
          <div
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${avatarColor} text-xs font-semibold text-white`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors text-sm leading-tight">
              {user.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">@{user.username}</p>
          </div>
        </Link>
      </td>

      {/* Email */}
      <td className="hidden px-4 py-4 sm:table-cell">
        <a
          href={`mailto:${user.email}`}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {truncate(user.email, 30)}
        </a>
      </td>

      {/* Website */}
      <td className="hidden px-4 py-4 md:table-cell">
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {user.website}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </td>

      {/* Activity signals */}
      <td className="hidden px-4 py-4 lg:table-cell">
        <div className="flex items-center gap-2">
          <span className="badge bg-sky-50 text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            {user.postsCount} posts
          </span>
        </div>
      </td>

      <td className="hidden px-4 py-4 xl:table-cell">
        <div className="flex items-center gap-2">
          <span className="badge bg-emerald-50 text-emerald-700">✓ {user.completedTodos}</span>
          <span className="badge bg-amber-50 text-amber-700">⏳ {user.pendingTodos}</span>
        </div>
      </td>

      {/* Arrow */}
      <td className="px-4 py-4">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center justify-center h-8 w-8 rounded-lg text-[var(--color-text-muted)] transition-all group-hover:bg-[var(--color-accent)] group-hover:text-white"
          aria-label={`View details for ${user.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </td>
    </tr>
  )
}
