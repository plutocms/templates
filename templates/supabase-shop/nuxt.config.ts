export default defineNuxtConfig({
  extends: ["@plutocms/supabase-shop", "@plutocms/3d"],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    public: {
      websiteName: "My Shop",
    },
  },

  plutoI18n: {
    siteLocale: "en",
  },
});
