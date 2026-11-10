export default defineNuxtConfig({
  // create-pluto adds @plutocms/seo when you say yes to "Add SEO?": the SEO fields of a post, the
  // head tags, sitemap.xml, robots.txt and feed.xml.
  extends: ["@plutocms/core"],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },

  colorMode: {
    preference: "light",
  },

  runtimeConfig: {
    public: {
      websiteName: "My Blog",
      websiteDescription: "Notes, stories and updates.",
    },
  },
});
