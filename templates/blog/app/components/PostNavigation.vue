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
    class="mx-auto grid max-w-2xl gap-4 border-t border-line px-6 pt-8 pb-4 sm:grid-cols-2"
  >
    <NuxtLink v-if="older" :to="`/posts/${older.slug}`" class="group">
      <span class="text-sm text-muted">Older post</span>
      <span
        class="mt-1 block font-semibold text-heading group-hover:underline group-hover:underline-offset-4"
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
      <span class="text-sm text-muted">Newer post</span>
      <span
        class="mt-1 block font-semibold text-heading group-hover:underline group-hover:underline-offset-4"
      >
        {{ newer.title }}
      </span>
    </NuxtLink>
  </nav>
</template>
