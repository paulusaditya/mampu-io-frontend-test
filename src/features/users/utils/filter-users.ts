import { EnrichedUser, FilterType } from '../types/user.types'

export function filterUsers(
  users: EnrichedUser[],
  search: string,
  filterType: FilterType
): EnrichedUser[] {
  let result = users

  // Text search
  if (search.trim()) {
    const q = search.toLowerCase()
    result = result.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
    )
  }

  // Filter type
  switch (filterType) {
    case 'hasPending':
      result = result.filter((u) => u.pendingTodos > 0)
      break
    case 'noCompleted':
      result = result.filter((u) => u.completedTodos === 0)
      break
    case 'mostActive':
      result = result.filter((u) => u.postsCount >= 10)
      break
  }

  return result
}
