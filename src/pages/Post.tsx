// src/pages/Post.tsx
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async"; // ✅ import Helmet
import { posts, type BlogPost } from "@/data/Posts";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post: BlogPost | undefined = posts.find((p) => p.slug === slug);

  if (!post) {
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

  const siteName = "CosmoDiva";
  const url = typeof window !== "undefined" ? window.location.href : "";
  const image = post.image
    ? window.location.origin + post.image
    : window.location.origin + "/images/default-cover.jpg";

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* ✅ Helmet SEO + Open Graph */}
      <Helmet>
        <title>{post.title} | {siteName}</title>
        <meta name="description" content={post.excerpt || post.title} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ""} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      {/* ✅ Image → Icon → Nothing */}
      {post.image ? (
        <div className="mb-8 rounded-2xl overflow-hidden shadow">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 object-cover"
          />
        </div>
      ) : post.icon ? (
        <div className="mb-8 h-40 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400 text-white text-5xl rounded-2xl shadow">
          <i className={`fas ${post.icon}`} aria-hidden></i>
        </div>
      ) : null}

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4 leading-snug">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <span>{new Date(post.date).toDateString()}</span>
        <span>•</span>
        <span>{post.readTime}</span>
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
