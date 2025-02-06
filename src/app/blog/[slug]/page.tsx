import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PostLayout from '@/components/blog/PostLayout';

export const dynamic = 'force-static';

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-4" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-1" {...props} />
  ),
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = <MDXRemote source={post.content} components={components} />;

  return <PostLayout post={post} content={content} />;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
} 