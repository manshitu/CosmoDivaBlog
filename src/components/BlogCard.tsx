// src/components/BlogCard.tsx
import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/Posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail: image → icon → default */}
      <div className="h-40 w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400 text-white text-3xl">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : post.icon ? (
          <i className={`fas ${post.icon}`} aria-hidden></i>
        ) : (
          <i className="fas fa-book" aria-hidden></i> // ✅ fallback
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-sm text-gray-500 mb-2">
          {new Date(post.date).toDateString()} • {post.readTime} • {post.author}
        </div>

        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-gray-600 mb-3">{post.excerpt}</p>
        )}

        <Link
          to={`/post/${post.slug}`}
          className="inline-block text-purple-600 font-semibold hover:text-pink-500"
        >
          Read More →
        </Link>

        {/* Tags */}
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
      </div>
    </article>
  );
}
