<script setup lang="ts">
const route = useRoute();
const slug = () => String(route.params.slug);

// A missing category shows the 404 page.
const { category } = await useCategory(slug);
</script>

<template>
  <PostList
    v-if="category"
    :filter="{ categories: category.slug }"
    empty-text="No posts in this category yet."
  >
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading"
    >
      <Icon name="lucide:arrow-left" class="size-4" />
      All posts
    </NuxtLink>
    <p class="mt-8 text-sm text-muted">Category</p>
    <h1
      class="mt-1 text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
    >
      {{ category.title }}
    </h1>
    <p v-if="category.description" class="mt-3 text-lg text-muted">
      {{ category.description }}
    </p>
  </PostList>
</template>
