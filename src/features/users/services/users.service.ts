import { api } from '@/lib/axios'
import { Post, Todo, User } from '../types/user.types'

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
