import ArticleGrid from '@/components/articles/ArticleGrid';
import ArticleLayout from '@/components/articles/ArticleLayout';
import { getAllArticles } from '@/lib/articles';

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <ArticleLayout>
      <ArticleGrid articles={articles} />
    </ArticleLayout>
  );
} 