export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  tags?: string[];
}