import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export async function getAllArticles(): Promise<Article[]> {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async fileName => {
          const slug = fileName.replace(/\.mdx$/, '');
          return await getArticleBySlug(slug);
        })
    );

    return articles
      .filter((article): article is Article => article !== null)
      .sort((a, b) => {
        if (a.date < b.date) return 1;
        return -1;
      });
  } catch (error) {
    console.error('Error getting all articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data || !content) {
      return null;
    }

    return {
      slug,
      content,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: {
        name: data.author?.name || 'Anonymous',
        image: data.author?.image,
      },
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 