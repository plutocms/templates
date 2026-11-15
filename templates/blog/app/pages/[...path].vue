<script setup lang="ts">
const route = useRoute();

const path = computed(() => {
  const value = route.params.path;

  return Array.isArray(value) ? value.join("/") : String(value);
});

const { page, draft } = await usePage(path);
</script>

<template>
  <PageArticle v-if="page" :page="page" :draft="draft" />
</template>
