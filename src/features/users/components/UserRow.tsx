import Link from 'next/link'
import { EnrichedUser } from '../types/user.types'
import { getInitials } from '@/lib/utils'

interface UserRowProps {
  user: EnrichedUser
  index: number
}

const AVATAR_BG = [
  'bg-stone-700',
  'bg-slate-700',
  'bg-zinc-700',
  'bg-neutral-700',
  'bg-stone-600',
  'bg-slate-600',
]

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export function UserRow({ user, index }: UserRowProps) {
  const initials = getInitials(user.name)
  const avatarBg = AVATAR_BG[user.id % AVATAR_BG.length]

  return (
    <tr
      className="
        group border-b border-stone-100 dark:border-stone-800/70
        last:border-0 transition-colors duration-100
        hover:bg-stone-50/70 dark:hover:bg-stone-800/40
      "
      style={{
        animation: `row-in 0.3s ease both`,
        animationDelay: `${index * 0.03}s`,
      }}
    >
      <style>{`
        @keyframes row-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Name + username */}
      <td className="pl-6 pr-4 py-3.5">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-3 focus:outline-none focus-visible:underline"
        >
          <div
            className={`
              flex h-8 w-8 flex-shrink-0 items-center justify-center
              rounded-lg text-[10px] font-bold text-white tracking-wide
              ${avatarBg}
              transition-transform duration-150 group-hover:scale-105
            `}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-stone-900 dark:text-stone-50 tracking-[-0.01em] leading-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
              {user.name}
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
              @{user.username}
            </p>
          </div>
        </Link>
      </td>

      {/* Email */}
      <td className="hidden px-4 py-3.5 sm:table-cell">
        <a
          href={`mailto:${user.email}`}
          onClick={(e) => e.stopPropagation()}
          className="text-[12px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
        >
          {truncate(user.email, 28)}
        </a>
      </td>

      {/* Website */}
      <td className="hidden px-4 py-3.5 md:table-cell">
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[12px] font-mono text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
        >
          {user.website}
          <svg className="h-2.5 w-2.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
          </svg>
        </a>
      </td>

      {/* Posts */}
      <td className="hidden px-4 py-3.5 lg:table-cell">
        <div className="flex items-baseline gap-1">
          <span className="text-[13px] font-semibold tabular-nums text-sky-600 dark:text-sky-400">
            {user.postsCount}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
            posts
          </span>
        </div>
      </td>

      {/* Todos */}
      <td className="hidden px-4 py-3.5 xl:table-cell">
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-[13px] font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {user.completedTodos}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">done</span>
          </div>
          <div className="h-2.5 w-px bg-stone-200 dark:bg-stone-700" aria-hidden="true" />
          <div className="flex items-baseline gap-1">
            <span className="text-[13px] font-semibold tabular-nums text-amber-600 dark:text-amber-400">
              {user.pendingTodos}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">left</span>
          </div>
        </div>
      </td>

      {/* Action */}
      <td className="px-4 py-3.5">
        <Link
          href={`/users/${user.id}`}
          aria-label={`View ${user.name}`}
          className="
            flex h-7 w-7 items-center justify-center rounded-lg
            text-stone-300 dark:text-stone-600
            border border-transparent
            transition-all duration-150
            group-hover:border-stone-300 dark:group-hover:border-stone-600
            group-hover:text-stone-700 dark:group-hover:text-stone-300
          "
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </td>
    </tr>
  )
}