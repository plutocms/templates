<script setup lang="ts">
// Links to the pages of tags or categories, as small pills. A term with no slug is plain text.
defineProps<{
  terms?: PlutoPublicReference[];
  // The folder of the term pages: `tags` gives `/tags/<slug>`.
  base: "tags" | "categories";
}>();
</script>

<template>
  <ul v-if="terms?.length" class="flex flex-wrap gap-2">
    <li v-for="term in terms" :key="term.id">
      <NuxtLink
        v-if="term.slug"
        :to="`/${base}/${term.slug}`"
        class="inline-block rounded-full bg-surface px-3 py-1 text-sm text-muted hover:text-heading"
      >
        {{ term.label }}
      </NuxtLink>
      <span
        v-else
        class="inline-block rounded-full bg-surface px-3 py-1 text-sm text-muted"
      >
        {{ term.label }}
      </span>
    </li>
  </ul>
</template>
