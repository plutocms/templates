<script setup lang="ts">
// The categories of the blog, as links to their pages. With no category, it shows nothing.
const { categories } = await useCategories({
  limit: 100,
  search: false,
  page: false,
});

const terms = computed<PlutoPublicReference[]>(() =>
  categories.value.map((category) => ({
    id: category.id,
    label: category.title,
    slug: category.slug,
  })),
);
</script>

<template>
  <nav v-if="terms.length" aria-label="Categories" class="mt-6">
    <TermChips :terms="terms" base="categories" />
  </nav>
</template>
