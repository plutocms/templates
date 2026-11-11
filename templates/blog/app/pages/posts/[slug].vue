<script setup lang="ts">
const route = useRoute();
const slug = () => String(route.params.slug);

const { post, draft } = await usePost(slug);
const { newer, older } = await useAdjacentPosts(slug);
</script>

<template>
  <div v-if="post">
    <PostArticle :post="post" :draft="draft" />
    <PostNavigation :newer="newer" :older="older" />
  </div>
</template>
