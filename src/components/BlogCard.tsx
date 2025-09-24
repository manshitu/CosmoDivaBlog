import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/Posts"; 

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail / Icon */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-40 flex items-center justify-center text-white text-3xl">
        <i className={`fas ${post.icon || "fa-book"}`} aria-hidden></i>
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
// Note: Footer is included in App.tsx to appear on all pages