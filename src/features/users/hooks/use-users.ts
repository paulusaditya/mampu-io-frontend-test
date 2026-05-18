'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts, getTodos, getUsers } from '../services/users.service'
import { mapUsers } from '../utils/map-users'

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
  })
}
