import { describe, expect, it, jest, beforeEach } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UsersPage from '@/app/users/page'
import { EnrichedUser } from '@/features/users/types/user.types'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => ({ get: () => null }),
}))

// Jest will auto-detect manual mocks from __mocks__ folder
jest.mock('@/features/users/hooks/use-users')

const mockUsers: EnrichedUser[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031',
    website: 'hildegard.org',
    address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '', lng: '' } },
    company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: '' },
    postsCount: 10,
    completedTodos: 5,
    pendingTodos: 5,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593',
    website: 'anastasia.net',
    address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566-7771', geo: { lat: '', lng: '' } },
    company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency', bs: '' },
    postsCount: 10,
    completedTodos: 8,
    pendingTodos: 0,
  },
]

import { useUsers } from '@/features/users/hooks/use-users'

// Direct cast works with manual mocks
const mockedUseUsers = useUsers as ReturnType<typeof jest.fn>

function renderPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <UsersPage />
    </QueryClientProvider>
  )
}

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading skeleton while fetching', () => {
    mockedUseUsers.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    })
    renderPage()
    // Should not show user names
    expect(screen.queryByText('Leanne Graham')).toBeNull()
  })

  it('shows error state on fetch failure', () => {
    mockedUseUsers.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    })
    renderPage()
    expect(screen.getByText(/failed to load users/i)).toBeTruthy()
  })

  it('renders users with activity signals', () => {
    mockedUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })
    renderPage()
    expect(screen.getByText('Leanne Graham')).toBeTruthy()
    expect(screen.getByText('Ervin Howell')).toBeTruthy()
  })

  it('filters users by search query', async () => {
    mockedUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })
    renderPage()
    const searchInput = screen.getByPlaceholderText(/search users/i)
    fireEvent.change(searchInput, { target: { value: 'Leanne' } })
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeTruthy()
      expect(screen.queryByText('Ervin Howell')).toBeNull()
    })
  })

  it('shows empty state when filters remove all results', async () => {
    mockedUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })
    renderPage()
    const searchInput = screen.getByPlaceholderText(/search users/i)
    fireEvent.change(searchInput, { target: { value: 'zzzznonexistent' } })
    await waitFor(() => {
      expect(screen.getByText(/no matching users/i)).toBeTruthy()
    })
  })

  it('applies hasPending filter correctly', async () => {
    mockedUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    })
    renderPage()
    const filterBtn = screen.getByRole('button', { name: /has pending/i })
    fireEvent.click(filterBtn)
    await waitFor(() => {
      // Only Leanne has pending todos (5), Ervin has 0
      expect(screen.getByText('Leanne Graham')).toBeTruthy()
      expect(screen.queryByText('Ervin Howell')).toBeNull()
    })
  })
})
