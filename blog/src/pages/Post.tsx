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
  const [copied, setCopied] = useState(false);

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
            className="max-h-96 w-auto object-contain"
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
        {/*{frontmatter.author && (
          <>
            <span>•</span>
            <span>{frontmatter.author}</span>
          </>
        )}*/}
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
      <div className="mt-6 border-t pt-6 text-right">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center justify-end gap-2">
          <span>Share this post</span>
          <i
            className="fas fa-share-alt text-purple-600 transition-transform transform hover:scale-110 hover:rotate-12 hover:text-pink-500"
            title="Share this post"
          ></i>
        </h3>

        <div className="flex justify-end gap-3">
          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(frontmatter.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            title="Share on X"
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
          >
            <svg
              className="fab x-icon text-[18px] leading-none fa-fw transition-transform duration-300 hover:rotate-12"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Share on Facebook"
            className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center"
          >
            <i className="fab fa-facebook-f text-[18px] leading-none fa-fw transition-transform duration-300 hover:rotate-12"></i>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
            className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center"
          >
            <i className="fab fa-linkedin-in text-[18px] leading-none fa-fw transition-transform duration-300 hover:rotate-12"></i>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${frontmatter.title} ${window.location.href}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center"
          >
            <i className="fab fa-whatsapp text-[18px] leading-none fa-fw transition-transform duration-300 hover:rotate-12"></i>
          </a>

          {/* Copy Link */}
          <a
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            aria-label="Copy link"
            title="Copy link"
            className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 cursor-pointer"
          >
            {copied ? (
              <i className="fas fa-check text-[18px] fa-fw transition-transform duration-300"></i>
            ) : (
              <i className="fas fa-link text-[18px] fa-fw transition-transform duration-300 hover:rotate-12"></i>
            )}
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
