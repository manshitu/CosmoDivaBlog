// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        purple: {
          css: {
            "--tw-prose-headings": theme("colors.purple.700"),
            "--tw-prose-links": theme("colors.purple.600"),
            "--tw-prose-bold": theme("colors.purple.800"),
            "--tw-prose-quotes": theme("colors.purple.600"),
            "--tw-prose-bullets": theme("colors.purple.600"),

            h1: {
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              lineHeight: "1.3",
            },
            h2: {
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "0.75rem",
              borderBottom: "1px solid " + theme("colors.purple.200"),
              paddingBottom: "0.25rem",
            },
            h3: {
              fontSize: "1.25rem",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            },
            p: {
              fontSize: "1.05rem",
              lineHeight: "1.75rem",
              marginBottom: "1rem",
            },
            a: {
              color: theme("colors.pink.600"),
              textDecoration: "none",
              fontWeight: "500",
            },
            "a:hover": {
              color: theme("colors.pink.400"),
              textDecoration: "underline",
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftColor: theme("colors.purple.300"),
              color: theme("colors.gray.700"),
              paddingLeft: "1rem",
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: "0.25rem",
              padding: "0.15rem 0.35rem",
              fontSize: "0.9rem",
              color: theme("colors.purple.700"),
            },
            img: {
              display: "block",
              margin: "2rem auto",
              borderRadius: "0.75rem",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.08), 0 2px 5px rgba(0,0,0,0.06)",
              maxHeight: "480px",
              objectFit: "cover",
            },
            /* ✨ Gradient HR */
            hr: {
              marginTop: "2em",
              marginBottom: "2em",
              border: "none",
              height: "3px",
              backgroundImage: `linear-gradient(to right, ${theme(
                "colors.purple.500"
              )}, ${theme("colors.pink.500")})`,
              borderRadius: "9999px", // pill effect
            },
          },
        },
        /* Override prose-lg as well */
        "purple-lg": {
          css: {
            hr: {
              marginTop: "2em !important",
              marginBottom: "2em !important",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
