<script setup lang="ts">
usePlutoSiteHead();
</script>

<template>
  <div class="flex min-h-(--pluto-page-height) flex-col">
    <SiteNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
