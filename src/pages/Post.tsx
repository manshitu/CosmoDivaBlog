// src/pages/Post.tsx
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { posts, type BlogPost } from "@/data/Posts";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post: BlogPost | undefined = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-gray-600 text-lg">🚫 Post not found.</p>
        <Link
          to="/"
          className="inline-block mt-6 text-purple-600 hover:text-pink-500 font-semibold"
        >
          ← Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4 leading-snug">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <span>{new Date(post.date).toDateString()}</span>
        <span>•</span>
        <span>{post.readTime}</span>
        <span>•</span>
        <span>{post.author}</span>
      </div>

      {/* Markdown content */}
      <article className="prose prose-purple lg:prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-purple-600 hover:text-pink-500 font-semibold"
        >
          ← Back to blog
        </Link>
      </div>
    </main>
  );
}
