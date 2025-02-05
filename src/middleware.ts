import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Store for rate limiting
const rateLimit = new Map()

// Rate limit settings
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // requests per window

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const headers = response.headers
  
  // Add security headers
  headers.set('X-XSS-Protection', '1; mode=block')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  
  // Enable strict CSP
  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "block-all-mixed-content; " +
    "upgrade-insecure-requests;"
  )
  
  // Enable HSTS
  headers.set('Strict-Transport-Security', 
    'max-age=31536000; includeSubDomains; preload'
  )
  
  // Prevent browser features
  headers.set('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
            request.headers.get('x-real-ip') || 
            'anonymous'
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  // Clean up old entries
  for (const [key, timestamp] of rateLimit.entries()) {
    if (timestamp < windowStart) {
      rateLimit.delete(key)
    }
  }

  // Count requests in current window
  const requestCount = [...rateLimit.entries()]
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length

  if (requestCount >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too Many Requests' },
      { status: 429, headers: response.headers }
    )
  }

  // Record this request
  rateLimit.set(`${ip}-${now}`, now)

  return response
}

export const config = {
  matcher: '/:path*',
} 