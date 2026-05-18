export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string; lng: string }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface EnrichedUser extends User {
  postsCount: number
  completedTodos: number
  pendingTodos: number
}

export type SortField = 'name' | 'postsCount' | 'pendingTodos' | 'completedTodos'
export type SortDirection = 'asc' | 'desc'
export type FilterType = 'all' | 'hasPending' | 'noCompleted' | 'mostActive'
