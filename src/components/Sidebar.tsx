export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">
          About CosmoDiva
        </h3>
        <p className="text-gray-600 mb-3">
          CosmoDiva is a women's health platform dedicated to helping you understand your cycle, optimize your fertility, and embrace your feminine power.
        </p>
        <a
          href="#"
          className="text-purple-600 font-semibold hover:text-pink-500"
        >
          Learn More →
        </a>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">Subscribe</h3>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-purple-600"
        />
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg font-semibold">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
