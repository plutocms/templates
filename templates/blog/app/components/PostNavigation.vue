<script setup lang="ts">
interface Props {
  /** The next post by date, if any. */
  newer: PlutoPostSummary | null;
  /** The previous post by date, if any. */
  older: PlutoPostSummary | null;
}

const props = defineProps<Props>();
</script>

<template>
  <nav
    v-if="props.newer || props.older"
    aria-label="More posts"
    class="mx-auto grid max-w-2xl gap-4 border-t border-line px-6 pt-8 pb-4 sm:grid-cols-2"
  >
    <NuxtLink
      v-if="props.older"
      :to="`/posts/${props.older.slug}`"
      class="group"
    >
      <span class="text-sm text-muted">Older post</span>
      <span
        class="mt-1 block font-semibold text-heading group-hover:underline group-hover:underline-offset-4"
      >
        {{ props.older.title }}
      </span>
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="props.newer"
      :to="`/posts/${props.newer.slug}`"
      class="group sm:text-end"
    >
      <span class="text-sm text-muted">Newer post</span>
      <span
        class="mt-1 block font-semibold text-heading group-hover:underline group-hover:underline-offset-4"
      >
        {{ props.newer.title }}
      </span>
    </NuxtLink>
  </nav>
</template>
