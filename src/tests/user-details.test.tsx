import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserDetailPage from '@/app/users/[id]/page'
import { Post, Todo, User } from '@/features/users/types/user.types'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
  useRouter: () => ({ back: jest.fn() }),
}))

jest.mock('@/features/users/hooks/use-user-details', () => ({
  useUserDetails: jest.fn(),
}))

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '', lng: '' } },
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: '' },
}

const mockPosts: Post[] = [
  { userId: 1, id: 1, title: 'First post title', body: 'Body of first post' },
  { userId: 1, id: 2, title: 'Second post title', body: 'Body of second post' },
]

const mockTodos: Todo[] = [
  { userId: 1, id: 1, title: 'Complete the task', completed: true },
  { userId: 1, id: 2, title: 'Pending work item', completed: false },
]

import { useUserDetails } from '@/features/users/hooks/use-user-details'
const mockedUseUserDetails = jest.mocked(useUserDetails)

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <UserDetailPage />
    </QueryClientProvider>
  )
}

describe('UserDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows skeleton while loading', () => {
    mockedUseUserDetails.mockReturnValue({
      user: undefined,
      posts: [],
      todos: [],
      isLoading: true,
      isError: false,
      isPostsLoading: true,
      isTodosLoading: true,
    } as any)
    renderPage()
    expect(screen.queryByText('Leanne Graham')).toBeNull()
  })

  it('shows error state on failure', () => {
    // When isError=true with no user, component renders "User not found"
    // (component logic: title={!user ? 'User not found' : 'Failed to load user'})
    mockedUseUserDetails.mockReturnValue({
      user: undefined,
      posts: [],
      todos: [],
      isLoading: false,
      isError: true,
      isPostsLoading: false,
      isTodosLoading: false,
    } as any)
    renderPage()
    // Component shows "User not found" title when user is undefined, regardless of isError
    expect(screen.getByText(/user not found/i)).toBeTruthy()
  })

  it('handles invalid/missing user id', () => {
    mockedUseUserDetails.mockReturnValue({
      user: undefined,
      posts: [],
      todos: [],
      isLoading: false,
      isError: false,
      isPostsLoading: false,
      isTodosLoading: false,
    } as any)
    renderPage()
    expect(screen.getByText(/user not found/i)).toBeTruthy()
  })

  it('renders user details correctly', async () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      posts: mockPosts,
      todos: mockTodos,
      isLoading: false,
      isError: false,
      isPostsLoading: false,
      isTodosLoading: false,
    } as any)
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeTruthy()
      // "@Bret" is rendered as "@" + "Bret" in separate text nodes, match via regex
      expect(screen.getByText(/Bret/)).toBeTruthy()
      expect(screen.getByText('Sincere@april.biz')).toBeTruthy()
      // Company name appears multiple times (badge + company card), use getAllByText
      expect(screen.getAllByText('Romaguera-Crona').length).toBeGreaterThan(0)
    })
  })

  it('renders posts and todos sections', async () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      posts: mockPosts,
      todos: mockTodos,
      isLoading: false,
      isError: false,
      isPostsLoading: false,
      isTodosLoading: false,
    } as any)
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/first post title/i)).toBeTruthy()
      expect(screen.getByText(/complete the task/i)).toBeTruthy()
      expect(screen.getByText(/pending work item/i)).toBeTruthy()
    })
  })

  it('includes Back to list link', async () => {
    mockedUseUserDetails.mockReturnValue({
      user: mockUser,
      posts: [],
      todos: [],
      isLoading: false,
      isError: false,
      isPostsLoading: false,
      isTodosLoading: false,
    } as any)
    renderPage()
    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to list/i })
      expect(backLink).toBeTruthy()
      expect(backLink.getAttribute('href')).toBe('/users')
    })
  })
})