import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center relative">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="CosmoDiva Logo" className="h-[4.5rem] mr-2" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="/" className="text-purple-700 hover:text-pink-600">Home</a>
          <a href="/about" className="text-purple-700 hover:text-pink-600">About Us</a>
          <a href="#" className="text-purple-700 hover:text-pink-600">Cycle Health</a>
          <a href="#" className="text-purple-700 hover:text-pink-600">Fertility</a>
          <a href="#" className="text-purple-700 hover:text-pink-600">Wellness</a>
          <a href="#" className="text-purple-700 hover:text-pink-600">Nutrition</a>
          <a href="#" className="text-purple-700 hover:text-pink-600">Community</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-purple-700 text-2xl"
          onClick={() => setOpen((v) => !v)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation (Floating Overlay) */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md md:hidden flex flex-col text-purple-700 px-4 py-3 space-y-2 z-50">
          <a href="/" className="hover:text-pink-600">Home</a>
          <a href="/about" className="hover:text-pink-600">About Us</a>
          <a href="#" className="hover:text-pink-600">Cycle Health</a>
          <a href="#" className="hover:text-pink-600">Fertility</a>
          <a href="#" className="hover:text-pink-600">Wellness</a>
          <a href="#" className="hover:text-pink-600">Nutrition</a>
          <a href="#" className="hover:text-pink-600">Community</a>
        </div>
      )}
    </header>
  );
}
