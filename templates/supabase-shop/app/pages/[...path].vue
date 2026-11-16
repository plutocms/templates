<script setup lang="ts">
const route = useRoute();

const path = computed(() => {
  const value = route.params.path;

  return Array.isArray(value) ? value.join("/") : String(value);
});

const { page } = await usePage(path);
</script>

<template>
  <UContainer v-if="page" class="max-w-3xl py-10 sm:py-16">
    <h1 class="text-highlighted text-3xl font-semibold sm:text-4xl">
      {{ page.title }}
    </h1>

    <p v-if="page.description" class="text-muted mt-3 text-lg">
      {{ page.description }}
    </p>

    <PlutoBlocks :value="page.blocks" tag="div" class="mt-10" />
  </UContainer>
</template>
