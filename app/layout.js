import './globals.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://famguard.app'),
  title: {
    default: 'FamGuard - Family Safety App | Stay Connected & Protected',
    template: '%s | FamGuard'
  },
  description: 'FamGuard is a simple family safety app designed to help loved ones stay connected and protected. Share live location, send quick check-ins, and instantly alert trusted family members during emergencies even with poor or no internet connection.',
  keywords: ['family safety app', 'location sharing', 'family tracking', 'emergency alerts', 'family protection', 'safety app', 'location tracker', 'family security', 'emergency notification', 'family communication', 'Prince Chukwuemeka', 'Chukwuemeka Prince', 'Prince', 'Princess Ibekwe', 'Franklin Okeke'],
  authors: [
    { name: 'Acehub Technologies Ltd' },
    { name: 'Prince Chukwuemeka' },
    { name: 'Chukwuemeka Prince' },
    { name: 'Princess Ibekwe' },
    { name: 'Franklin Okeke' },
  ],
  creator: 'Acehub Technologies Ltd',
  publisher: 'Acehub Technologies Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'FamGuard',
    title: 'FamGuard - Family Safety App | Stay Connected & Protected',
    description: 'FamGuard is a simple family safety app designed to help loved ones stay connected and protected. Share live location, send quick check-ins, and instantly alert trusted family members during emergencies.',
    images: [
      {
        url: '/logo.png',
        width: 394,
        height: 412,
        alt: 'FamGuard Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FamGuard - Family Safety App',
    description: 'Stay connected and protected with FamGuard. Share live location, send check-ins, and alert family members during emergencies.',
    images: ['/logo.png'],
    creator: '@famguard',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://famguard.app'} />
        <meta name="theme-color" content="#667eea" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'FamGuard',
              applicationCategory: 'SafetyApplication',
              operatingSystem: 'iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                ratingCount: '100',
              },
              description: 'FamGuard is a simple family safety app designed to help loved ones stay connected and protected. Share live location, send quick check-ins, and instantly alert trusted family members during emergencies.',
              publisher: {
                '@type': 'Organization',
                name: 'Acehub Technologies Ltd',
                url: 'https://famguard.app',
              },
              creator: [
                {
                  '@type': 'Person',
                  name: 'Prince Chukwuemeka',
                },
                {
                  '@type': 'Person',
                  name: 'Chukwuemeka Prince',
                },
                {
                  '@type': 'Person',
                  name: 'Princess Ibekwe',
                },
                {
                  '@type': 'Person',
                  name: 'Franklin Okeke',
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

