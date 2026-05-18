import { EnrichedUser, SortDirection, SortField } from '../types/user.types'

export function sortUsers(
  users: EnrichedUser[],
  field: SortField,
  direction: SortDirection
): EnrichedUser[] {
  return [...users].sort((a, b) => {
    let valA: string | number = a[field] as string | number
    let valB: string | number = b[field] as string | number

    if (field === 'name') {
      valA = (valA as string).toLowerCase()
      valB = (valB as string).toLowerCase()
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
    return 0
  })
}
