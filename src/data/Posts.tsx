import postsJson from "@/data/posts.json";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  icon?: string;
  excerpt?: string;
  content: string;
}

export const posts: BlogPost[] = postsJson as BlogPost[];
// Now both the data and components can use the same BlogPost type