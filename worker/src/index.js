import matter from "gray-matter";

// Helpers
const escapeHtml = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const mime = (name) => {
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Normalize path (strip trailing slash unless it's root "/")
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    // -----------------------------
    // 1. Serve images from R2
    // -----------------------------
    if (path.startsWith("/images/")) {
      const key = path.slice(1); // "images/foo.jpg"
      const obj = await env.COSMO_BUCKET.get(key);
      if (!obj) return new Response("Image not found", { status: 404 });

      return new Response(obj.body, {
        headers: {
          "Content-Type": mime(key),
          "Cache-Control": "public, max-age=86400", // cache 1 day
        },
      });
    }

    // -----------------------------
    // 2. Posts list API
    // -----------------------------
    if (path === "/api/posts") {
      const list = await env.COSMO_BUCKET.list({ prefix: "posts/" });
      const posts = [];

      for (const obj of list.objects) {
        if (!obj.key.endsWith(".md")) continue;

        const slug = obj.key.replace(/^posts\//, "").replace(/\.md$/, "");
        const file = await env.COSMO_BUCKET.get(obj.key);
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

      // Sort newest first
      posts.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date) - new Date(a.date);
      });

      return new Response(JSON.stringify(posts), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // 5 minutes
        },
      });
    }

    // -----------------------------
    // 3. Single post API
    // -----------------------------
    if (path.startsWith("/api/posts/")) {
      const slug = path.replace("/api/posts/", "");
      const key = `posts/${slug}.md`;
      const obj = await env.COSMO_BUCKET.get(key);
      if (!obj) return new Response("Post not found", { status: 404 });

      const mdText = await obj.text();
      const parsed = matter(mdText);

      return new Response(
        JSON.stringify({
          slug,
          frontmatter: parsed.data,
          content: parsed.content,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60", // 1 minute
          },
        }
      );
    }

    // -----------------------------
    // 4. Dynamic SEO injection
    // -----------------------------
    if (path.startsWith("/post/")) {
      const slug = path.replace(/^\/post\//, "");
      const key = `posts/${slug}.md`;
      const obj = await env.COSMO_BUCKET.get(key);
      if (!obj) return new Response("Not found", { status: 404 });

      const mdText = await obj.text();
      const parsed = matter(mdText);
      const fm = parsed.data || {};

      const site = env.SITE_URL;
      let image = fm.image || "/images/default-og.png";
      if (!image.startsWith("http"))
        image = site + (image.startsWith("/") ? image : "/" + image);

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

      // Always fetch index.html from SITE_URL (reliable)
      const targetUrl = `${site}/index.html`;
      let html;
      try {
        const resp = await fetch(targetUrl);
        if (!resp.ok) {
          return new Response(
            `Failed to fetch index.html from ${targetUrl} - Status: ${resp.status}`,
            { status: 502 }
          );
        }
        html = await resp.text();
      } catch (err) {
        return new Response("Error fetching index.html: " + err.message, {
          status: 500,
        });
      }

      // Inject meta right before </head>
      if (html.includes("</head>")) {
        html = html.replace("</head>", `${meta}</head>`);
      } else {
        html = `${meta}\n${html}`;
      }

      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=60", // short cache
        },
      });
    }

    // -----------------------------
    // 5. Sitemap.xml
    // -----------------------------
    if (path === "/sitemap.xml") {
      const list = await env.COSMO_BUCKET.list({ prefix: "posts/" });
      const site = env.SITE_URL;
      const urls = [
        { loc: `${site}/`, lastmod: new Date().toISOString() },
        { loc: `${site}/about`, lastmod: new Date().toISOString() },
      ];

      for (const obj of list.objects) {
        if (!obj.key.endsWith(".md")) continue;
        const slug = obj.key.replace(/^posts\//, "").replace(/\.md$/, "");
        const file = await env.COSMO_BUCKET.get(obj.key);
        if (!file) continue;

        const text = await file.text();
        const parsed = matter(text);

        urls.push({
          loc: `${site}/post/${slug}`,
          lastmod: parsed.data.date || new Date().toISOString(),
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

      return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    // -----------------------------
    // 6. Robots.txt
    // -----------------------------
    if (path === "/robots.txt") {
      const site = env.SITE_URL;
      const robots = `
        User-agent: *
        Allow: /

        Sitemap: ${site}/sitemap.xml
        `;
      return new Response(robots, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // -----------------------------
    // 7. Debug route
    // -----------------------------
    if (path === "/debug") {
      return new Response(
        JSON.stringify(
          {
            siteUrl: env.SITE_URL,
            time: new Date().toISOString(),
          },
          null,
          2
        ),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // -----------------------------
    // 8. Root default route
    // -----------------------------
    if (path === "/") {
      return new Response("CosmoDiva Worker is running and ready to serve!", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // -----------------------------
    // 9. Fallback → Pages
    // -----------------------------
    return fetch(request);
  },
};
