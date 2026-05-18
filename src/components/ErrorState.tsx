import { AlertCircle } from 'lucide-react'
import { Button } from './ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
        <AlertCircle className="h-7 w-7 text-red-500" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mb-5 text-sm text-[var(--color-text-muted)]">{message}</p>
      {onRetry && (
        <Button variant="default" onClick={onRetry} size="sm">
          Try again
        </Button>
      )}
    </div>
  )
}
