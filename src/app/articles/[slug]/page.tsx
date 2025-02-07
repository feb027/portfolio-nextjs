import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import ArticleLayout from '@/components/articles/ArticleLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButtons from '@/components/articles/ShareButtons';
import ArticleNavigation from '@/components/articles/ArticleNavigation';
import RelatedArticles from '@/components/articles/RelatedArticles';
import Comments from '@/components/articles/Comments';
import { formatDate } from '@/lib/formatDate';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Clock } from 'lucide-react';
import CodeBlock from '@/components/articles/CodeBlock';

// MDX components configuration
interface MDXComponentProps {
  children: React.ReactNode;
  className?: string;
}

const components = {
  h1: ({ children, ...props }: MDXComponentProps) => (
    <h1 
      className="text-4xl lg:text-5xl font-mono font-bold text-code-white mt-16 mb-6 
                 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 
                 after:w-24 after:h-1 after:bg-neon-purple/30" 
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXComponentProps) => (
    <h2 
      className="text-2xl lg:text-3xl font-mono font-bold text-code-white mt-12 mb-4
                 flex items-center gap-3 before:content-['##'] before:text-neon-blue/40" 
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXComponentProps) => (
    <h3 
      className="text-xl lg:text-2xl font-mono font-bold text-code-white mt-8 mb-3
                 flex items-center gap-2 before:content-['###'] before:text-neon-cyan/40 before:text-sm" 
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXComponentProps) => (
    <p 
      className="text-code-gray text-lg leading-relaxed mb-6 max-w-[65ch]
                 first-letter:text-2xl first-letter:text-neon-purple" 
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul 
      className="space-y-3 mb-6 ml-4 list-none" 
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol 
      className="space-y-3 mb-6 ml-4 list-none counter-reset-item" 
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXComponentProps) => (
    <li 
      className="text-code-gray relative pl-6 before:absolute before:left-0 before:text-neon-blue
                 before:content-['•'] before:text-xl before:leading-tight" 
      {...props}
    >
      {children}
    </li>
  ),
  code: ({ children, ...props }: MDXComponentProps) => (
    <code 
      className="bg-terminal-light/10 text-neon-blue px-1.5 py-0.5 rounded font-mono
                 text-sm border border-terminal-border" 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, className, ...props }: MDXComponentProps) => (
    <CodeBlock className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote 
      className="border-l-4 border-neon-purple/30 pl-4 my-6 italic text-code-gray/80"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

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
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Get related articles
  const relatedArticles = allArticles
    .filter(a => a.slug !== slug && a.tags?.some(tag => article.tags?.includes(tag)))
    .slice(0, 3);

  return (
    <ArticleLayout>
      <article className="max-w-none">
        {/* Article Header */}
        <header className="mb-12 relative">
          {article.image && (
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-darker via-terminal-darker/50 to-transparent" />
            </div>
          )}
          
          <div className="relative z-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(article.tags) && article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-mono bg-neon-purple/10 text-neon-purple 
                           rounded-full border border-neon-purple/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono mb-6 text-code-white leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-code-gray">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-neon-blue/20">
                  <Image
                    src={article.author.image || '/default-avatar.png'}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-mono text-sm text-code-white">{article.author.name}</div>
                  <div className="text-xs">{formatDate(article.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-terminal-light/5 rounded-full">
                <Clock className="w-4 h-4 text-neon-blue" />
                <span className="text-sm">{article.readingTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="article-content prose prose-invert max-w-none">
          {content}
        </div>
        
        <ShareButtons article={article} />
        
        <ArticleNavigation 
          prevArticle={prevArticle}
          nextArticle={nextArticle}
        />
        
        <RelatedArticles articles={relatedArticles || []} />
        
        <Comments articleId={slug} />
      </article>
    </ArticleLayout>
  );
} 