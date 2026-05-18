import { EnrichedUser, Post, Todo, User } from '../types/user.types'

export const mapUsers = (
  users: User[],
  posts: Post[],
  todos: Todo[]
): EnrichedUser[] => {
  return users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id)
    const userTodos = todos.filter((t) => t.userId === user.id)
    return {
      ...user,
      postsCount: userPosts.length,
      completedTodos: userTodos.filter((t) => t.completed).length,
      pendingTodos: userTodos.filter((t) => !t.completed).length,
    }
  })
}
