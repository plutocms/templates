<script setup lang="ts">
const { name: siteName } = usePlutoSite();
const hasFeed = Boolean(useAppConfig().plutoSeo);
const feed = `${useRuntimeConfig().app.baseURL}feed.xml`;
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-2 px-6 py-10 text-sm text-muted"
  >
    <p>© {{ year }} {{ siteName }}</p>
    <div class="flex items-center gap-4">
      <NuxtLink to="/tags" class="hover:text-heading">Tags</NuxtLink>
      <a v-if="hasFeed" :href="feed" class="hover:text-heading">RSS</a>
      <a
        href="https://pluto.vulmix.dev"
        target="_blank"
        rel="noopener"
        class="hover:text-heading"
      >
        Built with Pluto
      </a>
    </div>
  </footer>
</template>
