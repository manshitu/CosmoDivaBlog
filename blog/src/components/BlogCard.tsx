// src/components/BlogCard.tsx
import { Link } from "react-router-dom";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  description?: string;
  date?: string;
  author?: string;
  readTime?: string;
  image?: string;
  icon?: string;
  tags?: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // pick excerpt first, fallback to description
  const summary = post.excerpt || post.description || "";

  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail: image → icon → default */}
      <div className="h-40 w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400 text-white text-3xl">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="max-h-full max-w-full object-contain"
          />
        ) : post.icon ? (
          <i className={`fas ${post.icon}`} aria-hidden></i>
        ) : (
          <i className="fas fa-book" aria-hidden></i> // ✅ fallback
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta info */}
        <div className="text-sm text-gray-500 mb-2">
          {post.date && <span>{new Date(post.date).toDateString()}</span>}
          {post.readTime && (
            <>
              {" "}
              • <span>{post.readTime}</span>
            </>
          )}
          {/*{post.author && (
            <>
              {" "}
              • <span>{post.author}</span>
            </>
          )}*/}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          {post.title}
        </h2>

        {/* Summary */}
        {summary && <p className="text-gray-600 mb-3">{summary}</p>}

        {/* Link */}
        <Link
          to={`/post/${post.slug}`}
          className="inline-block text-purple-600 font-semibold hover:text-pink-500"
        >
          Read More →
        </Link>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-purple-50 text-purple-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
