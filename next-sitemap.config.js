/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.febfr.me/', // Replace with your actual domain
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404'], // Add any paths you want to exclude
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
} 