import './globals.css'
import type { Metadata } from 'next'
import ReactQueryProvider from '@/provides/react-query-provider'

export const metadata: Metadata = {
  title: 'Users Dashboard',
  description: 'A modern user management interface',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
