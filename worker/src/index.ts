// src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import matter from "gray-matter";

type Env = {
  COSMO_BUCKET: R2Bucket;
  DB: D1Database;
  SITE_URL: string;
  PAGES_ORIGIN?: string;
};

const app = new Hono<{ Bindings: Env }>();

// ---------- CORS (only for /api/*) ----------
app.use(
  "/api/*",
  cors({
    origin: (origin) => {
      if (!origin) return "*";
      if (origin.startsWith("http://localhost:5173") || origin.startsWith("http://localhost:5174")) return origin;
      if (origin.endsWith("cosmodiva.com")) return origin;
      return "https://cosmodiva.com";
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    credentials: false,
    maxAge: 600,
  })
);

// ---------- Helpers ----------
const escapeHtml = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const mime = (name: string) => {
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
};

// ---------- 1. Serve images ----------
app.get("/images/*", async (c) => {
  const key = c.req.path.slice(1); // "images/foo.jpg"
  const obj = await c.env.COSMO_BUCKET.get(key);
  if (!obj) return c.text("Image not found", 404);
  return new Response(obj.body, {
    headers: {
      "Content-Type": mime(key),
      "Cache-Control": "public, max-age=86400",
    },
  });
});

// ---------- 2. Posts list ----------
app.get("/api/posts", async (c) => {
  const list = await c.env.COSMO_BUCKET.list({ prefix: "posts/" });
  const posts: any[] = [];

  for (const obj of list.objects) {
    if (!obj.key.endsWith(".md")) continue;
    const slug = obj.key.replace(/^posts\//, "").replace(/\.md$/, "");
    const file = await c.env.COSMO_BUCKET.get(obj.key);
    if (!file) continue;
    const text = await file.text();
    const parsed = matter(text);
    posts.push({
      slug,
      title: parsed.data.title || "Untitled",
      excerpt: parsed.data.excerpt || parsed.data.description || "",
      date: parsed.data.date || "",
      author: parsed.data.author || "",
      readTime: parsed.data.readTime || "",
      image: parsed.data.image || "",
      tags: parsed.data.tags || [],
    });
  }

  posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return c.json(posts, 200, {
    "Cache-Control": "public, max-age=300",
  });
});

// ---------- 3. Single post ----------
app.get("/api/posts/:slug", async (c) => {
  const slug = c.req.param("slug");
  const obj = await c.env.COSMO_BUCKET.get(`posts/${slug}.md`);
  if (!obj) return c.text("Post not found", 404);
  const mdText = await obj.text();
  const parsed = matter(mdText);
  return c.json(
    { slug, frontmatter: parsed.data, content: parsed.content },
    200,
    { "Cache-Control": "public, max-age=60" }
  );
});

// ---------- 4. SEO injection ----------
app.get("/post/:slug", async (c) => {
  const slug = c.req.param("slug");
  const key = `posts/${slug}.md`;
  const obj = await c.env.COSMO_BUCKET.get(key);
  if (!obj) return c.text("Not found", 404);

  const mdText = await obj.text();
  const parsed = matter(mdText);
  const fm = parsed.data || {};

  const site = c.env.SITE_URL;
  let image: string = fm.image || "/images/default-og.png";
  if (!image.startsWith("http")) image = site + (image.startsWith("/") ? image : "/" + image);

  const pageUrl = `${site}/post/${slug}`;
  const title = fm.title || "CosmoDiva";
  const desc = fm.description || fm.excerpt || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    image: [image],
    datePublished: fm.date || new Date().toISOString(),
    author: { "@type": "Person", name: fm.author || "CosmoDiva" },
    publisher: {
      "@type": "Organization",
      name: "CosmoDiva",
      logo: { "@type": "ImageObject", url: site + "/images/logo.png" },
    },
    description: desc,
  };

  const meta = `
    <title>${escapeHtml(title)} — CosmoDiva</title>
    <meta name="description" content="${escapeHtml(desc)}" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(desc)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(desc)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    `;

  const targets = [
    (c.env.PAGES_ORIGIN || "").replace(/\/$/, ""),
    (c.env.SITE_URL || "").replace(/\/$/, ""),
  ].filter(Boolean);

  let html: string | null = null;
  let lastErr = "";

  for (const host of targets) {
    try {
      const resp = await fetch(`${host}/index.html`);
      if (resp.ok) {
        html = await resp.text();
        break;
      } else {
        lastErr = `Fetch ${host}/index.html -> ${resp.status}`;
      }
    } catch (e: any) {
      lastErr = `Fetch ${host}/index.html failed: ${e?.message || e}`;
    }
  }

  if (!html) return c.text(`index.html fetch failed. ${lastErr}`, 502);

  html = html.includes("</head>") ? html.replace("</head>", `${meta}</head>`) : `${meta}\n${html}`;
  return c.html(html, 200, { "Cache-Control": "public, max-age=60" });
});

// ---------- 5. Sitemap ----------
app.get("/sitemap.xml", async (c) => {
  const list = await c.env.COSMO_BUCKET.list({ prefix: "posts/" });
  const site = c.env.SITE_URL;
  const urls: { loc: string; lastmod: string }[] = [
    { loc: `${site}/`, lastmod: new Date().toISOString() },
    { loc: `${site}/about`, lastmod: new Date().toISOString() },
  ];

  for (const obj of list.objects) {
    if (!obj.key.endsWith(".md")) continue;
    const slug = obj.key.replace(/^posts\//, "").replace(/\.md$/, "");
    const file = await c.env.COSMO_BUCKET.get(obj.key);
    if (!file) continue;
    const text = await file.text();
    const parsed = matter(text);
    urls.push({
      loc: `${site}/post/${slug}`,
      lastmod: parsed.data?.date || new Date().toISOString(),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `  <url>
        <loc>${u.loc}</loc>
        <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>
      </url>`
      )
      .join("\n")}
    </urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
});

// ---------- 6. Robots ----------
app.get("/robots.txt", (c) => {
  const site = c.env.SITE_URL;
  const robots = `User-agent: *
    Allow: /

    Sitemap: ${site}/sitemap.xml
    `;
  return c.text(robots, 200, { "Content-Type": "text/plain" });
});

// ---------- 7. Debug ----------
app.get("/debug", (c) =>
  c.json({
    siteUrl: c.env.SITE_URL,
    pagesOrigin: c.env.PAGES_ORIGIN || null,
    time: new Date().toISOString(),
  })
);

// ---------- 8. Subscribe (D1) ----------
app.post("/api/subscribe", async (c) => {
  try {
    const { email } = await c.req.json<{ email: string }>();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return c.json({ success: false, error: "Valid email is required" }, 400);
    }

    const exists = await c.env.DB.prepare("SELECT id FROM subscribers WHERE email = ?")
      .bind(email)
      .first();

    if (exists) {
      return c.json({ success: false, already: true, message: "You're already subscribed 💌" });
    }

    const result = await c.env.DB.prepare("INSERT INTO subscribers (email) VALUES (?)")
      .bind(email)
      .run();

    return c.json({ success: true, id: result.meta.last_row_id, message: "Successfully subscribed! 🎉" });
  } catch (e: any) {
    return c.json({ success: false, error: e?.message || "Internal error" }, 500);
  }
});

// ---------- 9. Root ----------
app.get("/", (c) => c.text("CosmoDiva Worker is running and ready to serve!"));

// No wildcard catch-all → Pages serves everything else.

export default app;
