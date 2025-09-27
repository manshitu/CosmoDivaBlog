// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Illustration (replace src with your own gif/png later) */}
      {/*<div className="w-64 h-64 mb-8">
        <img
          src="/images/funny-404.gif" // place your gif/png here in public/images/
          alt="Not Found"
          className="w-full h-full object-contain"
        />
      </div>*/}

      {/* Title */}
      <h1 className="text-5xl font-bold text-purple-700 mb-4">404 - Page Not Found</h1>

      {/* Message */}
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        Oops! Looks like your cycle skipped a page 😅  
        Don’t worry, even the best of us lose track sometimes.
      </p>

      {/* Back Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-pink-500 transition"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
