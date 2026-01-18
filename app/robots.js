export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/check-database', '/delete-account', '/fix-connection', '/setup-policy'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://famguard.app'}/sitemap.xml`,
  }
}
