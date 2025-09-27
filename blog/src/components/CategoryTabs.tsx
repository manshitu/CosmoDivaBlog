const categories = ["All", "Cycle Health", "Fertility", "Nutrition", "Wellness", "Community"];

export default function CategoryTabs({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border transition ${
            selected === cat
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
