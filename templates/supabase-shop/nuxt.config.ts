export default defineNuxtConfig({
  extends: ["@plutocms/supabase-shop", "@plutocms/3d"],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  app: {
    head: {
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    public: {
      websiteName: "My Shop",
    },
  },

  plutoI18n: {
    siteLocale: "en",
  },
});
