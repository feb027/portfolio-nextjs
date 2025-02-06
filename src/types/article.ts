export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  image?: string;
  readingTime?: string;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  author: {
    name: string;
    image?: string;
  };
  content: string;
  createdAt: string;
  replies?: ArticleComment[];
} 