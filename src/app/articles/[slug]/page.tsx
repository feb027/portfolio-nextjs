import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import ArticleLayout from '@/components/articles/ArticleLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButtons from '@/components/articles/ShareButtons';
import ArticleNavigation from '@/components/articles/ArticleNavigation';
import RelatedArticles from '@/components/articles/RelatedArticles';
import Comments from '@/components/articles/Comments';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';

// MDX components configuration
const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-code-white mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-code-white mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold text-code-white mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-code-gray mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-code-gray" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-code-gray" {...props} />
  ),
  li: (props: any) => (
    <li className="text-code-gray" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-terminal-light/10 text-neon-blue px-1.5 py-0.5 rounded" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-terminal-light/5 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
};

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  return {
    title: `${article.title} | FFR Articles`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  const allArticles = await getAllArticles();
  
  if (!article) {
    notFound();
  }

  const { content } = await compileMDX({
    source: article.content,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  // Find prev/next articles
  const currentIndex = allArticles.findIndex(a => a.slug === params.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Get related articles
  const relatedArticles = allArticles
    .filter(a => a.slug !== params.slug && a.tags.some(tag => article.tags.includes(tag)))
    .slice(0, 3);

  return (
    <ArticleLayout>
      <article className="max-w-none">
        {/* Article Header */}
        <div className="mb-8">
          {article.image && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono bg-terminal-light/10 text-neon-cyan rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-mono mb-4 text-code-white">{article.title}</h1>
          
          <div className="flex items-center gap-4 text-code-gray">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={article.author.image || '/default-avatar.png'}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-sm">{article.author.name}</span>
            </div>
            <span className="text-sm">
              {format(parseISO(article.date), 'MMMM d, yyyy', { locale: enUS })}
            </span>
            <span className="text-sm">{article.readingTime}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="article-content">
          {content}
        </div>
        
        <ShareButtons article={article} />
        
        <ArticleNavigation 
          prevArticle={prevArticle}
          nextArticle={nextArticle}
        />
        
        <RelatedArticles articles={relatedArticles} />
        
        <Comments articleId={params.slug} />
      </article>
    </ArticleLayout>
  );
} 