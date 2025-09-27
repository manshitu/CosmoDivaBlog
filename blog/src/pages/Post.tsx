// src/pages/Post.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostData {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    date?: string;
    author?: string;
    readTime?: string;
    image?: string;
    icon?: string;
    tags?: string[];
  };
  content: string;
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data: PostData) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-500">Loading post...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
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

  const { frontmatter } = post;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* ✅ Image → Icon → Nothing */}
      {frontmatter.image ? (
        <div className="mb-8 rounded-2xl overflow-hidden shadow">
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className="w-full h-72 object-cover"
          />
        </div>
      ) : frontmatter.icon ? (
        <div className="mb-8 h-40 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400 text-white text-5xl rounded-2xl shadow">
          <i className={`fas ${frontmatter.icon}`} aria-hidden></i>
        </div>
      ) : null}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4 leading-snug">
        {frontmatter.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        {frontmatter.date && (
          <span>{new Date(frontmatter.date).toDateString()}</span>
        )}
        {frontmatter.readTime && (
          <>
            <span>•</span>
            <span>{frontmatter.readTime}</span>
          </>
        )}
        {frontmatter.author && (
          <>
            <span>•</span>
            <span>{frontmatter.author}</span>
          </>
        )}
      </div>

      {/* Markdown content */}
      <article className="prose prose-purple lg:prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Tags */}
      {Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Share Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Share this post:
        </h3>
        <div className="flex gap-4">
          {/* X (Twitter) */}
          <a
            href={`https://X.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(frontmatter.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-black rounded-full text-white hover:opacity-80"
            aria-label="Share on X"
          >
            <i className="fab fa-x-twitter"></i>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700"
            aria-label="Share on Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600"
            aria-label="Share on LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              frontmatter.title + " " + window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600"
            aria-label="Share on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

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
