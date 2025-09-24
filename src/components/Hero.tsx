type Props = {
  search: string;
  onSearchChange: (val: string) => void;
};

export default function Hero({ search, onSearchChange }: Props) {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 text-center">
      <div className="max-w-3xl mx-auto px-4">
        {/*<h1 className="text-4xl sm:text-5xl font-bold mb-4">CosmoDiva</h1>*/}
        <p className="text-lg sm:text-xl mb-6">
          Empowering women with knowledge about menstrual health, fertility, and holistic wellness
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-2/3 max-w-md px-4 py-3 rounded-l-full text-gray-800 focus:outline-none"
          />
          <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-r-full hover:bg-gray-100">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
