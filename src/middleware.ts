import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Create a Map to store IP addresses and their request timestamps
const rateLimit = new Map()

// Configure rate limit settings
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 60 // Maximum requests per minute

export function middleware(request: NextRequest) {
  // Get IP address from request
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
            request.headers.get('x-real-ip') || 
            '127.0.0.1';

  // Get current timestamp
  const now = Date.now()

  // Get existing rate limit data for this IP
  const rateLimitData = rateLimit.get(ip) ?? {
    requests: [],
    blockedUntil: null,
  }

  // If IP is blocked, check if block period is over
  if (rateLimitData.blockedUntil && now < rateLimitData.blockedUntil) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Clean old requests outside the current window
  rateLimitData.requests = rateLimitData.requests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
  )

  // Add current request
  rateLimitData.requests.push(now)

  // Check if too many requests
  if (rateLimitData.requests.length > MAX_REQUESTS) {
    rateLimitData.blockedUntil = now + 30 * 1000 // Block for 30 seconds
    rateLimit.set(ip, rateLimitData)
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Update rate limit data
  rateLimit.set(ip, rateLimitData)

  // Clean up old entries every so often
  if (Math.random() < 0.001) {
    const tooOld = now - RATE_LIMIT_WINDOW * 2
    for (const [key, value] of rateLimit.entries()) {
      if (value.requests.every((timestamp: number) => timestamp < tooOld)) {
        rateLimit.delete(key)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|public/).*)',
  ],
} 