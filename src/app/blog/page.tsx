import { getAllPosts } from '@/lib/mdx';
import BlogLayout from '@/components/blog/BlogLayout';
import BlogGrid from '@/components/blog/BlogGrid';

export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <BlogLayout>
      <BlogGrid posts={posts} />
    </BlogLayout>
  );
} 