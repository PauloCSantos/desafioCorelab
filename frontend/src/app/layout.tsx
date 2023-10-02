import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corenotes',
  description: 'Corelab Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">{children}</body>
    </html>
  )
}
