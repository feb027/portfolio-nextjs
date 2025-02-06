import { getPostBySlug as getPost, getAllPosts as getPosts } from '@/lib/mdx';
import PostLayout from '@/components/blog/PostLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ComponentProps } from 'react';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

type MDXProps = {
  h1: ComponentProps<'h1'>,
  h2: ComponentProps<'h2'>,
  h3: ComponentProps<'h3'>,
  p: ComponentProps<'p'>,
  ul: ComponentProps<'ul'>,
  ol: ComponentProps<'ol'>,
  li: ComponentProps<'li'>,
}

// MDX components with proper styling
const components = {
  h1: ({ children, ...props }: MDXProps['h1']) => (
    <h1 className="text-4xl font-bold mb-6" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: MDXProps['h2']) => (
    <h2 className="text-3xl font-bold mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: MDXProps['h3']) => (
    <h3 className="text-2xl font-bold mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: MDXProps['p']) => (
    <p className="mb-4 leading-relaxed" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: MDXProps['ul']) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: MDXProps['ol']) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: MDXProps['li']) => (
    <li className="ml-4" {...props}>{children}</li>
  ),
};

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const content = <MDXRemote source={post.content} components={components} />;

  return (
    <PostLayout post={post} content={content} />
  );
} 