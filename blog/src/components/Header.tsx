import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center relative">
        {/* Logo */}        
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="CosmoDiva"
              className="h-[4.5rem] mr-2 cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="/" className="text-purple-700 hover:text-pink-600">
            Home
          </a>
          <a href="/about" className="text-purple-700 hover:text-pink-600">
            About Us
          </a>
          <a
            href="/?category=Cycle%20Health"
            className="text-purple-700 hover:text-pink-600"
          >
            Cycle Health
          </a>
          <a
            href="/?category=Fertility"
            className="text-purple-700 hover:text-pink-600"
          >
            Fertility
          </a>
          <a
            href="/?category=Wellness"
            className="text-purple-700 hover:text-pink-600"
          >
            Wellness
          </a>
          <a
            href="/?category=Nutrition"
            className="text-purple-700 hover:text-pink-600"
          >
            Nutrition
          </a>
          <a
            href="/?category=Community"
            className="text-purple-700 hover:text-pink-600"
          >
            Community
          </a>
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
          <a href="/" className="hover:text-pink-600">
            Home
          </a>
          <a href="/about" className="hover:text-pink-600">
            About Us
          </a>
          <a href="/?category=Cycle%20Health" className="hover:text-pink-600">
            Cycle Health
          </a>
          <a href="/?category=Fertility" className="hover:text-pink-600">
            Fertility
          </a>
          <a href="/?category=Wellness" className="hover:text-pink-600">
            Wellness
          </a>
          <a href="/?category=Nutrition" className="hover:text-pink-600">
            Nutrition
          </a>
          <a href="/?category=Community" className="hover:text-pink-600">
            Community
          </a>
        </div>
      )}
    </header>
  );
}
