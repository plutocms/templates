export default defineNuxtConfig({
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
