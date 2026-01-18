import './globals.css'

export const metadata = {
  title: 'FamGuard - Family Safety App',
  description: 'FamGuard is a simple family safety app designed to help loved ones stay connected and protected.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

