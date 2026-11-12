<script setup lang="ts">
const site = usePlutoSite();
</script>

<template>
  <PostList>
    <h1 class="text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
      {{ site.name }}
    </h1>

    <p class="mt-3 text-lg text-muted">{{ site.description }}</p>

    <CategoryBar />
  </PostList>
</template>
