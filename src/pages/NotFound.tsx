// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import funny404 from "@/animations/funny-404.json";

export default function NotFound() {
  console.log("✅ funny404 JSON:", funny404);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Animation */}
      <div className="w-72 h-72 mb-6">
        <Lottie animationData={funny404} loop={true} />
      </div>
      <div className="w-72 h-72 mb-6 border border-red-500">
        <Lottie
          animationData={funny404}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! Looks like your cycle skipped a page 😅
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-pink-500 transition"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
