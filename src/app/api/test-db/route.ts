import { NextResponse } from 'next/server';
import { sql } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await sql`SELECT NOW()`;
    return NextResponse.json({ success: true, time: result[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 