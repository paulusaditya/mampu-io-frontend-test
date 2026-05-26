// Import icon dari lucide-react untuk tampilan empty state
import { Users, SearchX } from 'lucide-react'

// Props untuk menentukan apakah empty state muncul karena filter/search
interface EmptyStateProps {
  isFiltered?: boolean
}

// Component EmptyState
export function EmptyState({ isFiltered = false }: EmptyStateProps) {
  return (
    // Container utama empty state
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Tampilkan icon SearchX jika hasil filter kosong */}
      {isFiltered ? (
        <SearchX
          className="h-16 w-16 mb-4 text-slate-300"
          aria-hidden="true"
        />
      ) : (
        // Tampilkan icon Users jika belum ada data user
        <Users
          className="h-16 w-16 mb-4 text-slate-300"
          aria-hidden="true"
        />
      )}

      {/* Judul empty state */}
      <h3 className="text-lg font-semibold mb-2 text-slate-700">
        {isFiltered ? 'No users found' : 'No users available'}
      </h3>

      {/* Deskripsi tambahan */}
      <p className="text-sm text-slate-500 max-w-sm">
        {isFiltered
          ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
          : 'There are currently no users to display.'}
      </p>
    </div>
  )
}