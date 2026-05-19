'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts, getTodos, getUsers } from '../services/users.service'
import { mapUsers } from '../utils/map-users'

// staleTime: 60s mirrors the ISR revalidate interval on the server
// so client-side refetches are also throttled to once per minute
const STALE_TIME = 1000 * 60

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const [users, posts, todos] = await Promise.all([
        getUsers(),
        getPosts(),
        getTodos(),
      ])
      return mapUsers(users, posts, todos)
    },
    staleTime: STALE_TIME,
  })
}