import { Users, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isFiltered?: boolean;
}

export function EmptyState({ isFiltered = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {isFiltered ? (
        <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
      ) : (
        <Users className="h-16 w-16 text-muted-foreground mb-4" />
      )}
      <h3 className="text-lg font-semibold mb-2">
        {isFiltered ? 'No users found' : 'No users available'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {isFiltered
          ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
          : 'There are currently no users to display.'}
      </p>
    </div>
  );
}
