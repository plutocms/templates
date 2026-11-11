<script setup lang="ts">
const route = useRoute();
const slug = () => String(route.params.slug);

const { tag } = await useTag(slug);
</script>

<template>
  <PostList
    v-if="tag"
    :filter="{ tags: tag.slug }"
    empty-text="No posts with this tag yet."
  >
    <NuxtLink
      to="/tags"
      class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading"
    >
      <Icon name="lucide:arrow-left" class="size-4" />
      All tags
    </NuxtLink>
    <p class="mt-8 text-sm text-muted">Tag</p>
    <h1
      class="mt-1 text-3xl font-semibold tracking-tight text-heading sm:text-4xl"
    >
      {{ tag.title }}
    </h1>
    <p v-if="tag.description" class="mt-3 text-lg text-muted">
      {{ tag.description }}
    </p>
  </PostList>
</template>
