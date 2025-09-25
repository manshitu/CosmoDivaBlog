import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8787",
      "/images": "http://127.0.0.1:8787",
      "/post": "http://127.0.0.1:8787",
      "/sitemap.xml": "http://127.0.0.1:8787",
      "/robots.txt": "http://127.0.0.1:8787",
    },
  },
});
