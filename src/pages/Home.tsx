import { useState, useMemo } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import Hero from "../components/Hero";
import CategoryTabs from "../components/CategoryTabs";
import Sidebar from "../components/Sidebar";
import { posts, type BlogPost } from "@/data/Posts"; // ✅ use unified type

const POSTS_PER_PAGE = 4;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ typed posts
  const filteredPosts: BlogPost[] = useMemo(() => {
    let result = posts;
    if (selectedCat !== "All") {
      result = result.filter((p) => p.tags.includes(selectedCat));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.excerpt?.toLowerCase().includes(q) ?? false) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCat, search]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const selectedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <>
      <Hero search={search} onSearchChange={setSearch} />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CategoryTabs
            selected={selectedCat}
            onSelect={(c) => {
              setSelectedCat(c);
              setCurrentPage(1);
            }}
          />
          <section className="grid gap-8 sm:grid-cols-2">
            {selectedPosts.length > 0 ? (
              selectedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No posts found.
              </p>
            )}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>
        <Sidebar />
      </div>
    </>
  );
}
// Note: Footer is included in App.tsx to appear on all pages
// Note: Header is included in App.tsx to appear on all pages