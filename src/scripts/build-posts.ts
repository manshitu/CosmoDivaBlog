import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("./src/posts");
const outFile = path.resolve("./src/data/posts.json");

// Simple reading time calculator (~200 words/minute)
function calcReadTime(text: string, wpm = 200): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return `${minutes} min read`;
}

const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");

    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      author: data.author || "Unknown",
      tags: data.tags || [],
      readTime: data.readTime || calcReadTime(content),
      icon: data.icon || "fa-book",
      excerpt: data.excerpt || content.substring(0, 150) + "...",
      content,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`✅ Built ${posts.length} posts into ${outFile}`);
// Run this script with: ts-node src/scripts/build-posts.ts