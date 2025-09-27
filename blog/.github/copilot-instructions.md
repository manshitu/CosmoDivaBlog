# Copilot Instructions for CosmoDivaBlog

## Project Overview
- **Stack:** React + TypeScript + Vite, using Tailwind CSS for styling.
- **Structure:**
  - `src/` contains all app code: components, pages, data, styles.
  - `public/posts/` holds markdown blog posts.
  - `src/data/posts.json` is the main post index.
  - `src/components/` contains UI elements (e.g., `BlogCard.tsx`, `Sidebar.tsx`).
  - `src/pages/` contains route-level components (`Home.tsx`, `Post.tsx`, `About.tsx`).

## Data Flow & Patterns
- Blog post metadata is loaded from `src/data/posts.json`.
- Full post content is loaded from markdown files in `public/posts/`.
- Components expect post data to match the shape in `posts.json`.
- Use React functional components and hooks throughout.
- Styling is via Tailwind classes in `.css` files and inline className.

## Build & Development
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint, see `eslint.config.js`)
- **Type-check:** `npx tsc --noEmit`
- **Tailwind config:** See `tailwind.config.js` and `postcss.config.js`.

## Conventions & Patterns
- All new posts should be added as markdown in `public/posts/` and indexed in `src/data/posts.json`.
- Use TypeScript types for all data structures.
- Prefer composition over inheritance for UI components.
- Use `src/components/Sidebar.tsx` and `src/components/Pagination.tsx` for navigation patterns.
- Category and tag logic is handled in `CategoryTabs.tsx` and related components.

## Integration & External
- No backend: all data is static/local.
- Vite plugins configured in `vite.config.ts`.
- No custom test setup detected; add tests in `src/` if needed.

## Examples
- See `src/pages/Post.tsx` for post rendering logic.
- See `src/components/BlogCard.tsx` for post summary display.

---

**When updating or generating code:**
- Follow the file/folder structure and naming conventions above.
- Keep all post metadata in sync between markdown and `posts.json`.
- Use Tailwind for all styling unless otherwise specified.
- Reference this file for project-specific patterns before defaulting to generic React/Vite practices.
