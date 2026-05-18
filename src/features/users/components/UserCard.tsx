import Link from 'next/link'
import { EnrichedUser } from '../types/user.types'
import { getInitials } from '@/lib/utils'

interface UserCardProps {
  user: EnrichedUser
  index: number
}

// Refined, editorial color palette — muted, not garish
const AVATAR_PALETTES = [
  'bg-stone-800 text-stone-100',
  'bg-slate-700 text-slate-100',
  'bg-zinc-700 text-zinc-100',
  'bg-neutral-800 text-neutral-100',
  'bg-stone-600 text-stone-50',
  'bg-slate-600 text-slate-50',
  'bg-zinc-600 text-zinc-100',
  'bg-neutral-700 text-neutral-50',
  'bg-stone-500 text-stone-50',
  'bg-slate-500 text-slate-50',
]

function getCardPalette(id: number) {
  return AVATAR_PALETTES[id % AVATAR_PALETTES.length]
}

export function UserCard({ user, index }: UserCardProps) {
  const initials = getInitials(user.name)
  const palette = getCardPalette(user.id)

  return (
    <Link
      href={`/users/${user.id}`}
      className="block group focus:outline-none"
      style={{
        animationDelay: `${index * 0.055}s`,
        animationName: 'card-in',
        animationDuration: '0.4s',
        animationTimingFunction: 'ease',
        animationFillMode: 'both',
      }}
    >
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <article
        className="
          relative flex flex-col gap-4 rounded-2xl
          border border-stone-200/80 dark:border-stone-700/60
          bg-white dark:bg-stone-900
          p-5 h-full
          transition-all duration-200
          group-hover:border-stone-400 dark:group-hover:border-stone-500
          group-hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]
          group-focus-visible:ring-2 group-focus-visible:ring-stone-900 dark:group-focus-visible:ring-stone-100 group-focus-visible:ring-offset-2
        "
      >
        {/* Corner arrow — appears on hover */}
        <div
          aria-hidden="true"
          className="
            absolute top-4 right-4
            text-stone-300 dark:text-stone-600
            transition-all duration-200
            group-hover:text-stone-600 dark:group-hover:text-stone-300
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>

        {/* Avatar + identity */}
        <header className="flex items-center gap-3">
          <div
            className={`
              flex h-10 w-10 flex-shrink-0 items-center justify-center
              rounded-xl text-xs font-bold tracking-wide
              ${palette}
              transition-transform duration-200 group-hover:scale-105
            `}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-50 tracking-[-0.01em] leading-tight">
              {user.name}
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium tracking-wide">
              @{user.username}
            </p>
          </div>
        </header>

        {/* Contact info */}
        <div className="flex flex-col gap-1.5">
          <p className="truncate text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">
            {user.email}
          </p>
          <p className="text-[12px] text-stone-400 dark:text-stone-500 font-mono">
            {user.website}
          </p>
        </div>

        {/* Stats row — rule above, tight numbers */}
        <footer className="mt-auto flex items-center gap-3 pt-3.5 border-t border-stone-100 dark:border-stone-800">
          <Stat label="posts" value={user.postsCount} color="text-sky-600 dark:text-sky-400" />
          <div className="h-3 w-px bg-stone-200 dark:bg-stone-700" aria-hidden="true" />
          <Stat label="done" value={user.completedTodos} color="text-emerald-600 dark:text-emerald-400" />
          <div className="h-3 w-px bg-stone-200 dark:bg-stone-700" aria-hidden="true" />
          <Stat label="pending" value={user.pendingTodos} color="text-amber-600 dark:text-amber-400" />
        </footer>
      </article>
    </Link>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className={`text-[13px] font-semibold tabular-nums ${color}`}>{value}</span>
      <span className="text-[10px] uppercase tracking-[0.08em] text-stone-400 dark:text-stone-500 font-medium">{label}</span>
    </div>
  )
}