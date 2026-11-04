<script setup lang="ts">
const { name: siteName } = usePlutoSite();
</script>

<template>
  <header
    class="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 pt-10 pb-6"
  >
    <NuxtLink
      to="/"
      class="inline-flex min-w-0 items-center gap-2.5 font-semibold text-heading"
    >
      <PlutoLogo mark class="size-6 shrink-0" aria-hidden="true" />
      <span class="truncate">{{ siteName }}</span>
    </NuxtLink>

    <ColorModeButton
      class="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted hover:bg-surface hover:text-heading"
    />
  </header>
</template>
