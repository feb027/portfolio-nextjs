import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/sanitize';
import { headers } from 'next/headers';

// Add this interface at the top of the file
interface RateLimitError extends Error {
  message: string;
  code?: string;
}

const CommentSchema = z.object({
  content: z.string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long")
    .transform(sanitizeInput),
  authorName: z.string()
    .min(1, "Name cannot be empty")
    .max(50, "Name is too long")
    .transform(sanitizeInput),
  parentId: z.string().nullable().optional(),
});

// Create a rate limiter
const limiter = rateLimit({
  interval: 60 * 1000 // 1 minute
});

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ articleId: string }> }
) {
  const params = await context.params;
  const articleId = params.articleId;
  
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        parentId: null,
      },
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments);
  } catch (error: unknown) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ articleId: string }> }
) {
  try {
    // Rate limiting
    await limiter.check(request, 3, 'COMMENT_CREATE');

    // Basic spam prevention
    const headersList = await headers();
    const userAgent = headersList.get('user-agent');
    if (!userAgent) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const json = await request.json();
    const result = CommentSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid data' },
        { status: 400 }
      );
    }

    const { content, authorName, parentId } = result.data;

    // Additional content checks
    if (
      content.includes('http') || 
      content.includes('www') ||
      /[<>{}]/.test(content) || // No HTML/script tags
      content.toLowerCase().includes('script') ||
      // Add more spam patterns here
      content.split(' ').some(word => word.length > 50) // Suspicious long words
    ) {
      return NextResponse.json(
        { error: 'Comment contains disallowed content' },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId: sanitizeInput((await context.params).articleId),
        authorName,
        parentId: parentId || null,
      },
      include: {
        replies: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error: unknown) {
    // Type guard for rate limit error
    if (
      error instanceof Error && 
      (error as RateLimitError).message === 'Rate limit exceeded'
    ) {
      return NextResponse.json(
        { error: 'Too many comments. Please wait a moment.' },
        { status: 429 }
      );
    }

    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 