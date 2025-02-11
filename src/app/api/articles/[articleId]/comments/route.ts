import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/sanitize';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

// We can use edge runtime again since Supabase works with it
export const runtime = 'edge';

interface RateLimitError extends Error {
  message: string;
  code?: string;
}

interface Comment {
  id: string;
  content: string;
  article_id: string;
  author_name: string;
  created_at: string;
  parent_id: string | null;
  user_id: string | null;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
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

const limiter = rateLimit({
  interval: 60 * 1000
});

// Helper function to generate UUID using Web Crypto API
function generateUUID(): string {
  return crypto.randomUUID();
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ articleId: string }> }
) {
  try {
    const params = await context.params;
    const articleId = params.articleId;
    
    console.log('Fetching comments for article:', articleId);

    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    console.log('Found comments:', comments?.length ?? 0);

    if (!comments) {
      return NextResponse.json([]);
    }

    // Build the comment tree
    const commentMap = new Map<string, CommentWithReplies>();
    const rootComments: CommentWithReplies[] = [];

    // First pass: create all comment objects with empty replies arrays
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: build the tree structure
    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id);
      if (comment.parent_id) {
        const parentComment = commentMap.get(comment.parent_id);
        if (parentComment && commentWithReplies) {
          parentComment.replies.push(commentWithReplies);
        }
      } else if (commentWithReplies) {
        rootComments.push(commentWithReplies);
      }
    });

    return NextResponse.json(rootComments);
  } catch (error: unknown) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ articleId: string }> }
) {
  try {
    await limiter.check(request, 3, 'COMMENT_CREATE');

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
    const articleId = (await context.params).articleId;

    if (
      content.includes('http') || 
      content.includes('www') ||
      /[<>{}]/.test(content) ||
      content.toLowerCase().includes('script') ||
      content.split(' ').some(word => word.length > 50)
    ) {
      return NextResponse.json(
        { error: 'Comment contains disallowed content' },
        { status: 400 }
      );
    }

    const id = generateUUID();
    
    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          id,
          content,
          article_id: articleId,
          author_name: authorName,
          parent_id: parentId || null,
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(comment);
  } catch (error: unknown) {
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