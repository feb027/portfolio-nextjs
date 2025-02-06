import { getPostBySlug as getPost, getAllPosts as getPosts } from '@/lib/mdx';
import PostLayout from '@/components/blog/PostLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
  const post = await getPost(params.slug);
  
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

// MDX components with proper styling
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-4" {...props} />
  ),
};

export default async function Page({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const content = <MDXRemote source={post.content} components={components} />;

  return (
    <PostLayout post={post} content={content} />
  );
} 