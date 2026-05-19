import { api } from '@/lib/axios'
import { Post, Todo, User } from '../types/user.types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const REVALIDATE = 60 // ISR: revalidate every 60 seconds

// ─── Client-side (axios) ────────────────────────────────────────────────────
// Used by React Query hooks in Client Components

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users')
  return response.data
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts')
  return response.data
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todos')
  return response.data
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
  const response = await api.get(`/posts?userId=${userId}`)
  return response.data
}

export const getTodosByUserId = async (userId: string): Promise<Todo[]> => {
  const response = await api.get(`/todos?userId=${userId}`)
  return response.data
}

// ─── Server-side (native fetch + ISR) ──────────────────────────────────────
// Used by Server Components / generateMetadata with Next.js cache revalidation

export const fetchUsersCached = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`, {
    next: { revalidate: REVALIDATE },
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export const fetchPostsCached = async (): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    next: { revalidate: REVALIDATE },
  })
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export const fetchTodosCached = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}/todos`, {
    next: { revalidate: REVALIDATE },
  })
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export const fetchUserByIdCached = async (id: string): Promise<User | null> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    next: { revalidate: REVALIDATE },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch user ${id}`)
  return res.json()
}