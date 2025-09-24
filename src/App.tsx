import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Post from "@/pages/Post";
import NotFound from "@/pages/NotFound"; // ✅ import NotFound

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:slug" element={<Post />} /> 
          <Route path="/*" element={<NotFound />} /> {/* ✅ Catch-all route */}         
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
