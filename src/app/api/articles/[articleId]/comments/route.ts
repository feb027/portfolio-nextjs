import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CommentSchema = z.object({
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

type Props = {
  params: {
    articleId: string;
  };
};

export async function GET(
  req: NextRequest,
  props: Props
) {
  try {
    const articleId = props.params.articleId;
    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        parentId: null,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments || []);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  props: Props
) {
  try {
    const articleId = props.params.articleId;
    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const { content, parentId } = CommentSchema.parse(json);

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId: session.user.id,
        parentId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 