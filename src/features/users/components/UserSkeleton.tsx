// Skeleton shimmer via Tailwind animate-pulse — no external dep needed

function Bone({ className }: { className: string }) {
  return (
    <div
      className={`rounded-md bg-stone-100 dark:bg-stone-800 animate-pulse ${className}`}
      aria-hidden="true"
    />
  )
}

export function UsersTableSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-stone-200/80 dark:border-stone-700/60 bg-white dark:bg-stone-900"
      aria-label="Loading users…"
      aria-busy="true"
    >
      {/* Table header */}
      <div className="border-b border-stone-100 dark:border-stone-800 px-6 py-3.5">
        <div className="flex items-center justify-between">
          <Bone className="h-3.5 w-28" />
          <Bone className="h-3.5 w-16" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3.5"
            style={{ opacity: 1 - i * 0.09 }}
          >
            {/* Avatar */}
            <Bone className="h-8 w-8 rounded-lg flex-shrink-0" />

            {/* Name + handle */}
            <div className="flex-1 space-y-1.5">
              <Bone className="h-3 w-36" />
              <Bone className="h-2.5 w-24" />
            </div>

            {/* Email — hidden sm */}
            <div className="hidden sm:block space-y-1">
              <Bone className="h-2.5 w-40" />
            </div>

            {/* Stats */}
            <div className="hidden lg:flex items-center gap-3">
              <Bone className="h-5 w-14 rounded-full" />
              <Bone className="h-5 w-14 rounded-full" />
              <Bone className="h-5 w-14 rounded-full" />
            </div>

            {/* Arrow */}
            <Bone className="h-7 w-7 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function UsersCardSkeleton() {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2 lg:hidden"
      aria-label="Loading users…"
      aria-busy="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-stone-200/80 dark:border-stone-700/60 bg-white dark:bg-stone-900 p-5 space-y-4"
          style={{ opacity: 1 - i * 0.12 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <Bone className="h-10 w-10 rounded-xl flex-shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Bone className="h-3 w-28" />
              <Bone className="h-2.5 w-20" />
            </div>
          </div>

          {/* Contact lines */}
          <div className="space-y-2">
            <Bone className="h-2.5 w-full" />
            <Bone className="h-2.5 w-3/5" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 pt-1 border-t border-stone-100 dark:border-stone-800">
            <Bone className="h-4 w-12" />
            <Bone className="h-4 w-12" />
            <Bone className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}