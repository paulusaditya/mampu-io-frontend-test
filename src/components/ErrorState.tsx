// Import icon warning/error dari lucide-react
import { AlertCircle } from 'lucide-react'

// Import reusable Button component
import { Button } from './ui/button'

// Props untuk customisasi error state
interface ErrorStateProps {
  // Judul error
  title?: string

  // Pesan detail error
  message?: string

  // Function callback ketika tombol retry ditekan
  onRetry?: () => void
}

// Component ErrorState
export function ErrorState({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    // Container utama error state
    <div className="flex flex-col items-center justify-center py-20 text-center">
      
      {/* Wrapper icon error */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
        <AlertCircle className="h-7 w-7 text-red-500" />
      </div>

      {/* Judul error */}
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>

      {/* Pesan error */}
      <p className="mb-5 text-sm text-[var(--color-text-muted)]">
        {message}
      </p>

      {/* Tombol retry hanya muncul jika onRetry tersedia */}
      {onRetry && (
        <Button variant="default" onClick={onRetry} size="sm">
          Try again
        </Button>
      )}
    </div>
  )
}