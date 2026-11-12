export default defineNuxtConfig({
  extends: ["@plutocms/core"],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      websiteName: "My Pluto",
    },
  },

  routeRules: {
    "/": { redirect: "/admin" },
  },
});
