<script setup lang="ts">
defineProps<{
  newer: PlutoPostSummary | null;
  older: PlutoPostSummary | null;
}>();
</script>

<template>
  <nav
    v-if="newer || older"
    aria-label="More posts"
    class="mx-auto grid max-w-2xl gap-4 border-t border-zinc-200 px-6 pt-8 pb-4 sm:grid-cols-2 dark:border-zinc-800"
  >
    <NuxtLink v-if="older" :to="`/posts/${older.slug}`" class="group">
      <span class="text-sm text-zinc-500">Older post</span>
      <span
        class="mt-1 block font-semibold text-zinc-950 group-hover:underline group-hover:underline-offset-4 dark:text-white"
      >
        {{ older.title }}
      </span>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="newer"
      :to="`/posts/${newer.slug}`"
      class="group sm:text-end"
    >
      <span class="text-sm text-zinc-500">Newer post</span>
      <span
        class="mt-1 block font-semibold text-zinc-950 group-hover:underline group-hover:underline-offset-4 dark:text-white"
      >
        {{ newer.title }}
      </span>
    </NuxtLink>
  </nav>
</template>
