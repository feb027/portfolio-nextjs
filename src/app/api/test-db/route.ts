import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not defined' },
        { status: 500 }
      );
    }

    console.log('Database URL format:', {
      isDefined: !!process.env.DATABASE_URL,
      startsWithPostgres: process.env.DATABASE_URL.startsWith('postgres://'),
      length: process.env.DATABASE_URL.length
    });

    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT current_timestamp;`;

    return NextResponse.json({
      success: true,
      timestamp: result[0].current_timestamp,
      dbUrlCheck: {
        isDefined: true,
        startsWithPostgres: process.env.DATABASE_URL.startsWith('postgres://'),
        length: process.env.DATABASE_URL.length
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 