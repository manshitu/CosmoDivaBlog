import { useParams, Link } from "react-router-dom";
import { posts } from "@/data/Posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-8">Post not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-3">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {new Date(post.date).toDateString()} • {post.readTime} • {post.author}
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-6 flex gap-2">
        {post.tags.map((t) => (
          <span key={t} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
            {t}
          </span>
        ))}
      </div>

      <Link to="/" className="inline-block mt-6 text-purple-600">← Back to blog</Link>
    </main>
  );
}
// Note: Footer is included in App.tsx to appear on all pages