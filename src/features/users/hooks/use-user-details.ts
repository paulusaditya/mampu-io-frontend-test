'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getPostsByUserId,
  getTodosByUserId,
  getUserById,
} from '../services/users.service'

const STALE_TIME = 1000 * 60

export const useUserDetails = (id: string) => {
  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    staleTime: STALE_TIME,
    retry: false,
    enabled: Boolean(id),
  })

  const postsQuery = useQuery({
    queryKey: ['user-posts', id],
    queryFn: () => getPostsByUserId(id),
    staleTime: STALE_TIME,
    enabled: Boolean(id),
  })

  const todosQuery = useQuery({
    queryKey: ['user-todos', id],
    queryFn: () => getTodosByUserId(id),
    staleTime: STALE_TIME,
    enabled: Boolean(id),
  })

  return {
    user: userQuery.data,
    posts: postsQuery.data ?? [],
    todos: todosQuery.data ?? [],
    isLoading: userQuery.isLoading,
    isError: userQuery.isError || userQuery.data === null,
    isPostsLoading: postsQuery.isLoading,
    isTodosLoading: todosQuery.isLoading,
  }
}