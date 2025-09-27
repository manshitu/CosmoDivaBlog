export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            p === currentPage
              ? "bg-purple-600 text-white"
              : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
