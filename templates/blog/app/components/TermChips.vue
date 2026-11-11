<script setup lang="ts">
interface Props {
  /** The tags or categories. A term with no slug shows as plain text. */
  terms?: PlutoPublicReference[];
  /** The folder of the term pages: `tags` links to `/tags/<slug>`. */
  base: "tags" | "categories";
}

const props = defineProps<Props>();
</script>

<template>
  <ul v-if="props.terms?.length" class="flex flex-wrap gap-2">
    <li v-for="term in props.terms" :key="term.id">
      <NuxtLink
        v-if="term.slug"
        :to="`/${props.base}/${term.slug}`"
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
