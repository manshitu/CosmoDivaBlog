// src/data/Posts.ts
import fm from "front-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  icon?: string; // ✅ optional icon fallback
  image?: string; // ✅ optional cover image
  excerpt?: string;
  content: string;
}

// Load all markdown files in src/posts at build time
const modules = import.meta.glob("../posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const fileName = path.split("/").pop()!.replace(/\.md$/, ""); // slug
    const parsed = fm(raw as string);

    const attrs = parsed.attributes as Record<string, unknown>;

    return {
      slug: fileName,
      title: attrs.title as string,
      date: attrs.date as string,
      author: attrs.author as string,
      tags: (attrs.tags as string[]) || [],
      readTime: (attrs.readTime as string) || "—",
      icon: attrs.icon as string | undefined, // optional
      image: attrs.image as string | undefined, // optional
      excerpt: attrs.excerpt as string | undefined,
      content: parsed.body,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
