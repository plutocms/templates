<script setup lang="ts">
const { name: siteName } = usePlutoSite();
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-2 px-6 py-10 text-sm text-zinc-500"
  >
    <p>© {{ year }} {{ siteName }}</p>
    <a
      href="https://pluto.vulmix.dev"
      target="_blank"
      rel="noopener"
      class="hover:text-zinc-950 dark:hover:text-white"
    >
      Built with Pluto
    </a>
  </footer>
</template>
