import { NextResponse } from 'next/server'
import { generateToken, validateToken } from '@/lib/csrf'

export async function GET() {
  const token = generateToken()
  return NextResponse.json({ token })
} 