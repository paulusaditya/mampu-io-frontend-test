'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getPostsByUserId,
  getTodosByUserId,
  getUserById,
} from '../services/users.service'

export const useUserDetails = (id: string) => {
  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    retry: false,
  })

  const postsQuery = useQuery({
    queryKey: ['user-posts', id],
    queryFn: () => getPostsByUserId(id),
    enabled: !!id,
  })

  const todosQuery = useQuery({
    queryKey: ['user-todos', id],
    queryFn: () => getTodosByUserId(id),
    enabled: !!id,
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
