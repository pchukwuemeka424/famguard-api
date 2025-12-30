import './globals.css'

export const metadata = {
  title: 'FamGuard - Account Management',
  description: 'FamGuard Account Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

