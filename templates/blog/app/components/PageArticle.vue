<script setup lang="ts">
interface Props {
  page: PlutoPage;
  draft?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="mx-auto max-w-2xl px-6 pt-6 pb-16">
    <header class="mt-8">
      <span
        v-if="props.draft"
        class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      >
        Draft
      </span>

      <h1
        class="mt-2 text-3xl font-semibold tracking-tight text-balance text-heading sm:text-4xl"
      >
        {{ props.page.title }}
      </h1>

      <p
        v-if="props.page.description"
        class="mt-4 text-lg text-pretty text-muted"
      >
        {{ props.page.description }}
      </p>
    </header>

    <PlutoBlocks :value="props.page.blocks" tag="div" class="mt-10" />
  </article>
</template>
